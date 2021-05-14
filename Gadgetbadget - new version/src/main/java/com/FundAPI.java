package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Fund;

/**
 * Servlet implementation class FundAPI
 */
@WebServlet("/FundAPI")
public class FundAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	Fund fundObj = new Fund();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FundAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String output = fundObj.insertFund(
			     //request.getParameter("fundId"),
				 Integer.parseInt(request.getParameter("pId")),
				 Integer.parseInt(request.getParameter("researcherId")),
				 Integer.parseInt(request.getParameter("clientId")),
				 Float.parseFloat(request.getParameter("amount")));
				 response.getWriter().write(output);

	}
	
	private static Map getParasMap(HttpServletRequest request)
	{
		Map<String, String> map = new HashMap<String, String>();
		
		try
		{
			Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
			
			String queryString = scanner.hasNext() ?
			scanner.useDelimiter("\\A").next() : "";
			
			scanner.close();
			
			String[] params = queryString.split("&");
			
			for (String param : params)
			{
				String[] p = param.split("=");
				map.put(p[0], p[1]);
			}
		}
		catch (Exception e)
		{
		}
			return map;
		}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map paras = getParasMap(request);
		
		String output = fundObj.updateFund(
				 request.getParameter("fundId"),
				 request.getParameter("pId"),
				 request.getParameter("researcherId"),
				 request.getParameter("clientId"),
				 request.getParameter("amount"));
				 response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map paras = getParasMap(request);
		
		String output = fundObj.deleteFund(paras.get("fID").toString());
		
		response.getWriter().write(output);
	}

}
