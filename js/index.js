function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}
//tomé como ejemplo la funcion del grupal para mostrar error en caso de no completar los datos//

const email = document.getElementById("email");
const pass = document.getElementById("password");
let enviar = document.getElementById("ingBtn");


function validar(){ 
// evalua los valores de email y password, sólo si los dos poseen datos se retorna true
    return email.value.length > 0 && pass.value.length > 0 ;
}

//se agrega el escuchador de "click" y se evalua si la funcion validar es true se redirecciona a main.html que es la pagina principal, de lo contrario muestra la alerta de error
enviar.addEventListener("click", function(){
    if (validar() === true) {
        localStorage.setItem("mail", email.value);
        window.location = "main.html";
    } else{ showAlertError()
    };
});




