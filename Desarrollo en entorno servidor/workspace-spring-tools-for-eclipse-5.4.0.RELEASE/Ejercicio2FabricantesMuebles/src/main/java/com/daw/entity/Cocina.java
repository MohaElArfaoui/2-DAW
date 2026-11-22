package com.daw.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cocina")
public class Cocina {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "codigo", nullable = false, length = 20, unique = true)
	private String codigo;
	
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;
	
	@Column(name="numero_muebles", nullable = false)
	private Integer numMuebles;
	
	@Column(name = "numero_mesadas", nullable = false)
	private Integer numMesadas;
	
	@Column(name = "numero_altos", nullable = false)
	private Integer numAltos;
	
	@Column(name = "numero_bajos", nullable = false)
	private Integer numBajos;
	
	@Column(name = "numero_paneles", nullable = false)
	private Integer numPaneles;
	
	@OneToMany(mappedBy = "cocina",fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Mueble> muebles;
	
	@OneToOne(mappedBy = "cocina",fetch = FetchType.LAZY)
	@JsonIgnore	
	private Compra compra;
	

	public Integer getNumMesadas() {
		return numMesadas;
	}

	public void setNumMesadas(Integer numMesadas) {
		this.numMesadas = numMesadas;
	}

	public Integer getNumAltos() {
		return numAltos;
	}

	public void setNumAltos(Integer numAltos) {
		this.numAltos = numAltos;
	}

	public Integer getNumBajos() {
		return numBajos;
	}

	public void setNumBajos(Integer numBajos) {
		this.numBajos = numBajos;
	}

	public Integer getNumPaneles() {
		return numPaneles;
	}

	public void setNumPaneles(Integer numPaneles) {
		this.numPaneles = numPaneles;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Integer getNumMuebles() {
		return numMuebles;
	}

	public void setNumMuebles(Integer numMuebles) {
		this.numMuebles = numMuebles;
	}

	public List<Mueble> getMuebles() {
		return muebles;
	}

	public void setMuebles(List<Mueble> muebles) {
		this.muebles = muebles;
	}



	
}
