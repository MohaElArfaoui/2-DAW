package com.daw.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "EsLocal")
public class EsLocal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "golLocal", nullable = false)
	private Integer golLocal;
	
	@OneToOne(mappedBy = "local", fetch = FetchType.LAZY)
	@JsonIgnore
	private Partido partido;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "equipo", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="FK_ES_LOCAL_EQUIPO"))
	private Equipo equipo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getGolLocal() {
		return golLocal;
	}

	public void setGolLocal(Integer golLocal) {
		this.golLocal = golLocal;
	}

	public Partido getPartido() {
		return partido;
	}

	public void setPartido(Partido partido) {
		this.partido = partido;
	}

	public Equipo getEquipo() {
		return equipo;
	}

	public void setEquipo(Equipo equipo) {
		this.equipo = equipo;
	}
	


	
	
	
	
	
}
