const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const CAT_AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
let user = localStorage.getItem("mail"); // variable para guardar el email

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

// Cuando se carga el documento agrego al 4to elemento de la barra de navegacion un link que redireccione a la pagina de usuario, (que esta en desarrollo) y a su vez se puede ver el correo electronico de la persona registrada - si no hay usuario ingresado por haber entrado a otro html que no sea el index se puede ver la leyenda "Ingresar" y si se clickea, se redirige a index.html

document.addEventListener("DOMContentLoaded", function (e) {
  if (user != null) {
    document.getElementsByClassName("nav-item")[3].innerHTML += `
    <a class="nav-link" href="my-profile.html"> ` + user + `
    </a>`
  } else {
    document.getElementsByClassName("nav-item")[3].innerHTML += `
    <a class="nav-link" href="index.html"> Ingresar
    </a>`
  }
});