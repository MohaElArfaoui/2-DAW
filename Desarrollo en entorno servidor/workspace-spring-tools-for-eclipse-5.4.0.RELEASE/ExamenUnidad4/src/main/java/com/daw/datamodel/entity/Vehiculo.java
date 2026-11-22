package com.daw.datamodel.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="vehiculo")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Vehiculo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="color", nullable = false,length = 50)
	private String color;
	
	@Column(name="anio", nullable = false)
	private Integer anio;
	
	@Column(name="cilindrada", nullable = false)
	private Integer cilindrada;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "id_marca", referencedColumnName = "id",foreignKey = @ForeignKey(name="fk_vehiculo_marca"),nullable = false)
	private Marca marca;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_proveedor", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_vehiculo_proveedor"))
	private Proveedor proveedor;
	
	@OneToMany(mappedBy = "vehiculo",fetch = FetchType.LAZY)
	private List<Compra> comprasVehiculos;
	
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "id_tipo", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name = "FK_VEHICULO_TIPO"))
	private Tipo tipo;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Integer getAnio() {
		return anio;
	}

	public void setAnio(Integer anio) {
		this.anio = anio;
	}

	public Integer getCilindrada() {
		return cilindrada;
	}

	public void setCilindrada(Integer cilindrada) {
		this.cilindrada = cilindrada;
	}

	public Marca getMarca() {
		return marca;
	}

	public void setMarca(Marca marca) {
		this.marca = marca;
	}

	public Proveedor getProveedor() {
		return proveedor;
	}

	public void setProveedor(Proveedor proveedor) {
		this.proveedor = proveedor;
	}



	public List<Compra> getComprasVehiculos() {
		return comprasVehiculos;
	}

	public void setComprasVehiculos(List<Compra> comprasVehiculos) {
		this.comprasVehiculos = comprasVehiculos;
	}

	public Tipo getTipo() {
		return tipo;
	}

	public void setTipo(Tipo tipo) {
		this.tipo = tipo;
	}


	
	
}
