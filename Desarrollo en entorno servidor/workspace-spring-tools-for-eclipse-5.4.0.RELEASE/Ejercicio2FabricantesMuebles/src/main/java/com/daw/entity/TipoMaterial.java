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
@Table(name = "tipo_material")
public class TipoMaterial {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "codigo", nullable = false, length = 20, unique = true)
	private String codigo;
	
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;
	
	@OneToMany(mappedBy = "tipoMaterial",fetch = FetchType.LAZY)
	@JsonIgnore
	private List<TipoMuebleMesada> tiposMesada;

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

	public List<TipoMuebleMesada> getTiposMesada() {
		return tiposMesada;
	}

	public void setTiposMesada(List<TipoMuebleMesada> tiposMesada) {
		this.tiposMesada = tiposMesada;
	}
	
	
}
