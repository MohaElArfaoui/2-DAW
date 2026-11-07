package com.daw.datamodel.entity;

import java.math.BigDecimal;
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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="course")
public class Curso {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="name")
	private String nombre;
	@Column(name="fee")
	private BigDecimal cuota;
	@Column(name="duration")
	private Float duracion;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_instructor", referencedColumnName = "id", nullable = true, foreignKey = @ForeignKey(name="fk_instructor_curso"))
	private Instructor instructor;
	
	@ManyToMany
	@JoinTable(name = "rel_course_student", joinColumns = @JoinColumn(name = "course", nullable = false, foreignKey = @ForeignKey(name="fk_course")),
	inverseJoinColumns = @JoinColumn(name="student", nullable = false, foreignKey = @ForeignKey(name="id_student")))
	private List<Alumno> alumnos;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public BigDecimal getCuota() {
		return cuota;
	}
	public void setCuota(BigDecimal cuota) {
		this.cuota = cuota;
	}
	public Float getDuracion() {
		return duracion;
	}
	public void setDuracion(Float duracion) {
		this.duracion = duracion;
	}
	
	

}
