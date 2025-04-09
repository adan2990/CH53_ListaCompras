//la variable txtName tomara del valor del elemento con ID Name
//refencia a un input
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
//contenedor de ValidacionesTexto, para que se vea
let alertValidaciones = document.getElementById("alertValidaciones");

//poner la oreja
btnAgregar.addEventListener("click", function(event){
    event.preventDefault(); //investigar   es para que no haga lo que hace por defecto verdad?
    //Le quita los espacios del valor de txtName
    //el value es el valor que esta en txtName
    txtName.value = txtName.value.trim();
    txtNumber.value = txtName.value.trim();

    if(txtName.value.length < 3){
        //cambiamos el estilo del campo para verlo rojo cuando esta incorrecto
        txtName.style.border="solid medium red"; //borde solido, delgado y rojo
        alertValidacionesTexto.innerHTML="<strong> El nombre del producto no es correcto</strong>";
        //hacemos visible el contenedor div que tiene Alert ValidacionesTexto
        alertValidaciones.style.display="block";
    }
}) //btn agregar
