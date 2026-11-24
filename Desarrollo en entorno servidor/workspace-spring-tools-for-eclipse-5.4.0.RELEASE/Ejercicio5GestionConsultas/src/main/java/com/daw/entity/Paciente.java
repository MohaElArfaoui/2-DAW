package com.daw.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="paciente")
public class Paciente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;
	
	@Column(name = "apellido", nullable = false, length = 20)
	private String apellido;
	
	@Column(name = "tipo_doc", nullable = false, length = 20)
	private String tipoDoc;
	
	@Column(name = "nro_doc", nullable = false, length = 20)
	private String nroDoc;
	
	@Column(name = "fecha_nacimiento", nullable = false)
	private LocalDate fechaNac;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_cobertura_medica", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_paciente_cobertura_medica"))
	private CoberturaMedica coberturaMedica;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "paciente")
	@JsonIgnore
	private List<ConsultaMedica> consultasMedicas;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "paciente")
	@JsonIgnore
	private List<Prueba> pruebas;

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

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getTipoDoc() {
		return tipoDoc;
	}

	public void setTipoDoc(String tipoDoc) {
		this.tipoDoc = tipoDoc;
	}

	public String getNroDoc() {
		return nroDoc;
	}

	public void setNroDoc(String nroDoc) {
		this.nroDoc = nroDoc;
	}

	public LocalDate getFechaNac() {
		return fechaNac;
	}

	public void setFechaNac(LocalDate fechaNac) {
		this.fechaNac = fechaNac;
	}

	public CoberturaMedica getCoberturaMedica() {
		return coberturaMedica;
	}

	public void setCoberturaMedica(CoberturaMedica coberturaMedica) {
		this.coberturaMedica = coberturaMedica;
	}



	public List<ConsultaMedica> getConsultasMedicas() {
		return consultasMedicas;
	}

	public void setConsultasMedicas(List<ConsultaMedica> consultasMedicas) {
		this.consultasMedicas = consultasMedicas;
	}

	public List<Prueba> getPruebas() {
		return pruebas;
	}

	public void setPruebas(List<Prueba> pruebas) {
		this.pruebas = pruebas;
	}
	
	
	
}
