const storage = localStorage.getItem('articles');
let carrito = JSON.parse(storage);

//cuando carga el documento hace la petición a la web el carrito pre-cargado y se llama a la función showCartInfo()
document.addEventListener("DOMContentLoaded", async function (e) {
    await getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            itemInicial = resultObj.data.articles;
            console.log(CART_INFO_URL + 25801 + EXT_TYPE);
            if (storage !== null ) {
                showCarrito(carrito);
            }else{
                carrito = itemInicial;
                console.log(carrito)
                localStorage.setItem("articles", JSON.stringify(carrito));
                showCarrito(carrito);
            }
        }
        else { console.log("ERROR AL OBTENER JSON") };
    });

    if (carrito !== null) {
        for (let i = 0; i < carrito.length; i++) {
        document.getElementById("cant" + i).addEventListener("change", function () {
            updateTotalCosts();
        });
    }}

    document.getElementById("premium").addEventListener("change", function () {
        comissionPercentage = 0.15;
        updateTotalCosts();
    });

    document.getElementById("express").addEventListener("change", function () {
        comissionPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standar").addEventListener("change", function () {
        comissionPercentage = 0.05;
        updateTotalCosts();
    });

});
//
let items = document.getElementById("items");
//función que muestra los asrtículos del carrito (local storage)
function showCarrito(articles) {
    let htmlContentToAppend = "";
    if (articles.length >= 1) {

        for (let i = 0; i < articles.length; i++) {
            let article = articles[i];
            htmlContentToAppend += `     
            <tr>
                <td class="col-2 id="photo"><img src="${article.image}"alt="" width="60%" height="60%"></td>
                <td class="col-3">${article.name}</td>
                <td class="col-3">${article.currency} ${article.unitCost}</td>
                 <td class="col-1"> <input type="number" id="cant${i}" min="1" required="" value="1" oninput="updateItemCost(${i})" class="form-control"></td>
                 <th class="col-2"><span id="subtotalItemCost${i}">USD 0</span></th>
                 <th class="col-1"><button type="button" class="btn btn-outline-danger" onclick="deleteItem(${i})"><i class="bi bi-trash3-fill"></i>
                 </button></th>
            </tr>
            `;
        };
        items.innerHTML = htmlContentToAppend;
    } else {
        items.innerHTML = "No hay artículos"
    }
    updateTotalCosts();
};
// //

let comissionPercentage = 0.15;
let MONEY_SYMBOL = "USD";

//función que calcula el subtotal del item, tomando la cantidad ingresada en el input y mostrando en el elemento de id "subtotalItemCost[i]" dicha cantidad multiplicada por el precio unitario 

function updateItemCost(i) {
    let subtotalItemCostHTML = document.getElementById("subtotalItemCost" + i);
    let cant = document.getElementById("cant" + i);
    if (subtotalItemCostHTML) {
        let subtotalItemCost = cant.value * carrito[i].unitCost;
        let currency = carrito[i].currency;
        if (carrito[i].currency !== MONEY_SYMBOL) {
            subtotalItemCost = Math.round(subtotalItemCost / 40);
            currency = MONEY_SYMBOL;
        }
        subtotalItemCostHTML.innerHTML = currency + " " + subtotalItemCost;
    };
};

//para actualizar los costos totales y mostrar en el html el subtotal general, el monto de la comision y el monto total

function updateTotalCosts() {
    let subtotalCost = 0;

    for (let i = 0; i < carrito.length; i++) {
        updateItemCost(i);
        let cant = document.getElementById("cant" + i);
        let subtotalItem = cant.value * carrito[i].unitCost
        if (carrito[i].currency !== MONEY_SYMBOL) {
            subtotalItem = Math.round(subtotalItem / 40);
        }
        subtotalCost = subtotalCost + subtotalItem;
    }
    let subtotalCostHTML = document.getElementById("subtotalText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let subtotalCostToShow = MONEY_SYMBOL + subtotalCost;
    let comissionToShow = MONEY_SYMBOL + Math.round((comissionPercentage * subtotalCost));
    let totalCostToShow = MONEY_SYMBOL + Math.round(subtotalCost * comissionPercentage + subtotalCost);

    subtotalCostHTML.innerHTML = subtotalCostToShow;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
};
//

//funcion para eliminar item del carrito
function deleteItem(i){
    carrito.splice(i, 1);
    localStorage.setItem("articles", JSON.stringify(carrito));
    showCarrito(carrito);
    };
//


let payMethod = document.getElementById("payMethod");

let creditCard = document.getElementById("creditCard");
let transf = document.getElementById("transf");
let cardNumber = document.getElementById("cardNumber");
let secCode = document.getElementById("secCode");
let expDate = document.getElementById("expDate");

let accountNumber = document.getElementById("accountNumber");

function setPayment() {
    if (creditCard.checked) {

        cardNumber.disabled = false;
        expDate.disabled = false;
        secCode.disabled = false;
        accountNumber.required = false;
        accountNumber.disabled = true;
        cardNumber.required = true;
        expDate.required = true;
        secCode.required = true;
        payMethod.innerHTML = "Tarjeta de credito";
        payMethod.setAttribute("style", "color: black;")
    } else {
        cardNumber.disabled = true;
        expDate.disabled = true;
        secCode.disabled = true;
        accountNumber.required = true;
        accountNumber.disabled = false;
        cardNumber.required = false;
        expDate.required = false;
        secCode.required = false;
        payMethod.innerHTML = "Transferencia Bancaria";
        payMethod.setAttribute("style", "color: black;")
    }
}

(function () {
    'use strict'

    // busca todos los formularios que queremos aplicar la validacion
    let forms = document.querySelectorAll('.needs-validation')

    // para cada uno aplicar preventDefault y si no esta validado detener
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!form.checkValidity()) {
                    e.stopPropagation();
                }
                if (!creditCard.checked && !transf.checked) {
                    payMethod.innerHTML = "Debe seleccionar una forma de pago";
                    payMethod.setAttribute("style", "color: red;");
                } else if (form.checkValidity()) {
                    showAlertSuccess();
                }
                form.classList.add('was-validated');
            }, false);
        })
})()

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}
