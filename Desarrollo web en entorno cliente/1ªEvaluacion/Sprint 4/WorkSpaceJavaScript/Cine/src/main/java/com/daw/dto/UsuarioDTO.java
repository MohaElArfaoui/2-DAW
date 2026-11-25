package com.daw.dto;

public class UsuarioDTO {

	private Integer idUsuario;
	private String nombreUsuario;
	private String pwdUsuario;

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}
	
	public String getPwdUsuario() {
		return pwdUsuario;
	}

	public void setPwdUsuario(String pwdUsuario) {
		this.pwdUsuario = pwdUsuario;
	}
}
