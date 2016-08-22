<!DOCTYPE html>
<html lang="en">
<head>
	<style type="text/css">
		h1, h2 {
			text-align: center;
		}
		.center {
			text-align: center;
		}
	</style>
	<meta charset="UTF-8">
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	
	<title>Перевод чисел в текст</title>
</head>
<body>
	<div class="container">
		<h1>Тестовое задание для соискателей на должность разработчика в компанию “Дигт-Телеком”</h1>
		<h5> Разработайте web-приложение на JavaScript, которое будет переводить число в его текстовое написание. Например вводим “1234” получаем ответ “одна тысяча двести тридцать четыре”. 
		Для оформления используйте Bootstrap.</h2>
		<hr>

		<h5 class="center">Инструкция: На вход можно подать числа от 0 до 999999999999.</h5>
		<hr><hr>
				<h2>Перевод чисел в текст</h1>
		<form class="form-horizontal">

			<!-- Text input-->
			<div class="form-group">
			  <label class="col-md-4 control-label" for="textinput"></label>  
			  <div class="col-md-4">
			  <input type="number" id="number_input" autofocus name="textinput" type="text" placeholder="1234" value="" class="form-control input-md">
			  <span class="help-block">введите число</span>  
			  </div>
			</div>

			<!-- Text input-->
			<div class="form-group">
			  <label class="col-md-4 control-label" for="textarea"></label>
			  <div class="col-md-4">
			  <textarea disabled id="result" name="textinput" type="textarea" rows="5" placeholder="Числовое поле пустое" class="form-control input-md"></textarea>
			  <span class="help-block">результат</span>  
			  </div>
			</div>
			</form>
	</div>
<script language="javascript" src="js/script.js"></script>
</body>
</html>