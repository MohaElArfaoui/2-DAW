package com.daw.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
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
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="reserva")
public class Reserva {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "precio", nullable = false, scale = 2)
	private BigDecimal precio;
	
	@Column(name = "saldo_a_pagar", nullable = false, scale = 2)
	private BigDecimal saldoAPagar;
	
	@Column(name = "importe_comision", nullable = false, scale = 2)
	private BigDecimal importeComision;
	
	@Column(name = "capacidad_reservada", nullable = false)
	private Integer capacidadReservada;
	
	@Column(name = "fecha", nullable = false)
	private LocalDate fecha;
	
	@Column(name = "fecha_pago")
	private LocalDate fechaPago;
	
	@ManyToOne(fetch = FetchType.LAZY,optional = false)
	@JoinColumn(name = "id_crucero", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_reserva_crucero"))
	private Crucero crucero;
	
	@ManyToMany(mappedBy = "reservasPasajeros", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Pasajero> pasajerosReserva;
	
	@ManyToOne(fetch = FetchType.LAZY,optional = false)
	@JoinColumn(name = "id_habitacion", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_reserva_habitacion"))
	private Habitacion habitacion;
	
	@ManyToOne(fetch = FetchType.LAZY,optional = false)
	@JoinColumn(name = "id_agente", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_reserva_agente"))
	private Agente agente;
}
