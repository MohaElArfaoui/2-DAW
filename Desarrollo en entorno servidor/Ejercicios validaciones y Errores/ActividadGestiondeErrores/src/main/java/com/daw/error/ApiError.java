package com.daw.error;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class ApiError {
	private HttpStatus estado;
	@JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy hh:mm")
	private LocalDateTime fecha;
	private String ip;
	private String mensaje;
	
	public ApiError() {
		super();
	}

	public ApiError(HttpStatus estado, LocalDateTime fecha, String ip, String mensaje) {
		super();
		this.estado = estado;
		this.fecha = fecha;
		this.ip = ip;
		this.mensaje = mensaje;
	}

	public HttpStatus getEstado() {
		return estado;
	}

	public void setEstado(HttpStatus estado) {
		this.estado = estado;
	}

	public LocalDateTime getFecha() {
		return fecha;
	}

	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	} 
	
	
	
	

}
