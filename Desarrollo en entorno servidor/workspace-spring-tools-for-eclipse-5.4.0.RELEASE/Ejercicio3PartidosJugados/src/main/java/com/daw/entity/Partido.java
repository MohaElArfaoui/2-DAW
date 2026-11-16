package com.daw.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "partido")
public class Partido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "cod",unique = true, nullable = false)
	private String cod;
	@Column(name = "fecha_y_hora", nullable = false)
	private LocalDateTime fechaYHora;
	

	
	@OneToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "local", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="FK_PARTIDO_ES_LOCAL"))
	private EsLocal local;
	
	
	@OneToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "visitante", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="FK_PARTIDO_ES_VISITANTE"))
	private EsVisitante visitante;


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


	public LocalDateTime getFechaYHora() {
		return fechaYHora;
	}


	public void setFechaYHora(LocalDateTime fechaYHora) {
		this.fechaYHora = fechaYHora;
	}



	public EsLocal getLocal() {
		return local;
	}


	public void setLocal(EsLocal local) {
		this.local = local;
	}


	public EsVisitante getVisitante() {
		return visitante;
	}


	public void setVisitante(EsVisitante visitante) {
		this.visitante = visitante;
	}






}
