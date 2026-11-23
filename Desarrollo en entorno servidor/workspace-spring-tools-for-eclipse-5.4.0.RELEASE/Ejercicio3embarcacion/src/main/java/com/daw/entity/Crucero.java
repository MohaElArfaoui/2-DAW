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
@Table(name="crucero")
public class Crucero {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;
	
	@Column(name = "dias_duracion", nullable = false)
	private Integer diasDuracion;
	
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_embarcacion", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_crucero_embarcacion"))
	private Embarcacion embarcacion;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "crucero")
	@JsonIgnore
	private List<Reserva> reservas;
	

	@OneToMany(mappedBy = "crucero", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<ParadaPuerto> paradasCruceros;
	
	@OneToMany(mappedBy = "crucero", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Tarifa> tarifasCruceros;
}
