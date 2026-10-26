package com.ejemplo.biblioteca.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class ErrorResponse {

	private LocalDateTime timestamp;
	private Integer status;
	private String codigo;
	private String mensaje;
	private String path;
	private List<String> detalles;
	
	
	public ErrorResponse() {
		super();
	}
	public ErrorResponse(LocalDateTime timestamp, Integer status, String codigo, String mensaje, String path,
			List<String> detalles) {
		super();
		this.timestamp = timestamp;
		this.status = status;
		this.codigo = codigo;
		this.mensaje = mensaje;
		this.path = path;
		this.detalles = detalles;
	}
	
	public List<String> getDetalles() {
		return detalles;
	}
	public void setDetalles(List<String> detalles) {
		this.detalles = detalles;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}

	
	
}
