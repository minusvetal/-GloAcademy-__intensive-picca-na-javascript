const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");


cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}




// day 1
//
//
//


const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginInput = document.querySelector('#login');
const logInForm = document.querySelector('#logInForm');
const userName = document.querySelector ('.user-name');
const buttonOut = document.querySelector ('.button-out');

let login = localStorage.getItem('proba');


function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized(){
  console.log("Авторизован");

  function logOut(){
    login = null;
    localStorage.removeItem('proba');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

    userName.textContent = login;

    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';
    buttonOut.addEventListener('click', logOut);
}

function notAuthorizen() {
    console.log("Не авторизован");

    function logIn(event){
      event.preventDefault();
  if (loginInput.value.trim()){
      login = loginInput.value; 
      localStorage.setItem('proba', login);
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkAuth();
} else {
  alert("Лошара впиши логин и пароль");
  loginInput.style.backgroundColor = 'yellow '; 
  loginInput.style.borderColor = '#000'
  logInForm.reset();
}

    }
  
      buttonAuth.addEventListener('click', toggleModalAuth);
      closeAuth.addEventListener('click', toggleModalAuth);
      logInForm.addEventListener('submit', logIn);

  }

function checkAuth(){
    if (login){
    authorized ();
  } else {
    notAuthorizen();
  }

}
checkAuth();

