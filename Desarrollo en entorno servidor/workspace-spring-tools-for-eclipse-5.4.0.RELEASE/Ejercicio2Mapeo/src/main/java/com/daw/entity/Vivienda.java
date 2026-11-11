package com.daw.entity;

import java.math.BigDecimal;
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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="house")
public class Vivienda {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "address", nullable = false)
	private String direccion;
	
	@Column(name="code", unique = true, nullable = false)
	private Long codigo;
	
	@Column(name = "m2Tot", nullable = false)
	private BigDecimal m2Tot;
	
	@Column(name = "m2Edif", nullable = false)
	private BigDecimal m2Edif;
	
	//La joinColumn hace referencia a la entidad donde estoy, mientras que la inverseJoinColumn apuntaria a la otra entiedad.
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "rel_house_person", joinColumns = @JoinColumn(name="house", nullable = false, foreignKey = @ForeignKey(name="fk_house")),
	inverseJoinColumns = @JoinColumn(name="person", nullable = false, foreignKey = @ForeignKey(name="fk_person")))
	private List<Persona> propietarios;
	
	@OneToMany(mappedBy = "vivienda")
	@JsonIgnore
	private List<Persona> habitantes;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="id_municipio", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_municipio_vivienda")) 
	private Municipio municipio;
	

	
	public List<Persona> getPropietarios() {
		return propietarios;
	}
	public void setPropietarios(List<Persona> propietarios) {
		this.propietarios = propietarios;
	}
	public List<Persona> getHabitantes() {
		return habitantes;
	}
	public void setHabitantes(List<Persona> habitantes) {
		this.habitantes = habitantes;
	}
	public Municipio getMunicipio() {
		return municipio;
	}
	public void setMunicipio(Municipio municipio) {
		this.municipio = municipio;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public Long getCodigo() {
		return codigo;
	}
	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}
	public BigDecimal getM2Tot() {
		return m2Tot;
	}
	public void setM2Tot(BigDecimal m2Tot) {
		this.m2Tot = m2Tot;
	}
	public BigDecimal getM2Edif() {
		return m2Edif;
	}
	public void setM2Edif(BigDecimal m2Edif) {
		this.m2Edif = m2Edif;
	}
	
	
}
