$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	 $("#alertSuccess").text("");
	 $("#alertSuccess").hide();
	 $("#alertError").text("");
	 $("#alertError").hide();
	// Form validation-------------------
	var status = validateItemForm();
	if (status != true)
	 {
	 $("#alertError").text(status);
	 $("#alertError").show();
	 return;
	 }
	// If valid------------------------
	 $("#formItem").submit();
});
// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	 $("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val());
	 $("#pId").val($(this).closest("tr").find('td:eq(0)').text());
	 $("#researcherId").val($(this).closest("tr").find('td:eq(1)').text());
	 $("#clientId").val($(this).closest("tr").find('td:eq(2)').text());
	 $("#amount").val($(this).closest("tr").find('td:eq(3)').text());
}); 
// CLIENT-MODEL================================================================
function validateItemForm()
{
	// CODE
	if ($("#pId").val().trim() == "")
	 {
	 	return "Insert Item ProjectID.";
	 }
	// NAME
	if ($("#researcherId").val().trim() == "")
	 {
	 	return "Insert Item ResearcherID.";
	 } 
	// PRICE-------------------------------
	if ($("#amount").val().trim() == "")
	 {
	 	return "Insert Item Price.";
	 }
	// is numerical value
	var tmpPrice = $("#amount").val().trim();
	if (!$.isNumeric(tmpPrice))
	 {
	 	return "Insert a numerical value for Item Price.";
	 }
	// convert to decimal price
	 $("#itemPrice").val(parseFloat(tmpPrice).toFixed(2));
	// DESCRIPTION------------------------
	if ($("#cliendId").val().trim() == "")
	 {
	 	return "Insert Item ClientID.";
	 }
	return true;
}
//SAVE
$(document).on("click", "#btnSave", function(event)
	{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateItemForm();
	if (status != true)
	{
	$("#alertError").text(status);
	$("#alertError").show();
	return;
	}
	
	// If valid------------------------
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	$.ajax(
	{
	url : "FundAPI",
	type : type,
	data : $("#formItem").serialize(),
	dataType : "text",
	complete : function(response, status)
	{
	onItemSaveComplete(response.responseText, status);
	}
	});
});


function onItemSaveComplete(response, status)
{
	if (status == "success")
	{
	var resultSet = JSON.parse(response);
	if (resultSet.status.trim() == "success")
	{
	$("#alertSuccess").text("Successfully saved.");
	$("#alertSuccess").show();
	$("#divItemsGrid").html(resultSet.data);
	} else if (resultSet.status.trim() == "error")
	{
	$("#alertError").text(resultSet.data);
	$("#alertError").show();
	}
	} else if (status == "error")
	{
	$("#alertError").text("Error while saving.");
	$("#alertError").show();
	} else
	{
	$("#alertError").text("Unknown error while saving..");
	$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formItem")[0].reset();
}


$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidItemIDSave").val($(this).data("fundid"));
	$("#pId").val($(this).closest("tr").find('td:eq(0)').text());
	$("#researcherId").val($(this).closest("tr").find('td:eq(1)').text());
	$("#clientId").val($(this).closest("tr").find('td:eq(2)').text());
	$("#amount").val($(this).closest("tr").find('td:eq(3)').text());
})


$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
	url : "FundAPI",
	type : "DELETE",
	data : "fundid=" + $(this).data("fundid"),
	dataType : "text",
	complete : function(response, status)
	{
	onItemDeleteComplete(response.responseText, status);
	}
	});
})


function onItemDeleteComplete(response, status)
{
	if (status == "success")
	{
	var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
		$("#alertSuccess").text("Successfully deleted.");
		$("#alertSuccess").show();
		$("#divItemsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
		$("#alertError").text(resultSet.data);
		$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
	$("#alertError").text("Error while deleting.");
	$("#alertError").show();
	} 
	else
	{
	$("#alertError").text("Unknown error while deleting..");
	$("#alertError").show();
	}
}
