package com.daw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daw.datamodel.repository.TesterRepository;

@Service
public class TesterService {
	
	@Autowired
	private TesterRepository repositorio;
	
	public List<?> findAll(Class<?> classReference) {
		return repositorio.findAll(classReference);
	}

}
