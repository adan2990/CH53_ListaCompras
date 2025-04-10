//la variable txtName tomara del valor del elemento con ID Name
//refencia a un input
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
//contenedor de ValidacionesTexto, para que se vea
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");


//Numeracion de la primera columna de la tabla
let cont = 0;
let costoTotal=0;
let totalEnProductos=0;
let datos = new Array() //[];  cualquiera de las dos son validas, almacena los elementos de la tabla

function validarCantidad(){
    //validacion de que haya algo en el campo cantidad
    if(txtNumber.value.trim().length<=0){
        return false;
    }  //length <= 0

    //validacion de que es un numero
    if (isNaN(txtNumber.value)){
        return false;    //si no es un numer regresa falso
    }//funcion isNaN (No is a Number)

    //validacion cantidad mayor de 0
    if(Number(txtNumber.value)<=0){  //usamos constructor de numero, por eso el Number. Se convierte a numero
        return false;
    }// <=0

    return true;
} //validarCantidad

function getPrecio(){
    return Math.round((Math.random()*10000)) /100;
}

//poner la oreja
btnAgregar.addEventListener("click", function(event){

    event.preventDefault(); //investigar   es para que no haga lo que hace por defecto verdad?
    //bandera 
    let isValid = true;
    //Le quita los espacios del valor de txtName
    //el value es el valor que esta en txtName
    //siguientes 3 lineas quitar los cuadros rojos cuando se escribe algo mal, son los mismos campois del if pero modificados
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border=""; 
    txtNumber.style.border="";   //borrar el contorno rojo del campo number

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length < 3){
        //cambiamos el estilo del campo para verlo rojo cuando esta incorrecto
        txtName.style.border="solid medium red"; //borde solido, delgado y rojo
        alertValidacionesTexto.innerHTML="<strong> El nombre del producto no es correcto</strong>";
        //hacemos visible el contenedor div que tiene Alert ValidacionesTexto
        alertValidaciones.style.display="block";
        isValid = false;
    }

    if(! validarCantidad()){
        txtNumber.style.border="solid medium red"; //borde solido, delgado y rojo
        alertValidacionesTexto.innerHTML+="<br/><strong> El nombre del producto no es correcto</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    }

    if(isValid){ //si paso las validaciones
        cont++;
        let precio = getPrecio();
        let row =`<t>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
        </t>`
        //creamos el objeto elemento
        let elemento = {     //notacion de JSON, es un objeto
            "cont": cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio": precio
        };
        datos.push(elemento); //guardamos elemento en array datos
        //guardamos en localStorange
        localStorage.setItem("datos",JSON.stringify(datos)); //usamos el JSON.stringyfy para convertirlo a string


        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        
        //calculamos el costo total de todos los productos
        costoTotal += precio*Number(txtNumber.value);
        precioTotal.innerText ="$ "+ costoTotal.toFixed(2);  //toFixed(2) es para mostrar solo 2 decimales
        
        //poner el numero de productos en el circulo rojo
        contadorProductos.innerText = cont;

        //calcular el resumen 
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        //creamos objeto resumen y lo guardamos en el localStorage
        let resumen = {
            "cont": cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal": costoTotal
        };
        localStorage.setItem("resumen", JSON.stringify(resumen));



        //limpiamos los campos
        txtName.value = "";
        txtNumber.value = "";        
        //parpeamos //enfocamos los campos en blanco para agregar mas. Poner el cursor en el campo
        txtName.focus();

    }//isValid



}) //btnAgregar.addEventListener click

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    } //datos != null

    datos.forEach((d)=>{
        let row = `<tr>
                    <td>${d.cont}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>    
        </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont= resumen.cont;
    }//resumen != null
    precioTotal.innerText ="$ "+ costoTotal.toFixed(2); 
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;


}) //window.addEvenListened load
