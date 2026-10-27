package com.daw.datamodel.entities;

/**
 * Datos para modificar parcialmente un libro (PATCH). Todos los campos son
 * opcionales: los que lleguen a null no se modifican.
 */
public class ModificarLibro {

	private String titulo;
	private String autor;
	private String genero;
	private Integer anio;

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
}
