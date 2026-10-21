package com.daw.controllers;

import static org.hamcrest.Matchers.everyItem;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Batería de pruebas del enunciado (apartado 6).
 *
 * Se levanta la aplicación completa y se lanzan las peticiones con MockMvc, sin necesidad de arrancar
 * el servidor. Como varias pruebas modifican los datos (POST, PUT, PATCH, DELETE), se recarga el contexto
 * antes de cada prueba para que todas partan de los datos de ejemplo del servicio.
 *
 * Las pruebas asumen que los datos de ejemplo incluyen el libro 1, el libro 2 con la reseña 1,
 * y al menos un libro de género "novela" cuyo autor contiene "cervantes".
 */
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
class LibroControllerTest {

    private static final String BASE = "/api/v1/libros";

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("1. GET /libros -> 200 con todos los libros")
    void listarTodosLosLibros() throws Exception {
        mockMvc.perform(get(BASE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", greaterThan(0)));
    }

    @Test
    @DisplayName("2. GET /libros/1 -> 200")
    void obtenerLibroExistente() throws Exception {
        mockMvc.perform(get(BASE + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.titulo", notNullValue()));
    }

    @Test
    @DisplayName("3. GET /libros/999 -> 404")
    void obtenerLibroInexistente() throws Exception {
        mockMvc.perform(get(BASE + "/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("4. GET /libros?genero=novela&autor=cervantes -> 200, solo los que cumplen ambos filtros")
    void filtrarPorGeneroYAutor() throws Exception {
        mockMvc.perform(get(BASE).param("genero", "novela").param("autor", "cervantes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", greaterThan(0)))
                .andExpect(jsonPath("$[*].genero", everyItem(is("novela"))));
    }

    @Test
    @DisplayName("5. POST /libros con título y autor -> 201")
    void crearLibro() throws Exception {
        String json = """
                {
                  "titulo": "La Regenta",
                  "autor": "Leopoldo Alas Clarín",
                  "genero": "novela",
                  "anio": 1885
                }
                """;

        mockMvc.perform(post(BASE).contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.titulo", is("La Regenta")));
    }

    @Test
    @DisplayName("6. PUT /libros/1 con libro completo -> 200")
    void reemplazarLibro() throws Exception {
        String json = """
                {
                  "titulo": "Don Quijote (edición revisada)",
                  "autor": "Miguel de Cervantes",
                  "genero": "novela",
                  "anio": 1615
                }
                """;

        mockMvc.perform(put(BASE + "/1").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.titulo", is("Don Quijote (edición revisada)")))
                .andExpect(jsonPath("$.anio", is(1615)));
    }

    @Test
    @DisplayName("7. PATCH /libros/1 con {\"titulo\":\"Nuevo\"} -> 200, solo cambia el título")
    void modificarParcialmenteLibro() throws Exception {
        mockMvc.perform(patch(BASE + "/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"titulo\":\"Nuevo\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo", is("Nuevo")))
                .andExpect(jsonPath("$.autor", notNullValue()))
                .andExpect(jsonPath("$.anio", notNullValue()));
    }

    @Test
    @DisplayName("8. DELETE /libros/1 -> 200")
    void eliminarLibro() throws Exception {
        mockMvc.perform(delete(BASE + "/1"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("9. DELETE /libros/1 (otra vez) -> 404")
    void eliminarLibroDosVeces() throws Exception {
        mockMvc.perform(delete(BASE + "/1"))
                .andExpect(status().isOk());

        mockMvc.perform(delete(BASE + "/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("10. POST /libros/2/resenas con puntuación 5 -> 201")
    void crearResena() throws Exception {
        String json = """
                {
                  "usuario": "carlos",
                  "puntuacion": 5,
                  "comentario": "Muy recomendable"
                }
                """;

        mockMvc.perform(post(BASE + "/2/resenas").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.puntuacion", is(5)));
    }

    @Test
    @DisplayName("11. GET /libros/2/resenas/1 -> 200")
    void obtenerResena() throws Exception {
        mockMvc.perform(get(BASE + "/2/resenas/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)));
    }
}
