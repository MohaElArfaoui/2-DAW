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
@Table(name="parada_puerto")
public class ParadaPuerto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "fecha", nullable = false)
	private LocalDate fecha;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="id_crucero", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_parada_puerto_crucero"))
	private Crucero crucero;
	
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="id_puerto", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_parada_puerto_puerto"))
	private Puerto puerto;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public LocalDate getFecha() {
		return fecha;
	}


	public void setFecha(LocalDate fecha) {
		this.fecha = fecha;
	}


	public Crucero getCrucero() {
		return crucero;
	}


	public void setCrucero(Crucero crucero) {
		this.crucero = crucero;
	}


	public Puerto getPuerto() {
		return puerto;
	}


	public void setPuerto(Puerto puerto) {
		this.puerto = puerto;
	}
	
	
}
