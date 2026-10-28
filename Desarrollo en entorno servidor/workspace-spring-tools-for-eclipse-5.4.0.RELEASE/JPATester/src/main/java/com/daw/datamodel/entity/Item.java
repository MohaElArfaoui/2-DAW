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
	
	@Column(name = "nombre")
	private String name;	
	
	@Column(name = "descripcion")
	private String description;	
	
	@Column(name = "precio")
	private BigDecimal price;	
	
	@Column(name = "cantidad")
	private Integer quantity;	
	
	@Column(name = "fechaDeCreacion")
	private LocalDateTime created_at;
	
	@Column(name = "fechaDeActualizacion")
	private LocalDateTime updated_at;	
	
	@Column(name = "estaDisponible")
	private Boolean is_available;	
	
	@Column(name = "valoración")
	private Float rating;
	
	@Column(name = "fechaDeFabricacion")
	private LocalDate manufacture_date;	
	
	@Column(name = "fechaDeCaducidad")
	private LocalDateTime expiry_date;
	
	@Column(name = "categoria")
	@Enumerated(EnumType.STRING)
	private Category category;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public LocalDateTime getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}

	public Boolean getIs_available() {
		return is_available;
	}

	public void setIs_available(Boolean is_available) {
		this.is_available = is_available;
	}

	public Float getRating() {
		return rating;
	}

	public void setRating(Float rating) {
		this.rating = rating;
	}

	public LocalDate getManufacture_date() {
		return manufacture_date;
	}

	public void setManufacture_date(LocalDate manufacture_date) {
		this.manufacture_date = manufacture_date;
	}

	public LocalDateTime getExpiry_date() {
		return expiry_date;
	}

	public void setExpiry_date(LocalDateTime expiry_date) {
		this.expiry_date = expiry_date;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
	
	

	

}
