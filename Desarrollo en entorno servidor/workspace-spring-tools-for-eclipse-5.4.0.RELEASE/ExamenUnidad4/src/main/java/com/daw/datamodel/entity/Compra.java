package com.daw.datamodel.entity;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "compra")
public class Compra {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "fecha", nullable = false)
	private LocalDate fecha;
	
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "id_cliente", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_compra_cliente"))
	private Cliente cliente;
	
	@OneToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_factura", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_compra_factura"))
	private Factura factura;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_vehiculo", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_compra_vehiculo"))
	private Vehiculo vehiculo;

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

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Factura getFactura() {
		return factura;
	}

	public void setFactura(Factura factura) {
		this.factura = factura;
	}

	public Vehiculo getVehiculo() {
		return vehiculo;
	}

	public void setVehiculo(Vehiculo vehiculo) {
		this.vehiculo = vehiculo;
	}


	
}
