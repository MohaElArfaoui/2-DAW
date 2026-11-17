package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="Externo")
@PrimaryKeyJoinColumn(name="id")
@DiscriminatorValue(value="Externo")//en el hijo
public class Externo extends Empleado{

	@Column(name="precio_hora_comun", nullable=false)
	private Float precioHoraComun;
	
	@Column(name="precio_hora_extra", nullable=false)
	private Float precioHoraExtra;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "id_consultora", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="id_externo_consultora"))
	private Consultora consultora;

	public Float getPrecioHoraComun() {
		return precioHoraComun;
	}

	public void setPrecioHoraComun(Float precioHoraComun) {
		this.precioHoraComun = precioHoraComun;
	}

	public Float getPrecioHoraExtra() {
		return precioHoraExtra;
	}

	public void setPrecioHoraExtra(Float precioHoraExtra) {
		this.precioHoraExtra = precioHoraExtra;
	}

	public Consultora getConsultora() {
		return consultora;
	}

	public void setConsultora(Consultora consultora) {
		this.consultora = consultora;
	}
	
	
}
