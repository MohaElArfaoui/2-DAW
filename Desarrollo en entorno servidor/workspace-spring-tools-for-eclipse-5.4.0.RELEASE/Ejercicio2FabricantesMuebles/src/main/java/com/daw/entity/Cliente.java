package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cliente")
public class Cliente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "dni", nullable = false, length = 20)
	private String dni;
	
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;

	@Column(name = "apellido", nullable = false, length = 20)
	private String apellido;

}
