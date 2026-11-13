package com.daw.service;

import java.util.List;
import java.util.Date;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.daw.dto.ReservaDTO;

@Service
public class Servicio {
	
	private final JdbcTemplate jdbc;

    public Servicio(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private final RowMapper<ReservaDTO> rowMapper = (rs, rowNum) -> {
    	ReservaDTO reserva = new ReservaDTO();
    	reserva.setIdReserva(rs.getInt("idReserva"));
    	reserva.setFechaReserva(rs.getDate("fechaReserva"));
    	reserva.setHoraReserva(rs.getTime("horaReserva"));
    	reserva.setButacaReserva(rs.getString("butacaReserva"));
        return reserva;
    };


    public List<ReservaDTO> getAllReservas() {
        return jdbc.query("SELECT * FROM reservas", rowMapper);
    }

    
    public List<ReservaDTO> getReservaPorFecha(Date fechaReserva) {
        return jdbc.query("SELECT * FROM reservas WHERE fechaReserva = ?", rowMapper, fechaReserva);
    }

    public void addReserva(ReservaDTO reservaDTO) {
        jdbc.update("INSERT INTO reservas (fechaReserva, horaReserva, butacaReserva) VALUES (?, ?, ?)",
        		reservaDTO.getFechaReserva(),
        		reservaDTO.getHoraReserva(),
        		reservaDTO.getButacaReserva()
                );
    }

    public void deleteReserva(int idReserva) {
        jdbc.update("DELETE FROM reservas WHERE idReserva = ?", idReserva);
    }

}