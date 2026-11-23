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
@Table(name = "instalador")
public class Instalador {
	
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

	@Column(name = "cantidad_cocinas_instaladas", nullable = false)
	private Integer cantCocinasInst;

	@OneToMany(mappedBy = "instalador", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Compra> instaladorCocinasCliente;

	
	
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

	public Integer getCantCocinasInst() {
		return cantCocinasInst;
	}

	public void setCantCocinasInst(Integer cantCocinasInst) {
		this.cantCocinasInst = cantCocinasInst;
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



	public List<Compra> getInstaladorCocinasCliente() {
		return instaladorCocinasCliente;
	}

	public void setInstaladorCocinasCliente(List<Compra> instaladorCocinasCliente) {
		this.instaladorCocinasCliente = instaladorCocinasCliente;
	}


}
