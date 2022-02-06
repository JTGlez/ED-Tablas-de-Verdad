<template>
    
            <b-container class="text-justify">

        <b-row>

            <b-col align="center">
  <h2 style="color:yellow !important;" align="center"><strong>Contactanos </strong></h2>

     
    <form action="lexsansa@gmail.com" target="" method="get" name="DPersonales">

	<label for="nombre">Nombre</label>
	<input type="text" name="nombre" id="nombre" placeholder="Escriba su nombre"/>

	<label for="apellidos">Apellido</label>
	<input type="text" name="apellidos" id="apellidos" placeholder="Escriba su Apellido"/>

	<label for="email">Email</label>
	<input type="email" name="email" id="email" placeholder="Escriba su email" required />

	<label for="asunto">Asunto</label>
	<input type ="text" name="asunto" id="asunto" placeholder="Nombre completo"/>

	<label for="mensaje">Tipo de Consulta</label>
	<textarea name="mensaje" for="mensaje" placeholder="Describa brevemente su duda" maxlength="300"></textarea>
	
	<input type="submit" name="contactoshtml" value="enviar datos"/>
</form>
</b-col>
</b-row>
</b-container>
</template>


<script>
export default {
    
}
</script>


<style>
/*fondo del contacto*/
form{
    
	width:300px;
	padding:16px;
	border-radius:10px;
	margin:20px;
    background-image: url(../assets/img/fondo.jpg);
}

form label{
	width:72px;
	font-weight:bold;
	display:inline-block;
}

form input[type="text"],
form input[type="email"]{
	width:180px;
	padding:3px 10px;
	border:1px solid #f6f6f6;
	border-radius:3px;
	background-color:#f6f6f6;
	margin:8px 0;
	display:inline-block;
}
/*boton*/
form input[type="submit"]{
	width:100%;
	padding:8px 16px;
	margin-top:32px;
	border:1px solid gold;
	border-radius:5px;
	display:block;
	color:#fff;
	background-color:goldenrod;
} 

form input[type="submit"]:hover{
	cursor:pointer;
}

textarea{
	width:100%;
	height:100px;
	border:1px solid #f6f6f6;
	border-radius:3px;
	background-color:#f6f6f6;			
	margin:8px 0;
	/*resize: vertical | horizontal | none | both*/
	resize:none;
	display:block;
}
</style>