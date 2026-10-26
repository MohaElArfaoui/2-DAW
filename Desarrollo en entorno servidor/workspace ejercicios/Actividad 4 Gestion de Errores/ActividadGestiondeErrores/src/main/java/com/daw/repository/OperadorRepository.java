package com.daw.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.model.Operador;

@Repository
public interface OperadorRepository extends JpaRepository<Operador, Long> {
	
}