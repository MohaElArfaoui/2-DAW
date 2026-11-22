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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="habitacion")
public class Habitacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "numero", nullable = false)
	private Integer numero;
	
	@Column(name = "capacidad", nullable = false)
	private Integer capacidad;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_embarcacion", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_habitacion_embarcacion"))
	private Embarcacion embarcacion;
	
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_categoria", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_habitacion_categoria"))
	private Categoria categoria;
	
	@OneToMany(mappedBy = "habitacion", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Reserva> reservasHabitaciones;
	
}
