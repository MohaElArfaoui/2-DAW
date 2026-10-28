package com.ejemplo.biblioteca.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejemplo.biblioteca.exception.DevolucionInvalidaException;
import com.ejemplo.biblioteca.exception.LibroNoDisponibleException;
import com.ejemplo.biblioteca.exception.LibroNoEncontradoException;
import com.ejemplo.biblioteca.exception.LimitePrestamosExcedidoException;
import com.ejemplo.biblioteca.exception.SocioNoEncontradoException;
import com.ejemplo.biblioteca.exception.SocioSancionadoException;
import com.ejemplo.biblioteca.model.Libro;
import com.ejemplo.biblioteca.model.Prestamo;
import com.ejemplo.biblioteca.model.Socio;
import com.ejemplo.biblioteca.repository.LibroRepository;
import com.ejemplo.biblioteca.repository.PrestamoRepository;
import com.ejemplo.biblioteca.repository.SocioRepository;

@Service
public class PrestamoService {

	/** Número máximo de préstamos activos por socio. */
	public static final int LIMITE_PRESTAMOS = 3;

	@Autowired
	private LibroRepository libroRepository;
	@Autowired
	private SocioRepository socioRepository;
	@Autowired
	private PrestamoRepository prestamoRepository;

	/**
	 * Presta un libro a un socio.
	 *
	 * Las comprobaciones deben hacerse EN ESTE ORDEN.
	 */
	public Prestamo prestar(Long libroId, Long socioId) {

		// 1. El socio debe existir
		Optional<Socio> socioOpt = socioRepository.findById(socioId);
		if (socioOpt.isEmpty()) {
			// TODO 4: lanzar SocioNoEncontradoException(socioId)
			throw new SocioNoEncontradoException(socioId);
		}
		Socio socio = socioOpt.get();

		// 2. El libro debe existir
		Optional<Libro> libroOpt = libroRepository.findById(libroId);
		if (libroOpt.isEmpty()) {
			// TODO 5: lanzar LibroNoEncontradoException(libroId)
			throw new LibroNoEncontradoException(libroId);

		}
		Libro libro = libroOpt.get();

		// 3. El socio no puede estar sancionado
		LocalDate finSancion = socio.getSancionadoHasta();
		if (finSancion != null && finSancion.isAfter(LocalDate.now())) {
			// TODO 6: lanzar SocioSancionadoException(socioId, finSancion)
			throw new SocioSancionadoException(socioId, finSancion);

		}

		// 4. El socio no puede superar el límite de préstamos activos
		if (socio.getPrestamosActivos() >= LIMITE_PRESTAMOS) {
			// TODO 7: lanzar LimitePrestamosExcedidoException(socioId, LIMITE_PRESTAMOS)
			throw new LimitePrestamosExcedidoException(socioId, LIMITE_PRESTAMOS);

		}

		// 5. El libro debe tener ejemplares disponibles
		if (libro.getEjemplaresDisponibles() <= 0) {
			// TODO 8: lanzar LibroNoDisponibleException(libro.getTitulo(),
			// libro.getEjemplaresDisponibles())
			throw new LibroNoDisponibleException(libro.getTitulo(), libro.getEjemplaresDisponibles());

		}

		// Todo correcto: se registra el préstamo y se actualizan libro y socio
		libro.setEjemplaresDisponibles(libro.getEjemplaresDisponibles() - 1);
		socio.setPrestamosActivos(socio.getPrestamosActivos() + 1);
		libroRepository.save(libro);
		socioRepository.save(socio);

		Prestamo prestamo = new Prestamo(null, libroId, socioId, LocalDate.now(), false);
		return prestamoRepository.save(prestamo);
	}

	/**
	 * Registra la devolución de un préstamo.
	 */
	public Prestamo devolver(Long prestamoId) {

		Optional<Prestamo> prestamoOpt = prestamoRepository.findById(prestamoId);
		if (prestamoOpt.isEmpty()) {
			// TODO 9: lanzar DevolucionInvalidaException(prestamoId, "el préstamo no
			// existe")
			throw new DevolucionInvalidaException(prestamoId, " el prestamo no existe");

		}
		Prestamo prestamo = prestamoOpt.get();

		if (prestamo.isDevuelto()) {
			// TODO 10: lanzar DevolucionInvalidaException(prestamoId, "el préstamo ya fue
			// devuelto")
			throw new DevolucionInvalidaException(prestamoId, " el prestamo ya fue devuelto");

		}

		// Se devuelve el ejemplar y se libera un préstamo del socio
		Libro libro = libroRepository.findById(prestamo.getLibroId()).get();
		Socio socio = socioRepository.findById(prestamo.getSocioId()).get();

		libro.setEjemplaresDisponibles(libro.getEjemplaresDisponibles() + 1);
		socio.setPrestamosActivos(socio.getPrestamosActivos() - 1);
		prestamo.setDevuelto(true);

		libroRepository.save(libro);
		socioRepository.save(socio);
		return prestamoRepository.save(prestamo);
	}
}
