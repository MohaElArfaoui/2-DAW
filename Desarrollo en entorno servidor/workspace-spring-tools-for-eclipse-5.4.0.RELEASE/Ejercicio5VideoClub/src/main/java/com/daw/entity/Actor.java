package com.daw.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "actor")
public class Actor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nomReal", length = 20, nullable = false)
	private String nomreal;
	
	@Column(name = "nomArtistic", length = 20, nullable = false)
	private String nomArtistic;
	
	@Column(name = "fechaNac", nullable = false)
	private LocalDate fechaNac;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "rel_actor_pelicula", joinColumns = @JoinColumn(name = "id_actor", referencedColumnName = "id", foreignKey = @ForeignKey(name="fk_actor")),
	inverseJoinColumns = @JoinColumn(name="id_pelicula", referencedColumnName = "id"), foreignKey = @ForeignKey(name="fk_pelicula"))
	private List<Actor> actores;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomreal() {
		return nomreal;
	}

	public void setNomreal(String nomreal) {
		this.nomreal = nomreal;
	}

	public String getNomArtistic() {
		return nomArtistic;
	}

	public void setNomArtistic(String nomArtistic) {
		this.nomArtistic = nomArtistic;
	}

	public LocalDate getFechaNac() {
		return fechaNac;
	}

	public void setFechaNac(LocalDate fechaNac) {
		this.fechaNac = fechaNac;
	}

	public List<Actor> getActores() {
		return actores;
	}

	public void setActores(List<Actor> actores) {
		this.actores = actores;
	}
	
	
}


