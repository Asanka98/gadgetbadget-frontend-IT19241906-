<%@page import="model.Fund"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel = "stylesheet" href = "Views/bootstrap.min.css">
<script src = "Components/jquery-3.6.0.min.js"></script>
<script src = "Components/Fund.js"></script>

<title>Insert Fund</title>
</head>
<body>

			<div class="container">
			
				 	<h1>Welcome</h1>
				 	
				 	<p>please use this forum to <b>Insert Funds</b></p>
				 	
				</div>
				
				<hr>
					
				<div class="container">
				
					<form id="formItem" name="formItem">

						PID:
						<input id="pId" name="pId" type="text"class="form-control form-control-sm">
						<br> 
						
						Researcher ID:
						<input id="researcherId" name="researcherId" type="text"class="form-control form-control-sm">
						<br>
						
						Client ID:
						<input id="clientId" name="clientId" type="text"class="form-control form-control-sm">
						<br>
						
						Amount:
						<input id="amount" name="amount" type="text"class="form-control form-control-sm">
						<br>
						
						<input id="btnSave" name="btnSave" type="button" value="Save"class="btn btn-primary">
						
						<input type="hidden" id="hidItemIDSave" name="hidItemIDSave" value="">
					</form>
								 
			</div>
			
			<div id="alertSuccess" class="alert alert-success"></div>
     		<div id="alertError" class="alert alert-danger"></div>
     		
     		<div class="container">
     		<div id="divItemsGrid">
			<%
			Fund itemObj = new Fund();
			out.print(itemObj.listFunds());
			%>
			</div>
			</div>
</body>
</html>