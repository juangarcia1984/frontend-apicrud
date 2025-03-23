//declarar variables globales formulario login
userinput = document.querySelector("#usuarioform");
passinput = document.querySelector("#contraform");
btnlogin = document.querySelector(".btnlogin");

//evento al boton del formulario
btnlogin.addEventListener("click", ()=>{
    let dataform = getdata(); 
    senddata(dataform);
});

//funcion para validar el formulario
//obtener datos del formulario
let getdata = ()=>{
    //validar formulario
    let user;
    if (userinput.value && passinput.value){
        user = {
            usuario: userinput.value,
            contrasena: passinput.value
        }
        userinput.value = "";
        passinput.value = "";
    }else{
        alert("INGRESE LOS DATOS CORRECTAMENTE");
    }
    return user;
 };

 //funcion para recibir los datos y realizar la peticion al servidor
 let senddata = async(data)=>{
    let url = "http://localhost/backend-apiCrud/login";
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        if(respuesta.status === 401){
            alert("USUARIO Y/O CONTRASEÑA INCORRECTA")
        }else{
            let userlogin = await respuesta.json();
        alert("CREDENCIALES CORRECTAS");
        //guardar datos en locastorage
        localStorage.setItem("userlogin", JSON.stringify(userlogin))
        location.href = "../index.html";
        }
              
    } catch (error) {
        console.log(error);  
    }
 };
      