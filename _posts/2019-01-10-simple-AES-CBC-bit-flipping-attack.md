---
layout:     post
title:      AES-CBC bit flipping Attack
date:       2019-01-10 11:31:19
author:     dr3dd
summary:    this blog demonstrate how AES-CBC mode works and an Simple bit flipping Attack.
categories: Cryptography
thumbnail:  book
tags:
 - Crypto
 - n00b19CTF
 - Easy-Flipp
 - AES-CBC
---

<h2>n00b19CTF(Easy-Flipp, 100 pt)</h2>

This is simple crypto challenge created by me. At the time of CTF, this challenge had zero solved. So, I thought to write a writeup for beginners to understand how CBC bit flipping works.

**AES-CBC Encryption and Decryption flow chart**


![alt text](/favicon/902px-CBC_encryption.svg.jpg)


![alt text](/favicon/902px-CBC_decryption.svg.jpg)

The main vulnerable part of CBC is it uses previous block ciphertext to encrypt next block of plaintext!!! same as in decryption second block ciphertext after decrypted by AES it XORed with previous block ciphertext!! So think about it what happens if we changed some bits of the previous block ciphertext!! Obviously, next block plaintext has been changed!! Easy ha!!! let's do it practically.!!!

**Now come to the challange..!!**<br>
`Hosted on : nc noob.bckdr.in 10006`

```python
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad
from Crypto.Random import get_random_bytes

greeting = """

         ___    ___   _        ___  _____   ___      _   ___  
 _ __   / _ \  / _ \ | |__    / __\/__   \ / __\    / | / _ \ 
| '_ \ | | | || | | || '_ \  / /     / /\// _\_____ | || (_) |
| | | || |_| || |_| || |_) |/ /___  / /  / / |_____|| | \__, |
|_| |_| \___/  \___/ |_.__/ \____/  \/   \/         |_|   /_/ 
                                                              

"""

key = get_random_bytes(16)
iv = get_random_bytes(16)

flag = open('flag','rb').read().strip()

def encrypt_data(data):
    cipher = AES.new(key, AES.MODE_CBC,iv)
    enc = cipher.encrypt(pad(data,16,style='pkcs7'))
    return enc.encode('hex')

def decrypt_data(encryptedParams):
    cipher = AES.new(key, AES.MODE_CBC,iv)
    paddedParams = cipher.decrypt(encryptedParams.decode('hex'))
    return unpad(paddedParams,16,style='pkcs7')

print(greeting)
print('hey n00b!! you know how CBC bit flipping works?\nIf you flip the bit correctly i will reward you fl4g!')
print(line)
msg = "admin=0"
print("Current Auth Message is : " + msg)
print("Encryption of auth Message in hex : " + iv.encode('hex') + encrypt_data(msg))
enc_msg = raw_input("Give me Encrypted msg in hex : ")
try:
    final_dec_msg = decrypt_data(enc_msg)

    if "admin=1" in final_dec_msg:
        print('Whoa!! you got it!! Now its reward time!!')
        print(flag)
    else:
        print('Try again you can do it!!')
        exit()
except:
    print('bye bye!!')
```

<br>
We can see there is two function encrypt_data() and decrypt_data(). encrypt_data() take a message, randomly genrated key and iv and encrypt it.In CBC encryption and decryption for first block there is no previous block so at that time iv is used.
<br>

Here message is :  `admin=0`<br>
Block size is   :  `16`<br>
After pkcs7 padding message becomes : `admin=0\t\t\t\t\t\t\t\t\t`<br> here we added `\t` 9 times because `len('admin=0') = 7` 
and `16-7 = 9` so `chr(9)*9 = "\t\t\t\t\t\t\t\t\t"`<br><br>
Our target is to change the encrypted data so that after decryption message becomes : `admin=1`

**lets run the challenge**

```sh

 ~/ctf-2018/n00bctf18/Easy-Flipp$ nc noob.bckdr.in 10006  


         ___    ___   _        ___  _____   ___      _   ___  
 _ __   / _ \  / _ \ | |__    / __\/__   \ / __\    / | / _ \ 
| '_ \ | | | || | | || '_ \  / /     / /\// _\_____ | || (_) |
| | | || |_| || |_| || |_) |/ /___  / /  / / |_____|| | \__, |
|_| |_| \___/  \___/ |_.__/ \____/  \/   \/         |_|   /_/ 
                                                              


hey n00b!! you know how CBC bit flipping works?
If you flip the bit correctly i will reward you fl4g!
                                                                                                            
 _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _ 
(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)

Current Auth Message is : admin=0
Encryption of auth Message in hex : fefbc34b8c1ec3f371f37ab5378e0e212f3ffd012a824cd16ffe8030d8bcd963
Give me Encrypted msg in hex : 
```
<br>
The output encrypted message in hex and its length is 32 bytes.Let's check it for this i use ipython!!

