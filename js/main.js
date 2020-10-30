// default setting
'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");


// day 1
// day 2 
//
//


const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginInput = document.querySelector('#login');
const logInForm = document.querySelector('#logInForm');
const userName = document.querySelector ('.user-name');
const buttonOut = document.querySelector ('.button-out');
// day 2
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants =  document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');


let login = localStorage.getItem('proba');

// day 3


const restaurantTitle = document.querySelector('.restaurant-title');
const restaurantRating = document.querySelector('.rating');
const restaurantPrice = document.querySelector('.price');
const restaurantCategory = document.querySelector('.category');


function validName(str){
const regName = /^[a-zA][a-zA-Z0-9-_\.]{3,15}$/;
return regName.test(str);
}


const getData = async function(url){

  const responce = await fetch(url);

  if(!responce.ok){
    throw new Error(`Ошибка по адресу ${url}, 
    статус ошибки ${responce.status}!`);
  }

  return await responce.json();

};

// getData('./db/partners.json').then(function(data){

//   console.log(data);

// });

// окно авторизации
const toggleModalAuth = function() {
  modalAuth.classList.toggle('is-open');
  loginInput.style.backgroundColor = ''; 
  loginInput.style.borderColor = '';
  if( modalAuth.classList.contains('is-open')){
    disableScroll();
  } else {
    enableScroll();
  }
};

const toggleModal = function() {
  modal.classList.toggle("is-open");
};

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

    function logIn(event) {
      event.preventDefault();
        if (validName(loginInput.value)){
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
            loginInput.style.borderColor = '#000';
            logInForm.reset();
            }
    }
  
      buttonAuth.addEventListener('click', toggleModalAuth);
      closeAuth.addEventListener('click', toggleModalAuth);
      logInForm.addEventListener('submit', logIn);
      modalAuth.addEventListener('click', function(event){
      if (event.target.classList.contains('is-open')){
          toggleModalAuth();
        }
      } )

  }

function checkAuth(){
    if (login){
    authorized ();
  } else {
    notAuthorizen();
  }

}



function  createCardRestaurants ({ image, kitchen, name, price, stars,
    products, time_of_delivery: timeOfDelivery}){
   
const cardRestaurant = document.createElement('a');
cardRestaurant.className = 'card card-restaurant';
cardRestaurant.products = products;
cardRestaurant.info = { kitchen, name, price, stars, };

const card = `	
       	  <img src="${image}" alt=${name} class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name} </h3>
								<span class="card-tag tag">${timeOfDelivery} мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
								${stars}
								</div>
								<div class="price">От ${price} ₽</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>		 
          `;
          cardRestaurant.insertAdjacentHTML('beforeend', card);
          cardsRestaurants.insertAdjacentElement('beforeend', cardRestaurant);

}



function createCardGoods({ description, id, image, name, price  }){

 
  const card = document.createElement('div');
  card.className = 'card';  

  card.insertAdjacentHTML('beforeend', `
  						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
	  `);

  cardsMenu.insertAdjacentElement('beforeend',card);
} 


function openGoods(event){
  if (login){
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');
  if (restaurant){
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

const { name, kitchen, price, stars } = restaurant.info;


    restaurantTitle.textContent = name;
    restaurantRating.textContent = stars;
    restaurantPrice.textContent = `От ${price} ₽`;
    restaurantCategory.textContent = kitchen;

    getData(`./db/${restaurant.products}`).then(function(data){
    data.forEach(createCardGoods);

});

  }
  } else {
    toggleModalAuth();
    }
}



//  оброботчики событий

function init(){
  
  getData('./db/partners.json').then(function(data){
  
  data.forEach(createCardRestaurants);
  
  });
  cartButton.addEventListener("click", toggleModal);
  
  close.addEventListener("click", toggleModal);
  
  cardsRestaurants.addEventListener('click', openGoods);
  
  logo.addEventListener('click', function(){
      containerPromo.classList.remove('hide');
      restaurants.classList.remove('hide');
      menu.classList.add('hide');
  })
  
  checkAuth();
  
  //  slider
  
  new Swiper('.swiper-container', {
    sliderPerView: 1,
    loop: true,
    autoplay: true,
    effect: 'coverflow',
    // grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
  });
}

init();
