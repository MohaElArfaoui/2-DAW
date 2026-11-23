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
@Table(name = "distribuidor")
public class Distribuidor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "codigo", nullable = false, length = 20, unique = true)
	private String codigo;
	
	@Column(name = "razon_social", nullable = false, length = 20)
	private String razonSocial;
	
	@Column(name = "direccion", nullable = false, length = 50)
	private String direccion;
	
	@Column(name = "telefono", nullable = false, precision = 9, scale = 0)
	private Integer telefono;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "rel_distribuidor_fabricante", 
	joinColumns = @JoinColumn(name="id_distribuidor", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_distribuidor_fabricante")),
	inverseJoinColumns = @JoinColumn(name="id_fabricante", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_fabricante_distribuidor")))
	private List<Fabricante> fabricantes;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRazonSocial() {
		return razonSocial;
	}

	public void setRazonSocial(String razonSocial) {
		this.razonSocial = razonSocial;
	}

	public List<Fabricante> getFabricantes() {
		return fabricantes;
	}

	public void setFabricantes(List<Fabricante> fabricantes) {
		this.fabricantes = fabricantes;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public Integer getTelefono() {
		return telefono;
	}

	public void setTelefono(Integer telefono) {
		this.telefono = telefono;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	
}
