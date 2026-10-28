package com.ejemplo.biblioteca.config;

import com.ejemplo.biblioteca.model.Libro;
import com.ejemplo.biblioteca.model.Prestamo;
import com.ejemplo.biblioteca.model.Socio;
import com.ejemplo.biblioteca.repository.LibroRepository;
import com.ejemplo.biblioteca.repository.PrestamoRepository;
import com.ejemplo.biblioteca.repository.SocioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Carga los datos de prueba al arrancar la aplicación.
 *
 * Libros:    1 = Dune (3 ejemplares) | 2 = El Quijote (5) | 3 = Neuromante (0, agotado)
 * Socios:    1 = Ana (normal) | 2 = Luis (3 préstamos activos) | 3 = Marta (sancionada 30 días)
 * Préstamos: 1, 2 y 3 son los préstamos activos de Luis.
 */
@Component
public class DataLoader implements CommandLineRunner {

    private final LibroRepository libroRepository;
    private final SocioRepository socioRepository;
    private final PrestamoRepository prestamoRepository;

    public DataLoader(LibroRepository libroRepository,
                      SocioRepository socioRepository,
                      PrestamoRepository prestamoRepository) {
        this.libroRepository = libroRepository;
        this.socioRepository = socioRepository;
        this.prestamoRepository = prestamoRepository;
    }

    @Override
    public void run(String... args) {
        libroRepository.save(new Libro(null, "9780441172719", "Dune", 3));
        libroRepository.save(new Libro(null, "9788420412146", "El Quijote", 5));
        libroRepository.save(new Libro(null, "9788445077726", "Neuromante", 0));

        socioRepository.save(new Socio(null, "Ana García", "ana@ejemplo.com", 0, null));
        socioRepository.save(new Socio(null, "Luis Pérez", "luis@ejemplo.com", 3, null));
        socioRepository.save(new Socio(null, "Marta Ruiz", "marta@ejemplo.com", 0, LocalDate.now().plusDays(30)));

        // Los 3 préstamos activos de Luis (socio 2)
        prestamoRepository.save(new Prestamo(null, 1L, 2L, LocalDate.now().minusDays(5), false));
        prestamoRepository.save(new Prestamo(null, 2L, 2L, LocalDate.now().minusDays(4), false));
        prestamoRepository.save(new Prestamo(null, 1L, 2L, LocalDate.now().minusDays(3), false));
    }
}
