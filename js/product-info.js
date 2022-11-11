let prodID = localStorage.getItem("prodID"); /* obtengo el prodID mediante localStorage para a continuacion agregarlo a la url  */

document.addEventListener("DOMContentLoaded", async function (e) {
    await getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            showProductInfo(productInfo);
            console.log((PRODUCT_INFO_URL + prodID + EXT_TYPE));

        }
        else { console.log("ERROR AL OBTENER JSON") }
    });

    await getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComment = resultObj.data;
            showProductComments(productComment);
        }
        else { console.log("ERROR AL OBTENER JSON") }
    });

    showRelatedProducts(productInfo.relatedProducts);

});


function showProductInfo(product) {
    let htmlContentToAppend = "";

    htmlContentToAppend = `
                <div class="text-left p-4">
                    <div class="row align-items-start">
                        <div class="col">
                            <h2>${product.name}</h2> 
                        </div>
                        <div class="col-3">
                            <button type="button" onclick="addToStorage()" class="btn btn-success cursor-active">Comprar</button>
                        </div>
                        <hr>
                    </div>                    
                    <div class="row align-items-start">
                        <div class="col">
                            <h5 class="mb-1"> <strong> Precio </strong></h5>
                        </div>
                        <div class="col-3">
                        <a href="products.html" class="link-dark">Volver al listado </a>
                        </div>
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

    let carousel = `
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${product.images[0]}" class="d-block w-100" alt="desliza">
                </div>`;
    for (let i = 1; i < product.images.length; i++) {
        let image = product.images[i];
        carousel += `
                <div class="carousel-item">
                    <img src="${image}" class="d-block w-100" alt="...">
                </div>`;
    }

    carousel += `
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            <hr>
        </div>`;

    // `<div class="row">
    //         <div class="col-md-4">
    //             <div class="card mb-4 shadow-sm custom-card">
    //                 <img class="bd-placeholder-img card-img-top" src="${image}" alt="" class="img-thumbnail">
    //             </div>
    //         </div>
    //     </div>`

    htmlContentToAppend += carousel;

    document.getElementById("container").innerHTML += htmlContentToAppend;

}

function showProductComments(comments) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div class="text-left p-4">
        <h2>Comentarios</h2>
        <div id= "table">
        <table>
        <tbody>
    <div>`;

    let starChecked = `<span class="fa fa-star checked"></span>`
    let starUnchecked = `<span class="fa fa-star"></span>`
    

    for (const comment of comments) {
        if (comment.score === 1) {
            comment.score = starChecked + starUnchecked.repeat(4);
            
        } else if (comment.score === 2) {
            comment.score = starChecked.repeat(2) + starUnchecked.repeat(3);

        } else if (comment.score === 3) {
            comment.score = starChecked.repeat(3) + starUnchecked.repeat(2);

        } else if (comment.score === 4) {
            comment.score = starChecked.repeat(4) + starUnchecked.repeat(1);

        } else if (comment.score === 5) {
            comment.score = starChecked.repeat(5);
        }

        htmlContentToAppend += `
                    <tr class="c" id = "col">
                        <td><strong>${comment.user} </strong></td>
                        <td>-${comment.dateTime}-</td>
                        <td>${comment.score}</td>
                    </tr>
                    <tr class="c">
                    <td id = "fila" colspan="3">${comment.description}</td>
                    </tr>
                    `;
    }
    `</tbody>
            </table>
        <div>
        
        `;

    document.getElementById("container").innerHTML += htmlContentToAppend;
};

function addToStorage() {
    let itemToAdd = {
        "id": productInfo.id,
        "name": productInfo.name,
        "count": 1,
        "unitCost": productInfo.cost,
        "currency": productInfo.currency,
        "image": productInfo.images[0]
    }
    let storage = localStorage.getItem("articles");

    if (storage !== null) {
        let carrito = JSON.parse(storage);
        carrito.push(itemToAdd);
        localStorage.setItem("articles", JSON.stringify(carrito));
        console.log(carrito);
    } else {
        let carrito = new Array();
        carrito.push(itemToAdd);
        localStorage.setItem("articles", JSON.stringify(carrito));
    }
    window.location = "cart.html";
}

function showRelatedProducts(products) {
    let htmlContentToAppend = "";

    htmlContentToAppend += `
    <div class="text-left p-4">
        <h2>Productos relacionados</h2>
        <div class="row">
            <div class="col-md-6" id="images-rp">`

    for (const product of products) {
        htmlContentToAppend += `   
        
                <div onclick="setProdID(${product.id})" class="card cursor-active">
                    <img src="${product.image}" alt="" class="img-thumbnail card-img-top">
                    <div class="card-body">
                        <h3 class="card-title">${product.name}</h3>
                    </div>
                </div>
            `;
    }
    htmlContentToAppend += `
            </div>
    </div>
    </div>`;

    document.getElementById("relatedProducts").innerHTML += htmlContentToAppend;

}
