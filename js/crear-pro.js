//variables globales del formulario
let nameinput = document.querySelector("#productos-select");
let precioinput = document.querySelector("#precio-pro");
let stockinput = document.querySelector("#stock-pro");
let descripcioninput = document.querySelector("#des-pro");
let imagen = document.querySelector("#imagen-pro");
let btncrear = document.querySelector(".btn-create");
let productoactualizado;
//variables globales de admin
let nombreusuario = document.querySelector("#nombre-usuario");
let btnlogout = document.querySelector("#btnlogout");

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

//evento al boton del formulario
btncrear.addEventListener("click", ()=>{
    let dataproducto = getdataproducto();
    senddataproducto(dataproducto);
});

//evento al navegador
document.addEventListener("DOMContentLoaded", ()=>{
    getuser();
    productoactualizado = JSON.parse(localStorage.getItem("productoeditado"));
    if(productoactualizado != null){
        actualizardatoproducto();
    }
});

//funcion para validar formulario y obtener los datos
let getdataproducto = ()=>{
    //validar formulario
    let producto;
    if (nameinput.value && precioinput.value && stockinput.value && descripcioninput.value && imagen.src){
        producto = {
            nombre:nameinput.value,
            descripcion:descripcioninput.value,
            precio:precioinput.value,
            stock:stockinput.value,
            imagen:imagen.src
        }
        precioinput.value = "";
        descripcioninput.value = "";
        stockinput.value = "";
        imagen.src = "https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
        console.log(producto);
    }else{
       alert("TODOS LOS CAMPOS SON OBLIGATORIOS")
    }
    return producto;
 };


 //funcion para recibir los datos y realizar la peticion al servidor
 let senddataproducto = async(data)=>{
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        if(respuesta.status === 406){
            alert("DATOS INCORRECTOS")
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message)
            //location.href = "../listadopro.js"
        }
              
    } catch (error) {
        console.log(error);  
    }
 };

 //funcion para editar el producto
 let actualizardatoproducto = ()=>{
    //agregar datos a editar en el formulario
    nameinput.value = productoactualizado.nombre;
    precioinput.value = productoactualizado.precio;
    stockinput.value = productoactualizado.stock;
    descripcioninput.value = productoactualizado.descripcion;
    imagen.src = productoactualizado.imagen;
    let producto;

    //alternar el boton de crear y editar
    let btnedit = document.querySelector(".btn-update");
    btncrear.classList.toggle("d-none");
    btnedit.classList.toggle("d-none");

    //agrgar evento al boton editar
    btnedit.addEventListener("click", ()=>{
        producto = {
            id: productoactualizado.id,
            nombre:nameinput.value,
            descripcion:descripcioninput.value,
            precio:precioinput.value,
            stock:stockinput.value,
            imagen:imagen.src
        }
        //borrar info del localstorage
        localStorage.removeItem("productoeditado");
        //pasar los datos del producto al a la funcion
        sendupdateproducto(producto);
    });
 };

 //fumcion para realizar la peticion al servidor
 let sendupdateproducto = async (pro)=>{
        let url = "http://localhost/backend-apiCrud/productos";
        try {
            let respuesta = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(pro)
            });
            if(respuesta.status === 406){
                alert("DATOS INCORRECTOS")
            }else{
                let mensaje = await respuesta.json();
                alert(mensaje.message)
                location.href = "../listado-pro.html"
            }
                  
        } catch (error) {
            console.log(error);  
        }

 }