package com.revature.servlet.viewReimbushment;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.model.Reimbushment;
import com.revature.model.SendingAlert;
import com.revature.services.EmployeeService;
import com.revature.services.EmployeeServiceImp;

@WebServlet("/viewPendingRequestById")
public class ViewPendingRequestById extends HttpServlet{
	public static final long serialVersionUID = 1L;
	// Convert obj to json and vice versa
	ObjectMapper om = new ObjectMapper();
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)  throws ServletException, IOException {
		int eid = Integer.parseInt(req.getParameter("eid"));
		System.out.println(eid);
		EmployeeService e = new EmployeeServiceImp();	
		List<Reimbushment> allPending = e.viewPendingReimbushmentRequestById(eid);
		
		System.out.println("view all pending request by id");
		System.out.println(allPending);
		// Prepare to write response
		PrintWriter pw = resp.getWriter();
		
		// If able to get at least 1 employee
		if (allPending != null) {
			resp.setContentType("application/json");
			String jsonReIs = om.writeValueAsString(allPending);
			pw.println(jsonReIs);
		}else {
			SendingAlert err = new SendingAlert();
			err.setStatusCode(204);
			err.setDescription("No Content Found");
			err.setMessage("There is no reimbushment.");
			resp.setContentType("application/json");
			pw.println(om.writeValueAsString(err));
		}
		pw.close();
	}
}
