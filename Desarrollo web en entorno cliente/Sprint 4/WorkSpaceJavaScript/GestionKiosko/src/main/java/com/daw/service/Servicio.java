package com.daw.service;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.daw.dto.ArticuloDTO;
import com.daw.dto.VentasDTO;

@Service
public class Servicio {
	
	private final JdbcTemplate jdbc;

    public Servicio(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * El rowMapper es un mapeador que permite parsear los resultados de la consulta
     * a base de datos en objetos java, concretamente un ArticuloDTO
     */
    private final RowMapper<ArticuloDTO> rowMapperArticulo = (rs, rowNum) -> {
    	ArticuloDTO articulo = new ArticuloDTO();
    	articulo.setNombreArticulo(rs.getString("nombreArticulo"));
    	articulo.setCategoriaArticulo(rs.getString("categoriaArticulo"));
    	articulo.setExistenciasArticulo(rs.getInt("existenciasArticulo"));
    	articulo.setPrecioArticulo(rs.getFloat("precioArticulo"));
        return articulo;
    };

    /**
     * Metodo que busca todos los articulos almacenados en la tabla articulos
     * de base de datos.
     * @return
     */
    public List<ArticuloDTO> getAllArticulos() {
        return jdbc.query("SELECT * FROM articulos", rowMapperArticulo);
    }

   
    /**
     * Metodo que inserta un nuevo articulo en la base de datos.
     * @param ArticuloDTO
     */
    public void addArticulo(ArticuloDTO articuloDTO) {
        jdbc.update("INSERT INTO articulos (nombreArticulo, categoriaArticulo, existenciasArticulo, precioArticulo) VALUES (?, ?, ?, ?)",
        		articuloDTO.getNombreArticulo(),
        		articuloDTO.getCategoriaArticulo(),
        		articuloDTO.getExistenciasArticulo(),
        		articuloDTO.getPrecioArticulo()
                );
    }

    /**
     * Metodo que actualiza las existencias de un articulo existente en la base de datos.
     * @param articuloDTO
     */
    public void updateArticulo(ArticuloDTO articuloDTO) {
        jdbc.update("UPDATE articulos SET existenciasArticulo = ? WHERE nombreArticulo = ?",
        		articuloDTO.getExistenciasArticulo(),
        		articuloDTO.getNombreArticulo());
    }
    
    /********************************************************************/
    
    private final RowMapper<VentasDTO> rowMapperVentas = (rs, rowNum) -> {
    	VentasDTO ventas = new VentasDTO();
    	ventas.setIdVentas(rs.getInt("idVentas"));
    	ventas.setNombreArticulo(rs.getString("nombreArticulo"));
    	ventas.setUnidadesVendidas(rs.getInt("unidadesVendidas"));
    	ventas.setPrecioVenta(rs.getFloat("precioVenta"));
        return ventas;
    };
   
    
    public List<VentasDTO> getAllVentas() {
        return jdbc.query("SELECT * FROM ventas", rowMapperVentas);
    }
    
    
    public void addVentas(VentasDTO ventasDTO) {
        jdbc.update("INSERT INTO ventas (idVentas, nombreArticulo, unidadesVendidas, precioVenta) VALUES (?, ?, ?, ?)",
        		ventasDTO.getIdVentas(),
        		ventasDTO.getNombreArticulo(),
        		ventasDTO.getUnidadesVendidas(),
        		ventasDTO.getPrecioVenta()
                );
    }  
}