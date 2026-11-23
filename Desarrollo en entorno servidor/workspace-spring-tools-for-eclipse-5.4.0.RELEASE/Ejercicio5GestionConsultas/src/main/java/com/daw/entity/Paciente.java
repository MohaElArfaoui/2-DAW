package com.daw.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="paciente")
public class Paciente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;
	
	@Column(name = "apellido", nullable = false, length = 20)
	private String apellido;
	
	@Column(name = "tipo_doc", nullable = false, length = 20)
	private String tipoDoc;
	
	@Column(name = "nro_doc", nullable = false, length = 20)
	private String nroDoc;
	
	@Column(name = "fecha_nacimiento", nullable = false)
	private LocalDate fechaNac;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_cobertura_medica", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_paciente_cobertura_medica"))
	private CoberturaMedica coberturaMedica;
	
}
