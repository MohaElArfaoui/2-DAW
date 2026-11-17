package com.daw.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="consultora")
public class Consultora {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="nombre", nullable = false, length = 20)
	private String nombre;
	
	@Column(name="cuit", nullable = false)
	private Integer cuit;
	
	@OneToMany(mappedBy = "consultora", fetch = FetchType.LAZY)
	private List<Externo> externos;

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

	public Integer getCuit() {
		return cuit;
	}

	public void setCuit(Integer cuit) {
		this.cuit = cuit;
	}

	public List<Externo> getExternos() {
		return externos;
	}

	public void setExternos(List<Externo> externos) {
		this.externos = externos;
	}


	
	
}
