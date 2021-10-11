<?php 
include_once('conexion.php'); 
 
//1. Crear conexión a la Base de Datos 
$con=mysqli_connect($host,$usuario,$clave,$bd) or die('Fallo la conexion'); 
mysqli_set_charset($con,"utf8"); 
 
  $pamd=1;      //Perfil Administrador 
  $pcli=2;        //Perfil Cliente 
 
if (isset($_POST['login'])) { 
  
          //Recoger datos Variables de Usuario 
           $usuario = $_POST['txtusuario']; 
           $pass = $_POST['txtpassword']; 
        
 
 
       //VALIDAR CONTENIDO EN LAS VARIABLES O CAJAS DE TEXTO 
 if (empty($usuario) | empty($pass))  
 { 
 header("location:./"); 
 exit(); 
 } 
  
//VALIDANDO EXISTENCIA DEL USUARIO 
 
            //$consulta = "SELECT * FROM usuarios WHERE usuario = '$usuario' and password = '$pass' and id_estado=1"; 
             $consulta = "SELECT * FROM usuarios WHERE username = '$usuario' AND clave = '$pass'"; 
           $resultado = mysqli_query($con, $consulta); 
  
 while($fila = mysqli_fetch_assoc($resultado)) 
             { 
  $usu=$fila['username'];  
  $clav=$fila['clave'];  
 } 
  
   
  //Valida Usuario y/Contraseña no coincidentes  
   if (($usu != $usuario) | ($clav != $pass)) 
 { 
 header("location:./"); 
 exit(); 
 }else{
  echo "Login Successful!";
 }
	//Valida perfil del Administrador  
   /*if ($perfil==$pamd)  
  { 
  session_start(); 
  $_SESSION['clave'] = $pass; 
  header("location:indexAdministrador.php"); 
  } 
   
  //Valida perfil Cliente  
  else if($perfil==$pcli) 
  { 
  session_start(); 
  $_SESSION['clave'] = $pass; 
  header("location:indexUsuario.php"); 
  } 
   
   
  //Valida perfil SperAdministrador  
  else if($perfil==$psadmon) 
  { 
  session_start(); 
  $_SESSION['clave'] = $pass; 
  header("location:indexAdministrador.php"); 
  } 
  else  
      { 
        header("location: ./"); 
        exit(); 
       } */
  
} 
 mysqli_close($con); 
 
?>