package com.daw.datamodel.entities;

public class Resena {

	private Long id;
	private String usuario;
	private Integer puntuacion; // de 1 a 5
	private String comentario;

	public Resena(Long id, String usuario, Integer puntuacion, String comentario) {
		this.id = id;
		this.usuario = usuario;
		this.puntuacion = puntuacion;
		this.comentario = comentario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public Integer getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(Integer puntuacion) {
		this.puntuacion = puntuacion;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
}
