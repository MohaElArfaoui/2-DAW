package com.daw.datamodel.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class Item {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "name") //aqui va el nombre que hay en la base de datos
	private String nombre;	
	
	@Column(name = "description")
	private String descripcion;	
	
	@Column(name = "price")
	private BigDecimal precio;	
	
	@Column(name = "quantity")
	private Integer cantidad;	
	
	@Column(name = "created_at")
	private LocalDateTime fechaDeCreacion;
	
	@Column(name = "updated_at")
	private LocalDateTime fechaDeActualizacion;	
	
	@Column(name = "is_available")
	private Boolean estaDisponible;	
	
	@Column(name = "rating")
	private Float valoracion;
	
	@Column(name = "manufacture_date")
	private LocalDate fechaDeFabricacion;	
	
	@Column(name = "expiry_date")
	private LocalDateTime fechaDeCaducidad;
	
	@Column(name = "category")
	@Enumerated(EnumType.STRING)
	private Category categoria;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public BigDecimal getPrecio() {
		return precio;
	}

	public void setPrecio(BigDecimal precio) {
		this.precio = precio;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public LocalDateTime getFechaDeCreacion() {
		return fechaDeCreacion;
	}

	public void setFechaDeCreacion(LocalDateTime fechaDeCreacion) {
		this.fechaDeCreacion = fechaDeCreacion;
	}

	public LocalDateTime getFechaDeActualizacion() {
		return fechaDeActualizacion;
	}

	public void setFechaDeActualizacion(LocalDateTime fechaDeActualizacion) {
		this.fechaDeActualizacion = fechaDeActualizacion;
	}

	public Boolean getEstaDisponible() {
		return estaDisponible;
	}

	public void setEstaDisponible(Boolean estaDisponible) {
		this.estaDisponible = estaDisponible;
	}

	public Float getValoracion() {
		return valoracion;
	}

	public void setValoracion(Float valoracion) {
		this.valoracion = valoracion;
	}

	public LocalDate getFechaDeFabricacion() {
		return fechaDeFabricacion;
	}

	public void setFechaDeFabricacion(LocalDate fechaDeFabricacion) {
		this.fechaDeFabricacion = fechaDeFabricacion;
	}

	public LocalDateTime getFechaDeCaducidad() {
		return fechaDeCaducidad;
	}

	public void setFechaDeCaducidad(LocalDateTime fechaDeCaducidad) {
		this.fechaDeCaducidad = fechaDeCaducidad;
	}

	public Category getCategoria() {
		return categoria;
	}

	public void setCategoria(Category categoria) {
		this.categoria = categoria;
	}

}