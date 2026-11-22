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
	
	@Column(name = "cantidad", nullable = false)
	private Integer cantidad;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_cliente",referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_compra_cliente"))
	private Cliente cliente;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_instalador",referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_compra_instalador"))
	private Instalador instalador;
	
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_cocina", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_compra_cocina"))
	private Cocina cocina;
	
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

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Instalador getInstalador() {
		return instalador;
	}

	public void setInstalador(Instalador instalador) {
		this.instalador = instalador;
	}

	public Cocina getCocina() {
		return cocina;
	}

	public void setCocina(Cocina cocina) {
		this.cocina = cocina;
	}
	
	
	
	
}
