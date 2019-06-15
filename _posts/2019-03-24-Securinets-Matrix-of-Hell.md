---
layout:     post
title:      Matrix of Hell
date:       2019-03-24 11:31:19
author:     dr3dd
summary:    this blog demonstrate how to reverse this challenge.
categories: Reversing
thumbnail:  book
tags:
 - Reversing
 - Securinets-CTF-2019
 - Matrix of Hell
---

<h2>Securinets-CTF-2019(Matrix of Hell, 992 pt)</h2>

An ELF stripped binary is provided. On running binary, it asked for a password which we have to find. It is more like crackme's problems. So i opened it in my ida to do some static analysis. Renamed variables for easy understanding.

There are main 3 step in `main` funtion:

-->binary generates some bytes using the below process and save it at `pass_cmp` local variable.

```c

v14 = 0;
  for ( i = 0; i <= 4; ++i )
  {
    for ( j = 0; j <= 4; ++j )
    {
      if ( v14 == 9 )
      {
        v14 = 10;
        --j;
      }
      else
      {
        a2 = (char **)j;
        a3 = (char **)(4 * (j + 6LL * i));
        *(_DWORD *)((char *)pass_cmp + (_QWORD)a3) = v14++ + 65;
      }
    }
  }
```


I wrote it in python to generate that bytes.

```python

s = ['?']*100
v3=0
v4=0
for i in range(5):
   for j in range(5):
       if v14==9:
           v14=10
           j = j-1
       else:
           a3= (j+6*i)
           s[a3]=chr(v14+65)
       v14 += 1
print(''.join(s))

output--> ABCDE?FGHI??LMNOP?QRSTU?VWXYZ????           <-- pass_cmp 
```
--> Now in Second step it checks the input length that is 14 and compare input bytes by bytes using matrix(5x5) the process in ida is like this:-

```c

printf("PASSWORD:", a2, a3);
  gets(password);
  if ( strlen(password) != 14 || (sub_83A(), !v3) )   <-- check password length
  {
    printf("ACCESS DENIED");
    exit(0);
  }
  v16 = 0;
  for ( k = 0; k < strlen(password); ++k )            <-- iterate password byte by byte
  {
    for ( l = 0; l <= 4; ++l )
    {
      for ( m = 0; m <= 4; ++m )
      {
        if ( pass_cmp[m + 6LL * l] == password[k] )   <-- Compare password byte at k index
                                                          with above output. 
        {
          new_string[v16] = l + 65;                   <-- form new string
          v4 = v16 + 1;
          new_string[v4] = m + 49;                    <-- The length of new string is double
                                                          of password.
          v16 = v4 + 1;
        }
      }
    }
  }
  for ( n = 0; n < strlen(new_string); ++n )
    s2[n] = n % 4 ^ new_string[n];                    <-- doing some xor operation and form new 
                                                          string s2
  if ( strcmp(s1, s2) )                               <-- cmp s2 with s1 and s1 is in data 
                                                          section
  {												                            <-- s1 = 'B0C2A2C6A3A7C5@6B5F0A4G2B5A2'					
    printf("ACCESS DENIED", s2);
    exit(0);
  }
``` 

first we have to recover the `new_string` from `s1` and this is very simple

```python
s1 = "B0C2A2C6A3A7C5@6B5F0A4G2B5A2"                   <-- s1
new_string = ""
for i in range(28):                                                     
   new_string += chr(i%4^ord(s1[i]))
print(f)

output--> 'B1A1A3A5A2C4C4B5B4D3A5E1B4C1'              <-- new_string
```

Now we have to find out the co-ordinates of matrix (l,m) which is satisfied for this compare  `if ( pass_cmp[m + 6LL * l] == password[k] )` 

```python

cord = []
for i in range(0,28,2):
    l,m=0,0
    l = ord(f[i])-ord('A')
    m = ord(f[i+1])-ord('1')
    cord.append((l,m))
print(cord),

output--> [(1, 0), (0, 0), (0, 2), (0, 4), (0, 1), (2, 3), (2, 3), (1, 4), (1, 3), (3, 2), (0, 4), (4, 0), (1, 3), (2, 0)]
```
We got the (l,m) value at which comparision is satisfied.Now we only have to recover the password.

```python

cord = [(1, 0), (0, 0), (0, 2), (0, 4), (0, 1), (2, 3), (2, 3), (1, 4), (1, 3), (3, 2), (0, 4), (4, 0), (1, 3), (2, 0)]
pass_cmp = 'ABCDE?FGHI??LMNOP?QRSTU?VWXYZ????'
password = ""
for i in range(len(cord)):                    
     password += pass_cmp[cord[i][1]+6*cord[i][0]]

print(password)

output --> 'FACEBOO?ISEVIL'                    <-- one byte is missing '?' we know what it is :)
show password is --> 'FACEBOOKISEVIL'

```
--> Now in 3rd step we have to do nothing binary itself generate the flag using correct password

```s
 ~/ctf-2019/securinets19/matrix  ./rev 
PASSWORD:FACEBOOKISEVIL
[+]GOOD JOB ! u can submit with this :
1337_FD_DDLLLKMO_KUWRRRVL_HAHAHA                                             

``` 

`flag : 1337_FD_DDLLLKMO_KUWRRRVL_HAHAHA`