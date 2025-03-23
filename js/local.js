//variables globales de admin
let nombreusuario = document.querySelector("#nombre-usuario");
let btnlogout = document.querySelector("#btnlogout");

document.addEventListener("DOMContentLoaded", ()=>{
    getuser();
})

//funsion para poner el nombre del usuario
let getuser = ()=> {
    let user = JSON.parse(localStorage.getItem("userlogin"));
    nombreusuario.textContent = user.nombre;
};

//evento para el boton del logout
btnlogout.addEventListener("click", ()=>{
    localStorage.removeItem("userlogin");
    location.href = "../login.html"
})