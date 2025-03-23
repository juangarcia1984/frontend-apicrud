//variables globales del formulario
let nameinput = document.querySelector("#productos-select");
let precioinput = document.querySelector("#precio-pro");
let stockinput = document.querySelector("#stock-pro");
let descripcioninput = document.querySelector("#stock-pro");
let imagen = document.querySelector("#imagen-pro");
let btncrear = document.querySelector(".btn-create");

//evento al boton del formulario
btncrear.addEventListener("click", ()=>{
    //alert(nameinput.value)
    let dataproducto = getdataproducto();
    senddataproducto(dataproducto);
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
        }
              
    } catch (error) {
        console.log(error);  
    }
 };