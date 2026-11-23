package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="Efectivo")
@PrimaryKeyJoinColumn(name="id") //Cuando es JOInED
@DiscriminatorValue(value = "Efectivo") //en el hijo
public class Efectivo extends Empleado{

	@Column(name="salario", nullable=false)
	private Long salario;

	public Long getSalario() {
		return salario;
	}

	public void setSalario(Long salario) {
		this.salario = salario;
	}
	
	
}
