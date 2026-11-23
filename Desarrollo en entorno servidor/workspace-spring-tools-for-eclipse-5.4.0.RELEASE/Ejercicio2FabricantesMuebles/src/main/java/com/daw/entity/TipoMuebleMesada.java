package com.daw.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipo_mueble_mesada")
public class TipoMuebleMesada extends Mueble{
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_tipo_material", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_tipo_mueble_mesada_tipo_material"))
	private TipoMaterial tipoMaterial;

	public TipoMaterial getTipoMaterial() {
		return tipoMaterial;
	}

	public void setTipoMaterial(TipoMaterial tipoMaterial) {
		this.tipoMaterial = tipoMaterial;
	}
	
	
}
