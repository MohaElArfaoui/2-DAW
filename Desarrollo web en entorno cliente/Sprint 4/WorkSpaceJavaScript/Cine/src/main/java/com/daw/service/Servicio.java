package com.daw.service;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.daw.dto.PeliculaDTO;
import com.daw.dto.UsuarioDTO;

@Service
public class Servicio {
	
	private final JdbcTemplate jdbc;

    public Servicio(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    /* PELICULAS */

    private final RowMapper<PeliculaDTO> rowMapperP = (rs, rowNum) -> {
    	PeliculaDTO pelicula = new PeliculaDTO();
    	pelicula.setIdPelicula(rs.getInt("idPelicula"));
    	pelicula.setTitulo(rs.getString("titulo"));
    	pelicula.setSinopsis(rs.getString("sinopsis"));
    	pelicula.setDuracion(rs.getString("duracion"));
        return pelicula;
    };

    public PeliculaDTO getPeliculaById(Integer idPelicula) {
        return jdbc.queryForObject("SELECT * FROM peliculas WHERE idPelicula = ?", rowMapperP, idPelicula);
    }
    
    /* USUARIOS */
    
    private final RowMapper<UsuarioDTO> rowMapperU = (rs, rowNum) -> {
        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setIdUsuario(rs.getInt("idUsuario"));
        usuario.setNombreUsuario(rs.getString("nombreUsuario"));
        usuario.setPwdUsuario(rs.getString("pwdUsuario"));
        return usuario;
    };


    public UsuarioDTO getUsuarioByLogin(String nombreUsuario, String pwdUsuario) {
        return jdbc.queryForObject("SELECT * FROM usuarios WHERE nombreUsuario = ? and pwdUsuario = ?", rowMapperU, nombreUsuario, pwdUsuario);
    }
    
    public void addUsuario(UsuarioDTO usuarioDTO) {
        jdbc.update("INSERT INTO usuarios (idUsuario, nombreUsuario, pwdUsuario) VALUES (?, ?, ?)",
        		usuarioDTO.getIdUsuario(),
        		usuarioDTO.getNombreUsuario(),
        		usuarioDTO.getPwdUsuario()
                );
    }
    
}