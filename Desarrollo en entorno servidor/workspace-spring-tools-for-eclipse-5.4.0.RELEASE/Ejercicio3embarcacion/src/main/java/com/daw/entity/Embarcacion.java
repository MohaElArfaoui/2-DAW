package com.daw.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="embarcacion")
public class Embarcacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;
	
	@Column(name = "matricula", nullable = false, length = 20, unique = true)
	private String matricula;
	
	@Column(name = "capacidad_pasajeros", nullable = false)
	private Integer capPasajeros;

	@Column(name = "anio_fabricacion", nullable = false)
	private Integer anioFabricacion;

	@OneToMany(mappedBy = "embarcacion", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Habitacion> habitaciones;

	@OneToMany(mappedBy = "embarcacion", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Crucero> cruceros;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}

	public Integer getCapPasajeros() {
		return capPasajeros;
	}

	public void setCapPasajeros(Integer capPasajeros) {
		this.capPasajeros = capPasajeros;
	}

	public Integer getAnioFabricacion() {
		return anioFabricacion;
	}

	public void setAnioFabricacion(Integer anioFabricacion) {
		this.anioFabricacion = anioFabricacion;
	}

	public List<Habitacion> getHabitaciones() {
		return habitaciones;
	}

	public void setHabitaciones(List<Habitacion> habitaciones) {
		this.habitaciones = habitaciones;
	}

	public List<Crucero> getCruceros() {
		return cruceros;
	}

	public void setCruceros(List<Crucero> cruceros) {
		this.cruceros = cruceros;
	}
	
	
	
}
