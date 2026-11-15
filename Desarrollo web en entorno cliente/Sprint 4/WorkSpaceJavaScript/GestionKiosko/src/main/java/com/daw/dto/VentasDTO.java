package com.daw.dto;

import java.sql.Date;

public class VentasDTO {
	
	private Integer idVentas;

	private String nombreArticulo;
	
	private Integer unidadesVendidas;
		
	private Float precioVenta;
	
	public Integer getIdVentas() {
		return idVentas;
	}

	public void setIdVentas(Integer idVentas) {
		this.idVentas = idVentas;
	}
	
	public String getNombreArticulo() {
		return nombreArticulo;
	}

	public void setNombreArticulo(String nombreArticulo) {
		this.nombreArticulo = nombreArticulo;
	}

	public Integer getUnidadesVendidas() {
		return unidadesVendidas;
	}

	public void setUnidadesVendidas(Integer unidadesVendidas) {
		this.unidadesVendidas = unidadesVendidas;
	}

	public Float getPrecioVenta() {
		return precioVenta;
	}

	public void setPrecioVenta(Float precioVenta) {
		this.precioVenta = precioVenta;
	}
}
