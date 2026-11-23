package com.daw.datamodel.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="direccion")
public class Direccion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="tipo_via", nullable = false,length = 50)
	private String tipoVia;
	
	@Column(name="nombre_via", nullable = false,length = 50)
	private String nombreVia;
	
	@Column(name="numero", nullable = false)
	private Integer numero;
	
	@Column(name="piso", nullable = false)
	private Integer piso;
	
	@Column(name="letra", nullable = false, length = 1)
	private String letra;
	
	@ManyToMany(mappedBy = "direcciones", fetch = FetchType.LAZY) 
	private List<Persona> personas;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipoVia() {
		return tipoVia;
	}

	public void setTipoVia(String tipoVia) {
		this.tipoVia = tipoVia;
	}

	public String getNombreVia() {
		return nombreVia;
	}

	public void setNombreVia(String nombreVia) {
		this.nombreVia = nombreVia;
	}

	public Integer getNumero() {
		return numero;
	}

	public void setNumero(Integer numero) {
		this.numero = numero;
	}

	public Integer getPiso() {
		return piso;
	}

	public void setPiso(Integer piso) {
		this.piso = piso;
	}

	public String getLetra() {
		return letra;
	}

	public void setLetra(String letra) {
		this.letra = letra;
	}

	public List<Persona> getPersonas() {
		return personas;
	}

	public void setPersonas(List<Persona> personas) {
		this.personas = personas;
	}
	
	
}