```s
In [4]: a = "fefbc34b8c1ec3f371f37ab5378e0e212f3ffd012a824cd16ffe8030d8bcd963".decode('hex')

In [5]: len(a)
Out[5]: 32

```

In CTF we did not given the challenge file to participants because its easy though!!!
So by it's length we can know it is sum of `iv(16 bites)` and `message(16 bites)` in hex.!!

```s
In [4]: a = "fefbc34b8c1ec3f371f37ab5378e0e212f3ffd012a824cd16ffe8030d8bcd963".decode('hex')

In [5]: len(a)
Out[5]: 32

In [6]: a[:16]
Out[6]: '\xfe\xfb\xc3K\x8c\x1e\xc3\xf3q\xf3z\xb57\x8e\x0e!'

In [7]: a[16:]
Out[7]: '/?\xfd\x01*\x82L\xd1o\xfe\x800\xd8\xbc\xd9c'
```


So here first block is iv : `\xfe\xfb\xc3K\x8c\x1e\xc3\xf3q\xf3z\xb57\x8e\x0e!`<br>
Second block is padded encrypted message : `/?\xfd\x01*\x82L\xd1o\xfe\x800\xd8\xbc\xd9c`

Index of byte we have to change in message(`admin=0`) is : 6<br>

Normaly what happening in decryption function is it's decrypt the data with standerd 
`AES(/?\xfd\x01*\x82L\xd1o\xfe\x800\xd8\xbc\xd9c,key)` and `XORed` with previous block in this case it is `iv`.

`So if we change the byte which has index 6 in iv so that after xoring it make '1' not '0' in message`<br> 
`then we can get the flag.!!`

Initialy in decryption : `iv[6] ^ Dec_AES(message[6]) = '0'`<br>
We want `1` So xoring both side with `1` : `(iv[6]^1)^Dec_AES(message[6]) = '0^1'`<br>
which is :  `(iv[6]^1)^Dec_AES(message[6]) = '1'`

So what we have to do is just xor char of iv which has index 6 with 1 and after encode in hex and send it.!! let's do it..!!

```s
In [13]: a = "fefbc34b8c1ec3f371f37ab5378e0e212f3ffd012a824cd16ffe8030d8bcd963".decode('hex')

In [14]: a[6]
Out[14]: '\xc3'

In [15]: chr(ord('\xc3')^1)
Out[15]: '\xc2'

In [16]: a = a[:6] + '\xc2' + a[7:]

In [17]: a.encode('hex')
Out[17]: 'fefbc34b8c1ec2f371f37ab5378e0e212f3ffd012a824cd16ffe8030d8bcd963'

```
**Lets See what happen if we send this changed encrypted data:**

```sh
 ~/ctf-2018/n00bctf18/Easy-Flipp$ nc noob.bckdr.in 10006  


         ___    ___   _        ___  _____   ___      _   ___  
 _ __   / _ \  / _ \ | |__    / __\/__   \ / __\    / | / _ \ 
| '_ \ | | | || | | || '_ \  / /     / /\// _\_____ | || (_) |
| | | || |_| || |_| || |_) |/ /___  / /  / / |_____|| | \__, |
|_| |_| \___/  \___/ |_.__/ \____/  \/   \/         |_|   /_/ 
                                                              


hey n00b!! you know how CBC bit flipping works?
If you flip the bit correctly i will reward you fl4g!
                                                                                                            
 _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _ 
(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)

Current Auth Message is : admin=0
Encryption of auth Message in hex : fefbc34b8c1ec3f371f37ab5378e0e212f3ffd012a824cd16ffe8030d8bcd963
Give me Encrypted msg in hex : fefbc34b8c1ec2f371f37ab5378e0e212f3ffd012a824cd16ffe8030d8bcd963

Whoa!! you got it!! Now its reward time!!
CTF{XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}

```

*`flag is redacted because its hosted on backdoor server!!!`*