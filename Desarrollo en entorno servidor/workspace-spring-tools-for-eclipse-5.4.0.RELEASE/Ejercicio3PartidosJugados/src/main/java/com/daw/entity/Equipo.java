package com.daw.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "equipo")
public class Equipo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "cod",unique = true, nullable = false)
	private String cod;
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;
	
	@OneToMany(mappedBy = "equipoLocal")
	@JsonIgnore
	private List<Partido> partidosLocal; 
	
	
	@OneToMany(mappedBy = "equipoVisitante")
	@JsonIgnore
	private List<Partido> partidosVisitante; 
	
	
	public List<Partido> getPartidosLocal() {
		return partidosLocal;
	}
	public void setPartidosLocal(List<Partido> partidosLocal) {
		this.partidosLocal = partidosLocal;
	}
	public List<Partido> getPartidosVisitante() {
		return partidosVisitante;
	}
	public void setPartidosVisitante(List<Partido> partidosVisitante) {
		this.partidosVisitante = partidosVisitante;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCod() {
		return cod;
	}
	public void setCod(String cod) {
		this.cod = cod;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	
}
