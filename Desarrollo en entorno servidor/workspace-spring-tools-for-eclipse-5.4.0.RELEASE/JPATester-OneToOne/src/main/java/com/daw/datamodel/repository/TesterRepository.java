package com.daw.datamodel.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class TesterRepository {

	@Autowired
	private EntityManager em;

	public List<?> findAll(Class<?> classReference) {

		TypedQuery<?> query = em.createQuery("SELECT p FROM " + classReference.getName() + " p", classReference);
		return query.getResultList();

	}

}
