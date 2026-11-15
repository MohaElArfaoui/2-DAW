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
import jakarta.persistence.ManyToOne;
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
	
	@ManyToOne(fetch = FetchType.LAZY, optional=false)
	@JoinColumn(name = "id_equipo_local", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_equipo_local_partido"), nullable = false)
	private Equipo equipoLocal;
	
	@ManyToOne(fetch = FetchType.LAZY, optional=false)
	@JoinColumn(name = "id_equipo_visitante", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_equipo_visitante_partido"), nullable = false)
	private Equipo equipoVisitante;
	
	@Column(name = "gol_local", nullable = false)
	private Integer golLocal;
	
	@Column(name = "gol_visitante", nullable = false)
	private Integer golVisitante;
	
	
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
	
	
}
