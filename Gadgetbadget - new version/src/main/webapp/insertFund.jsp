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

<%
		
		//Save---------------------------------
		if (request.getParameter("fundCode") != null)
		{
			
			 Fund fundObj = new Fund();
			 String stsMsg = "";
		 
			//Insert--------------------------
			if (request.getParameter("hidItemIDSave") == "")
			 {
				 stsMsg = fundObj.insertFund(
										     //request.getParameter("fundId"),
											 Integer.parseInt(request.getParameter("pId")),
											 Integer.parseInt(request.getParameter("researcherId")),
											 Integer.parseInt(request.getParameter("clientId")),
											 Float.parseFloat(request.getParameter("amount")));
			 }
			
			else//Update----------------------
			 {
				 stsMsg = fundObj.updateFund(
											 request.getParameter("fundId"),
											 request.getParameter("pId"),
											 request.getParameter("researcherId"),
											 request.getParameter("clientId"),
											 request.getParameter("amount"));
			 }
			
		 	session.setAttribute("statusMsg", stsMsg);
		 
		} 
	
	%>
	
	<%
	
		if (request.getParameter("hidItemIDDelete") != null)
		{
			
			 Fund itemObj = new Fund();
			 String stsMsg =
			 itemObj.deleteFund(request.getParameter("hidItemIDDelete"));
			 session.setAttribute("statusMsg", stsMsg);
			 
		}
%>

			<div class="container">
			
				 	<h1>My Store</h1>
				 	
				 	<p>please use this forum to <b>Insert Items</b></p>
				 	
				</div>
				
				<hr>
					
				<div class="container">
				
					<form id="formItem" name="formItem" method="post" action="insertFund.jsp">

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

</body>
</html>