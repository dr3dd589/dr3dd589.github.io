---
layout:     post
title:      Warmup
date:       2019-03-24 11:31:19
author:     dr3dd
summary:    this blog demonstrate how to reverse this challenge.
categories: Reversing
thumbnail:  book
tags:
 - Reversing
 - Securinets-CTF-2019
 - Warmup
---

<h2>Securinets-CTF-2019(Warmup, 960 pt)</h2>

On excuting the given binary asked for passcode and passcode is the flag which we have to recover it.
Now lets dive on the chall .

On decompiling binary in ida we can see our flag input is passed in a function which is like this:

```c

_int64 __fastcall base64(__int64 flag_input, unsigned int a2, __int64 s_output)
{
  unsigned int v3; // eax
  unsigned int i; // [rsp+20h] [rbp-20h]
  unsigned int v6; // [rsp+24h] [rbp-1Ch]
  unsigned int v7; // [rsp+28h] [rbp-18h]
  int v8; // [rsp+2Ch] [rbp-14h]
  int v9; // [rsp+30h] [rbp-10h]
  int v10; // [rsp+34h] [rbp-Ch]
  unsigned __int64 v11; // [rsp+38h] [rbp-8h]

  v11 = __readfsqword(0x28u);
  v6 = 0;
  v7 = 0;
  for ( i = 0; i < a2; ++i )
  {
    v3 = v6++;
    *(&v8 + v3) = *(_DWORD *)(4LL * i + flag_input);
    if ( v6 == 3 )
    {
      *(_BYTE *)(s_output + v7) = abcd_string[(unsigned __int8)v8 >> 2];
      *(_BYTE *)(s_output + v7 + 1) = abcd_string[((unsigned __int8)v9 >> 4) | 16 * (_BYTE)v8 & 48];
      *(_BYTE *)(s_output + v7 + 2) = abcd_string[((unsigned __int8)v10 >> 6) | 4 * (_BYTE)v9 & 60];
      *(_BYTE *)(s_output + v7 + 3) = abcd_string[v10 & 63];
      v6 = 0;
      v7 += 4;
    }
  }
  if ( v6 )
  {
    if ( v6 == 1 )
      v9 = 0;
    *(_BYTE *)(s_output + v7) = abcd_string[(unsigned __int8)v8 >> 2];
    *(_BYTE *)(s_output + v7 + 1) = abcd_string[((unsigned __int8)v9 >> 4) | 16 * (_BYTE)v8 & 48];
    if ( v6 == 2 )
      *(_BYTE *)(s_output + v7 + 2) = abcd_string[4 * (_BYTE)v9 & 60];
    else
      *(_BYTE *)(v7 + 2 + s_output) = '=';
    *(_BYTE *)(v7 + 3 + s_output) = '=';
    v7 += 4;
  }
  *(_BYTE *)(v7 + s_output) = 0;
  return v7;
}
```  

At first i saw it looks like familiar to me can you see at last in code it appends `==` in v7 and v7 is returned. Yes, you are right it is base64 encryption. btw i renamed the function name to base64  :)

Now after that it checks every byte of base64 passcode and all are easy comparision i do it mannually and write a python script.here it is:


```python

s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

flag = ["?"]*36

flag[0]  = s[28]
flag[1]  =  s[54]
flag[2]  = s[(82 >> 2)+1]
flag[3]  = "j"
flag[4]  = chr(ord(flag[0])+1)
flag[5]  = "X"
flag[6]  = chr(ord(flag[3])-32)
flag[7]  = chr(112)
flag[8]  = chr(ord(s[28])-1)
flag[10] = flag[2]
flag[11] = chr(48)
flag[12] = chr(ord(flag[4])-1)
flag[13] = "3"
flag[14] = chr(ord(flag[7])+4)
flag[15] = chr(ord(flag[7])+3)
flag[17] = "3"
flag[18] = chr(ord(flag[7])-30)
flag[19] = chr(122)
flag[20] = "X"
flag[21] = "3"
flag[22] = chr(ord(flag[4])-1)
flag[23] = chr(48)
flag[24] = chr(ord(flag[4])-1)
flag[26] = chr(49)
flag[27] = chr(ord(flag[4])+2)
flag[29] = "X"
flag[30] = flag[18]
flag[31] = flag[27]
flag[9]  = chr(ord(flag[27])+7)
flag[16] = chr(ord(flag[9])-32)
flag[25] = chr(ord(flag[27])+7)
flag[28] = flag[16]
flag[32] = flag[4]
flag[33] = "X"
flag[34] = chr(ord(flag[0])-33)
flag[35] = chr(ord(flag[11]) + 9)

print(flag)
flag = ''.join(flag)
try:
	print flag.decode('base64')
except:
	print('Nope')
```

`flag : securinets{l3ts_w4rm_1t_up}`


