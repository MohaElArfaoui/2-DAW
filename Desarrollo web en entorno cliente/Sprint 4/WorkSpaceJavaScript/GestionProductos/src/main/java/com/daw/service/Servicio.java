package com.daw.service;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.daw.dto.ProductoDTO;

@Service
public class Servicio {
	
	private final JdbcTemplate jdbc;

    public Servicio(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * El rowMapper es un mapeador que permite parsear los resultados de la consulta
     * a base de datos en objetos java, concretamente un ProductoDTO
     */
    private final RowMapper<ProductoDTO> rowMapper = (rs, rowNum) -> {
        ProductoDTO producto = new ProductoDTO();
        producto.setId(rs.getInt("id"));
        producto.setCodigo(rs.getString("codigo"));
        producto.setProducto(rs.getString("producto"));
        producto.setPrecio(rs.getFloat("precio"));
        producto.setCantidad(rs.getInt("cantidad"));
        return producto;
    };

    /**
     * Metodo que busca todos los productos almacenados en la tabla productos
     * de base de datos.
     * @return
     */
    public List<ProductoDTO> getAllProductos() {
        return jdbc.query("SELECT * FROM productos ORDER BY id DESC", rowMapper);
    }


    /**
     * Metodo que inserta un nuevo producto en la base de datos.
     * @param productoDTO
     */
    public void addProducto(ProductoDTO productoDTO) {
        jdbc.update("INSERT INTO productos (codigo, producto, precio, cantidad) VALUES (?, ?, ?, ?)",
        		productoDTO.getCodigo(),
        		productoDTO.getProducto(),
        		productoDTO.getPrecio(),
        		productoDTO.getCantidad()
                );
    }

    /**
     * Metodo que actualiza un producto existente en la base de datos.
     * @param productoDTO
     */
    public void updateProducto(ProductoDTO productoDTO) {
        jdbc.update("UPDATE productos SET codigo = ?, producto = ?, precio = ?, cantidad = ? WHERE id = ?",
        		productoDTO.getCodigo(),
        		productoDTO.getProducto(),
        		productoDTO.getPrecio(),
        		productoDTO.getCantidad(),
        		productoDTO.getId());
    }

    /**
     * Metodo que elimina un producto de la base de datos.
     * @param id
     */
    public void deleteProducto(int id) {
        jdbc.update("DELETE FROM productos WHERE id = ?", id);
    }

}