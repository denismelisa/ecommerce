//array donde se cargarán los datos recibidos:
let productsArray = [];
let btnSortDesc = document.getElementById("sortDesc");
let btnSortAsc = document.getElementById("sortAsc");
let btnRel = document.getElementById("sortBySoldCount");
let btnFilter = document.getElementById("rangeFilterCount");
let btnClear = document.getElementById("clearRangeFilter")
let minCost = document.getElementById("rangeFilterCountMin");
let maxCost = document.getElementById("rangeFilterCountMax");


//*función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array) {
    let htmlContentToAppend = ""

    //* un for of para iterar en los objetos del array recibido por parámetro de la función y agregar por cada uno de ellos y por medio del DOM, al elemento con ID "container" del html, varios div con los atributos de cada objeto iterado
    for (let product of array) {

        htmlContentToAppend += `
        <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="" class="img-thumbnail">
                </div>
                    <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4> 
                        <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div> `

        document.getElementById("container").innerHTML = htmlContentToAppend;
    };

    //se inserta el título y subtítulo de la categoría en el elemento de ID "container" del html (se toma como ejemplo categories.html)
    document.getElementById("title").innerHTML = ` 
    <div class="text-center p-4">
        <h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos de la categoría <strong> ` + productsArray.catName + `</strong></p>
    </div>
      `
}


/*EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener los artículos.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en productsArray.
-Por último, se llama a showProductsList() pasándole por parámetro productsArray.products que son los objetos que necesito.

*/

let catID = localStorage.getItem("catID"); /* obtengo el catID mediante localStorage para a continuacion agregarlo a la url  */

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray.products);
        }
        else { console.log("ERROR AL OBTENER JSON") }
    });

    /* Cuando se clickea el boton "btnSortDesc" se ordena el array de mayor precio a menor */
    btnSortDesc.addEventListener("click", function () { 
        let sortDescArray = productsArray.products;
        JSON.stringify(sortDescArray.sort((a, b) => {
            if (a.cost < b.cost) { return 1; }
            if (a.cost > b.cost) { return -1; }
            return 0;
        }));
        showProductsList(sortDescArray);
    });

    /* Cuando se clickea el boton "btnSortAsc" se ordena el array de menor precio a mayor */
    btnSortAsc.addEventListener("click", function () {
        let sortAscArray = productsArray.products;
        JSON.stringify(sortAscArray.sort((a, b) => {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        }));
        showProductsList(sortAscArray);
    });

    /* Cuando se clickea el boton "btnRel" se ordena el array de mayor cant. de vendidos a menor */
    btnRel.addEventListener("click", function () {
        let sortRelArray = productsArray.products;
        JSON.stringify(sortRelArray.sort((a, b) => {
            if (a.soldCount < b.soldCount) { return 1; }
            if (a.soldCount > b.soldCount) { return -1; }
            return 0;
        }));
        showProductsList(sortRelArray);
    });

    /* Cuando se clickea el boton "btnFilter" se filtra el array segùn los datos ingresados por el usuario */
    btnFilter.addEventListener("click", function () {
        let min = minCost.value;
        let max = maxCost.value;
        console.log(min);
        console.log(max);
        let filterArray = productsArray.products;
        filterArray = filterArray.filter(product => product.cost >= min && product.cost <= max);
        showProductsList(filterArray);
    });

    /* Cuando se clickea el boton "btnClear" se limpian los campos "min" y "max" y se muestra el array inicial */
    btnClear.addEventListener("click", function(){
        minCost.value = "";
        maxCost.value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList(productsArray.products);
    });

});

//funcion para guardar en el local storage el id de cada producto y redirigir a product-info.html -  es llamada al hacer click como se definió en la línea 20
function setProdID(id) { 
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}