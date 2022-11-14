let mailLocal = localStorage.getItem("mail");

let firstName = document.getElementById("firstName");
let secondName = document.getElementById("secondName");
let firstLastname = document.getElementById("firstLastname");
let secondLastname = document.getElementById("secondLastname");
let photoInput = document.getElementById("photoInput");
let contactNumber = document.getElementById("contactNumber");
let email = document.getElementById("email");
let userLocal = localStorage.getItem("user");
let photo = document.getElementById("photo"); //foto del html

document.addEventListener("DOMContentLoaded", function () {
    if (mailLocal === null) {
        window.location = "index.html";
    }

    if (userLocal !== null) {
        showProfile();
    }
    email.value = mailLocal;
});

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

// crear un objeto con los datos de los input y guardarlo como string en el local storage
function saveProfile() {
    const user = {
        "name": firstName.value,
        "secondName": secondName.value,
        "firstLastname": firstLastname.value,
        "secondLastname": secondLastname.value,
        "profileImg": photo.src,
        "contactNumber": contactNumber.value,
        "email": email.value,
    }
    localStorage.setItem("user", JSON.stringify(user));

    if (email.value !== mailLocal) {
        localStorage.setItem("mail", email.value);
        showUserNav();
    }
    
}
//

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
                } else if (form.checkValidity()) {
                    //si está ok guardar el perfil y mostrar la alerta de éxito
                    saveProfile();
                    showAlertSuccess();
                }
                form.classList.add('was-validated');
            }, false);
        })
})()


//funcion para mostrar los datos guardados en local storage
function showProfile() {
    user = JSON.parse(localStorage.getItem("user"));
    console.log(user)

    firstName.value = user.name;
    secondName.value = user.secondName;
    firstLastname.value = user.firstLastname;
    secondLastname.value = user.secondLastname;
    contactNumber.value = user.contactNumber;
    photo.src = user.profileImg;
    email.value = mailLocal;
}
//

//cargar la foto seleccionada en el input y agregarla al html
function photoLoad() {
    var archivo = document.getElementById("photoInput").files[0];
    var reader = new FileReader();
    if (photoInput) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            document.getElementById("photo").src = reader.result;
        }
    }
}
  //