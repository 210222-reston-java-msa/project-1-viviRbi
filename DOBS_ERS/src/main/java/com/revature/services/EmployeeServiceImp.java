package com.revature.services;

import java.util.List;

import com.revature.dao.EmployeeDao;
import com.revature.dao.EmployeeDaoImp;
import com.revature.dao.ReimbushmentDaoUsedByEmp;
import com.revature.dao.ReimbushmentDaoUsedByEmpImp;
import com.revature.model.Employee;
import com.revature.model.Reimbushment;

public class EmployeeServiceImp implements EmployeeService{
	
	@Override
	public boolean submitReimbushmentRequest(int eid, double amount, int type_id) {
		ReimbushmentDaoUsedByEmp reDao = new ReimbushmentDaoUsedByEmpImp();
		boolean submited = reDao.submitReimbushmentRequest(eid, amount, type_id);
		return submited;
	}

	@Override
	public List<Reimbushment> viewPendingReimbushmentRequestById(int id) {
		ReimbushmentDaoUsedByEmp reDao = new ReimbushmentDaoUsedByEmpImp();
		List<Reimbushment> pendingById = reDao.viewAllPendingReimbushmentRequestById(id);
		return pendingById;
	}

	@Override
	public List<Reimbushment> viewResolveReimbushmentRequestById(int id) {
		ReimbushmentDaoUsedByEmp reDao = new ReimbushmentDaoUsedByEmpImp();
		List<Reimbushment> resolvedById = reDao.viewAllResolveReimbushmentRequestById(id);
		return resolvedById;
	}

	@Override
	public Employee viewProfile(int id) {
		EmployeeDao eDao = new EmployeeDaoImp();
		Employee eProfile;
		return null;
	}

	@Override
	public Employee updateProfile(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
