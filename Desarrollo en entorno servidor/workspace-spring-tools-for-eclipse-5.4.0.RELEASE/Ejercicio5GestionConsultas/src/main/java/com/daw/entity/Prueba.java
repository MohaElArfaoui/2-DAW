

package com.daw.entity;

import java.time.LocalDate;

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
@Table(name="prueba")
public class Prueba {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "fecha", nullable = false)
	private LocalDate fecha;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_paciente", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_prueba_paciente"))
	private Paciente paciente;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_tipo_estudio", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_prueba_tipo_estudio"))
	private TipoEstudio tipoEstudio;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getFecha() {
		return fecha;
	}

	public void setFecha(LocalDate fecha) {
		this.fecha = fecha;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	public TipoEstudio getTipoEstudio() {
		return tipoEstudio;
	}

	public void setTipoEstudio(TipoEstudio tipoEstudio) {
		this.tipoEstudio = tipoEstudio;
	}
	
	
}
