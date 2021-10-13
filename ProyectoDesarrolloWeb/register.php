<?php
include_once("conexion.php");

//1. Crear conexión a la Base de Datos

$con=mysqli_connect($host,$usuario,$clave,$bd) or die('Fallo la conexion');
mysqli_set_charset($con,"utf8");

//2. Tomar los campos provenientes del Formulario

$vnombre = $_POST['txtNombre'];
$vuser = $_POST['txtUser'];
$vcorreo = $_POST['txtcorreo'];
$vtelefono = $_POST['txttelefono'];
$vpass = $_POST['txtcontraseña'];
             
		   
 if($vnombre !=null && $vuser !=null && $vcorreo !=null && $vtelefono !=null && $vpass !=null){  
 
//3. Insertar campos en la Base de Datos 

$inserta = "INSERT INTO $bd.usuarios (nombre, correo, telefono, username, clave) VALUES ('$vnombre','$vcorreo','$vtelefono','$vuser','$vpass');";
           $resultado = mysqli_query($con, $inserta);
echo json_encode ($resultado);

//header("location:index.php");
	 
	 if(!$inserta){
		 echo "Fallo en la insercion del usuario";
	 }else{
		 echo "¡Usuario creado con exito!";
	 }

}


mysqli_close($con);
?>