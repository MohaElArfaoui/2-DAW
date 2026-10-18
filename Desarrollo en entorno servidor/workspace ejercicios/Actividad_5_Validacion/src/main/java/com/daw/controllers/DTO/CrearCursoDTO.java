package com.daw.controllers.DTO;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CrearCursoDTO {
		
	@NotBlank
	@Size(min=5, max=30)
	private String titulo;
	
	@Size(max=100)
	private String descripcion;

	@NotNull
	private Boolean destacado;
	
	@NotNull
	@Positive
	private Integer idCategoria;
	
	@NotNull
	@Positive
	private Integer idPlataforma;
	
	@NotNull
	@Size(min=1, max=3)
	private List<@NotNull @Positive Integer> idProfesores;
	
	@Size(max=5)
	private List<@NotBlank @Size(max=15) String> etiquetas;
	
	@NotNull
	@Valid
	private DetalleCursoDTO detalle;

	public CrearCursoDTO() {
		super();
	}

	public CrearCursoDTO(String titulo, String descripcion, Boolean destacado, Integer idCategoria,
	        Integer idPlataforma, List<Integer> idProfesores, List<String> etiquetas,
	        DetalleCursoDTO detalle) {
	    super();
	    this.titulo = titulo;
	    this.descripcion = descripcion;
	    this.destacado = destacado;
	    this.idCategoria = idCategoria;
	    this.idPlataforma = idPlataforma;
	    this.idProfesores = idProfesores;
	    this.etiquetas = etiquetas;
	    this.detalle = detalle;
	}


	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Boolean getDestacado() {
		return destacado;
	}

	public void setDestacado(Boolean destacado) {
		this.destacado = destacado;
	}

	public Integer getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Integer idCategoria) {
		this.idCategoria = idCategoria;
	}

	public Integer getIdPlataforma() {
		return idPlataforma;
	}

	public void setIdPlataforma(Integer idPlataforma) {
		this.idPlataforma = idPlataforma;
	}

	public List<Integer> getIdProfesores() {
		return idProfesores;
	}

	public void setIdProfesores(List<Integer> idProfesores) {
		this.idProfesores = idProfesores;
	}

	public List<String> getEtiquetas() {
		return etiquetas;
	}

	public void setEtiquetas(List<String> etiquetas) {
		this.etiquetas = etiquetas;
	}

	public DetalleCursoDTO getDetalle() {
		return detalle;
	}

	public void setDetalle(DetalleCursoDTO detalle) {
		this.detalle = detalle;
	}


}



