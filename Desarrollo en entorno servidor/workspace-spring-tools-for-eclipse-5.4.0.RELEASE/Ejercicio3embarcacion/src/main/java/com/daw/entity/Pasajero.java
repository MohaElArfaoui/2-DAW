package com.daw.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="pasajero")
public class Pasajero {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombre", nullable = false, length =20)
	private String nombre;
	
	@Column(name = "apellido", nullable = false, length =20)
	private String apellido;
	
	@Column(name = "tipo_doc", nullable = false, length =20)
	private String tipoDoc;
	
	@Column(name = "numero_doc", nullable = false, unique = true, length =20)
	private String numeroDoc;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "rel_pasajero_reserva", 
	joinColumns = @JoinColumn(name="id_pasajero", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_pasajero_reserva")),
	inverseJoinColumns = @JoinColumn(name="id_reserva", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_reserva_pasajero")))
	private List<Reserva> reservasPasajeros;
}
