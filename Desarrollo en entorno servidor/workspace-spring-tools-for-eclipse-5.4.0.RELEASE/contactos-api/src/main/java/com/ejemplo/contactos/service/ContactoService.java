package com.ejemplo.contactos.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ejemplo.contactos.model.Contacto;

@Service
public class ContactoService {

	// Los datos se guardan en esta lista, en memoria.
	// Al reiniciar la aplicación se pierden y se vuelven a cargar los de ejemplo.
	private List<Contacto> contactos = new ArrayList<>();

	// Siguiente id que se asignará a un contacto nuevo
	private Long siguienteId = 1L;

	// Datos de ejemplo
	public ContactoService() {
		crear(new Contacto(null, "María del Amor", "Acosta Bermudo", "macober087@g.educaand.es",
				LocalDate.of(1985, 3, 12), "Docencia"));
		crear(new Contacto(null, "Inmaculada", "Águila Sierra", "iagusie437@g.educaand.es",
				LocalDate.of(1978, 7, 25), "Dirección"));
		crear(new Contacto(null, "Jose Luis", "Alonso Hernández", "jaloher284@g.educaand.es",
				LocalDate.of(1990, 11, 2), "Docencia"));
		crear(new Contacto(null, "Dolores", "Amores Cruz", "damocru400@g.educaand.es",
				LocalDate.of(1982, 1, 30), "Administración"));
		crear(new Contacto(null, "Lidia", "Báez Murillo", "lbaemur277@g.educaand.es",
				LocalDate.of(1988, 9, 14), "Orientación"));
	}

	// Devuelve los contactos que cumplen TODOS los filtros indicados.
	// Un filtro con valor null se ignora (son opcionales).
	public List<Contacto> buscar(String nombre, String apellidos, String email,
			LocalDate fechaNacimiento, String departamento) {

		List<Contacto> resultado = new ArrayList<>();

		for (Contacto c : contactos) {
			boolean coincide = true;

			if (nombre != null && !c.getNombre().toLowerCase().contains(nombre.toLowerCase())) {
				coincide = false;
			}
			if (apellidos != null && !c.getApellidos().toLowerCase().contains(apellidos.toLowerCase())) {
				coincide = false;
			}
			if (email != null && !c.getEmail().toLowerCase().contains(email.toLowerCase())) {
				coincide = false;
			}
			if (fechaNacimiento != null && !c.getFechaNacimiento().equals(fechaNacimiento)) {
				coincide = false;
			}
			if (departamento != null && !c.getDepartamento().equals(departamento)) {
				coincide = false;
			}

			if (coincide) {
				resultado.add(c);
			}
		}

		return resultado;
	}

	// Añade un contacto nuevo asignándole un id
	public Contacto crear(Contacto contacto) {
		contacto.setId(siguienteId);
		siguienteId++;
		contactos.add(contacto);
		return contacto;
	}

	// Busca un contacto por su id.
	// Optional es una "caja" que puede contener el contacto (si existe)
	// o estar vacía (si no existe). Así evitamos devolver null.
	private Optional<Contacto> buscarPorId(Long id) {
		for (Contacto c : contactos) {
			if (c.getId().equals(id)) {
				return Optional.of(c);
			}
		}
		return Optional.empty();
	}

	// Sustituye los datos del contacto con ese id.
	// Devuelve un Optional vacío si el contacto no existe.
	public Optional<Contacto> modificar(Long id, Contacto datos) {
		Optional<Contacto> encontrado = buscarPorId(id);

		if (encontrado.isPresent()) {
			Contacto c = encontrado.get();
			c.setNombre(datos.getNombre());
			c.setApellidos(datos.getApellidos());
			c.setEmail(datos.getEmail());
			c.setFechaNacimiento(datos.getFechaNacimiento());
			c.setDepartamento(datos.getDepartamento());
		}

		return encontrado;
	}

	// Borra el contacto con ese id.
	// Devuelve true si lo ha borrado y false si no existía.
	public boolean eliminar(Long id) {
		Optional<Contacto> encontrado = buscarPorId(id);

		if (encontrado.isPresent()) {
			contactos.remove(encontrado.get());
			return true;
		}

		return false;
	}
}
