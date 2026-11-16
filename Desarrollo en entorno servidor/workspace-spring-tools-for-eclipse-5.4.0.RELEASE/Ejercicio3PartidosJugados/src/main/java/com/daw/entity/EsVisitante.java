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
@Table(name = "EsVisitante")
public class EsVisitante {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "golVisitante", nullable = false)
	private Integer golVisitante;
	
	@OneToOne(mappedBy = "visitante", fetch = FetchType.LAZY)
	@JsonIgnore
	private Partido partido;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "equipo", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="FK_ES_VISITANTE_EQUIPO"))
	private Equipo equipo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getGolVisitante() {
		return golVisitante;
	}

	public void setGolVisitante(Integer golVisitante) {
		this.golVisitante = golVisitante;
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
