package com.daw.dto;

import java.sql.Date;

public class ArticuloDTO {
	
	private String nombreArticulo;

	private String categoriaArticulo;
	
	private Integer existenciasArticulo;
		
	private Float precioArticulo;
	
	
	public String getNombreArticulo() {
		return nombreArticulo;
	}

	public void setNombreArticulo(String nombreArticulo) {
		this.nombreArticulo = nombreArticulo;
	}

	public String getCategoriaArticulo() {
		return categoriaArticulo;
	}

	public void setCategoriaArticulo(String categoriaArticulo) {
		this.categoriaArticulo = categoriaArticulo;
	}

	public Integer getExistenciasArticulo() {
		return existenciasArticulo;
	}

	public void setExistenciasArticulo(Integer existenciasArticulo) {
		this.existenciasArticulo = existenciasArticulo;
	}

	public Float getPrecioArticulo() {
		return precioArticulo;
	}

	public void setPrecioArticulo(Float precioArticulo) {
		this.precioArticulo = precioArticulo;
	}
}
