package com.daw.datamodel.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("Proveedor")
public class Proveedor extends Persona {
	
	@Column(name="cif", nullable = false,length = 9)
	private String cif;
	
	@OneToMany(mappedBy = "proveedor", fetch = FetchType.LAZY)
	private List<Vehiculo> vehiculos;

	public String getCif() {
		return cif;
	}

	public void setCif(String cif) {
		this.cif = cif;
	}

	public List<Vehiculo> getVehiculos() {
		return vehiculos;
	}

	public void setVehiculos(List<Vehiculo> vehiculos) {
		this.vehiculos = vehiculos;
	}
	
	
}
