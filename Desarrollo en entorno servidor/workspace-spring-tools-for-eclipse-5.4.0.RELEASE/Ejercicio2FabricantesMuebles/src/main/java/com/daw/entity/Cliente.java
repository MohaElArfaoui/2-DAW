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
@Table(name = "cliente")
public class Cliente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "dni", nullable = false, length = 20, unique = true)
	private String dni;
	
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;

	@Column(name = "apellido", nullable = false, length = 20)
	private String apellido;
	
	@Column(name = "direccion", nullable = false, length = 50)
	private String direccion;
	
	@Column(name = "telefono", nullable = false, precision = 9, scale = 0)
	private Integer telefono;

	
	@OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Compra> comprasCocinasCliente;


	
	public String getDireccion() {
		return direccion;
	}


	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}


	public Integer getTelefono() {
		return telefono;
	}


	public void setTelefono(Integer telefono) {
		this.telefono = telefono;
	}


	public List<Compra> getComprasCocinasCliente() {
		return comprasCocinasCliente;
	}


	public void setComprasCocinasCliente(List<Compra> comprasCocinasCliente) {
		this.comprasCocinasCliente = comprasCocinasCliente;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getDni() {
		return dni;
	}


	public void setDni(String dni) {
		this.dni = dni;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public String getApellido() {
		return apellido;
	}


	public void setApellido(String apellido) {
		this.apellido = apellido;
	}


	
	
}
