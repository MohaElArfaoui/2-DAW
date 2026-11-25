package com.daw.service;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.daw.dto.ClienteDTO;

@Service
public class Servicio {
	
	private final JdbcTemplate jdbc;

    public Servicio(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /**
     * El rowMapper es un mapeador que permite parsear los resultados de la consulta
     * a base de datos en objetos java, concretamente un ClienteDTO
     */
    private final RowMapper<ClienteDTO> rowMapper = (rs, rowNum) -> {
        ClienteDTO cliente = new ClienteDTO();
        cliente.setId(rs.getInt("id"));
        cliente.setNombre(rs.getString("nombre"));
        cliente.setApellido(rs.getString("apellido"));
        cliente.setFechaNacimiento(rs.getDate("fecha_nacimiento"));
        cliente.setTelefono(rs.getInt("telefono"));
        cliente.setDni(rs.getString("dni"));
        return cliente;
    };

    /**
     * Metodo que busca todos los clientes almacenados en la tabla clientes
     * de base de datos.
     * @return
     */
    public List<ClienteDTO> getAllClientes() {
        return jdbc.query("SELECT * FROM clientes", rowMapper);
    }

    /**
     * Metodo que busca un cliente en base a su id.
     * @return
     */
    public ClienteDTO getClienteById(Integer id) {
        return jdbc.queryForObject("SELECT * FROM clientes WHERE id = ?", rowMapper, id);
    }

    /**
     * Metodo que inserta un nuevo cliente en la base de datos.
     * @param clienteDTO
     */
    public void addCliente(ClienteDTO clienteDTO) {
        jdbc.update("INSERT INTO clientes (nombre, apellido, fecha_nacimiento, telefono, dni) VALUES (?, ?, ?, ?, ?)",
                clienteDTO.getNombre(),
                clienteDTO.getApellido(),
                clienteDTO.getFechaNacimiento(),
                clienteDTO.getTelefono(),
                clienteDTO.getDni()
                );
    }

    /**
     * Metodo que actualiza un cliente existente en la base de datos.
     * @param clienteDTO
     */
    public void updateCliente(ClienteDTO clienteDTO) {
        jdbc.update("UPDATE clientes SET nombre = ?, apellido = ?, fecha_nacimiento = ?, telefono = ?, dni = ? WHERE id = ?",
        		clienteDTO.getNombre(),
                clienteDTO.getApellido(),
                clienteDTO.getFechaNacimiento(),
                clienteDTO.getTelefono(),
                clienteDTO.getDni(),
                clienteDTO.getId());
    }

    /**
     * Metodo que elimina un cliente de la base de datos.
     * @param id
     */
    public void deleteCliente(int id) {
        jdbc.update("DELETE FROM clientes WHERE id = ?", id);
    }

}