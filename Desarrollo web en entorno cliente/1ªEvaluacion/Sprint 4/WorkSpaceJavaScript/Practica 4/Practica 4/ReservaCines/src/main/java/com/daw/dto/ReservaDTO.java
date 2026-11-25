package com.daw.dto;

import java.sql.Date;
import java.sql.Time;

public class ReservaDTO {
	
	private Integer idReserva;

	private Date fechaReserva;
	
	private Time horaReserva;
		
	private String butacaReserva;

	
	public Integer getIdReserva() {
		return idReserva;
	}

	public void setIdReserva(Integer idReserva) {
		this.idReserva = idReserva;
	}

	public Date getFechaReserva() {
		return fechaReserva;
	}

	public void setFechaReserva(Date fechaReserva) {
		this.fechaReserva = fechaReserva;
	}

	public Time getHoraReserva() {
		return horaReserva;
	}

	public void setHoraReserva(Time horaReserva) {
		this.horaReserva = horaReserva;
	}

	public String getButacaReserva() {
		return butacaReserva;
	}

	public void setButacaReserva(String butacaReserva) {
		this.butacaReserva = butacaReserva;
	}

}
