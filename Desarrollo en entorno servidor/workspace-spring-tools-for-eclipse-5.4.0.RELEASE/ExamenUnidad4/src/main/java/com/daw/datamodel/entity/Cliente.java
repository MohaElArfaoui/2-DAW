package com.daw.datamodel.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("Cliente")
public class Cliente extends Persona{

	@Column(name="dni", nullable = false,length = 9)
	private String cif;
	
	@OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)
	private List<Compra> compras;

	public String getCif() {
		return cif;
	}

	public void setCif(String cif) {
		this.cif = cif;
	}

	public List<Compra> getCompras() {
		return compras;
	}

	public void setCompras(List<Compra> compras) {
		this.compras = compras;
	}
	
	
}
