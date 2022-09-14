let prodID = localStorage.getItem("prodID"); /* obtengo el prodID mediante localStorage para a continuacion agregarlo a la url  */

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            console.log(productInfo);
            console.log(PRODUCT_INFO_URL + prodID + EXT_TYPE);
            console.log(productInfo.name);
            showProductInfo(productInfo);
        }
        else { console.log("ERROR AL OBTENER JSON") }
    });
});


function showProductInfo(product) {
    let htmlContentToAppend = "";

   //se inserta el título y subtítulo de la categoría en el elemento de ID "container" del html (se toma como ejemplo categories.html)

        htmlContentToAppend += `
                <div class="text-left p-4">
                    <h2>${product.name}</h2>
                    <hr>
                    <div class="row">
                        <h5 class="mb-1"> <strong> Precio </strong></h5>
                        <p class="mb-1">${product.currency} ${product.cost}</p>
                        <br>
                        <br>
                        <h5 class="mb-1"> <strong> Descripción </strong></h5>
                        <p class="mb-1">${product.description}</p>
                        <br>
                        <br>
                        <h5 class="mb-1"> <strong> Categoría </strong></h5>
                        <p class="mb-1">${product.category}</p>
                        <br>
                        <br>
                        <h5 class="mb-1"> <strong> Cantidad de vendidos </strong></h5>
                        <p class="mb-1">${product.soldCount}</p>
                        <br>
                        <br>
                        <h5 class="mb-1"> <strong> Imágenes ilustrativas </strong></h5>
                    </div>
                </div>`;

        for (const image of product.images) {
            htmlContentToAppend +=  
                `<div class="text-left p-4">
                    <div class="row">
                        <img src="${image}" alt="" class="img-thumbnail">
                    </div>
                </div>`;            
        }
                                    
    document.getElementById("container").innerHTML += htmlContentToAppend;
    
}

