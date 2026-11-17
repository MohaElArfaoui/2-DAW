package com.daw.service;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.daw.dto.ViviendaDTO;

@Service
public class Servicio {
	
	private final JdbcTemplate jdbc;

    public Servicio(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private final RowMapper<ViviendaDTO> rowMapper = (rs, rowNum) -> {
        ViviendaDTO vivienda = new ViviendaDTO();
        vivienda.setId(rs.getInt("id"));
        vivienda.setTipo(rs.getString("tipo"));
        vivienda.setDireccion(rs.getString("direccion"));
        vivienda.setCp(rs.getString("cp"));
        vivienda.setPrecio(rs.getFloat("precio"));
        return vivienda;
    };


    public List<ViviendaDTO> getAllViviendas() {
        return jdbc.query("SELECT * FROM viviendas", rowMapper);
    }

    public void addVivienda(ViviendaDTO viviendaDTO) {
        jdbc.update("INSERT INTO viviendas (tipo, direccion, cp, precio) VALUES (?, ?, ?, ?)",
                viviendaDTO.getTipo(),
                viviendaDTO.getDireccion(),
                viviendaDTO.getCp(),
                viviendaDTO.getPrecio()
                );
    }

    public void deleteVivienda(int id) {
        jdbc.update("DELETE FROM viviendas WHERE id = ?", id);
    }

}