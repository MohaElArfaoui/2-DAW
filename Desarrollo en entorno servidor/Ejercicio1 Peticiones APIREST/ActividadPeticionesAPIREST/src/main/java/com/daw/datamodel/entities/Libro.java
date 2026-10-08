package com.daw.datamodel.entities;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class Libro {

	private Long id;
	private String titulo;
	private String autor;
	private String genero;
	private Integer anio;
	private List<Resena> resenas = new CopyOnWriteArrayList<>(); // reseñas del libro

	public Libro(Long id, String titulo, String autor, String genero, Integer anio) {
		this.id = id;
		this.titulo = titulo;
		this.autor = autor;
		this.genero = genero;
		this.anio = anio;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public Integer getAnio() {
		return anio;
	}

	public void setAnio(Integer anio) {
		this.anio = anio;
	}

	public List<Resena> getResenas() {
		return resenas;
	}

	public void setResenas(List<Resena> resenas) {
		this.resenas = resenas;
	}
}
