package com.daw.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.controllers.DTO.CrearCursoDTO;
import com.daw.controllers.DTO.CrearProfesorDTO;
import com.daw.controllers.DTO.MatriculaDTO;
import com.daw.controllers.DTO.ModificarProfesorDTO;
import com.daw.controllers.DTO.RebajaCursoDTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@Validated
@RequestMapping("/academia")

public class ControladorAcademia {


	// buscar por cursos
	@GetMapping({"/cursos", "/cursos/{id_categoria}"}) //Se usan dos rutas (cuando se hace asi)
	ResponseEntity<String> buscarCursos (@Positive @PathVariable(value = "id_categoria" , required = false) Integer id_categoria, 
			@NotBlank @Size(min=3, max=15) @RequestParam(value="titulo") String titulo,  
			@Past @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm") @RequestParam(value="fechaDesde") LocalDateTime fechaDesde,
			@Past @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm") @RequestParam (value="fechaHasta") LocalDateTime fechaHasta,
			@DecimalMin("1.0") @DecimalMax("500.0") @RequestParam(value="precioMaximo", required=false) Float precioMaximo,
			@Size(max=3) @RequestParam(value="niveles", required= false) List<@Size(max=3)@Pattern(regexp = "BASICO|INTERMEDIO|AVANZADO")String> niveles,
			@RequestParam(value="soloDestacados", defaultValue="false", required=false) Boolean soloDestacados
			) {
		return ResponseEntity.status(HttpStatus.OK).body("Busqueda realizada con exito");	
	}
	
	//modificar profesor
	
	@PutMapping("/profesores/{id}")
	ResponseEntity<ModificarProfesorDTO> modificarProfesor(@Positive @PathVariable(value="id") Integer id, 
			@Valid @RequestBody ModificarProfesorDTO profesor) {
		return ResponseEntity.ok().body(profesor);
		
	}
	
	//baja profesor
	
	@DeleteMapping("/profesores/{id}")
	ResponseEntity<String> eliminarProfesor(@Positive @PathVariable(value="id") Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body("Se ha realizado con exito");
	}
	
	// Alta profesor
	@PostMapping("/profesores")
	ResponseEntity<CrearProfesorDTO> crearProfesor(@Valid @RequestBody CrearProfesorDTO profesor) {
		return ResponseEntity.status(HttpStatus.CREATED).body(profesor);
		
	}
	
	// crearCurso
	@PostMapping("/cursos")
	ResponseEntity<CrearCursoDTO> crearCurso(@Valid @RequestBody CrearCursoDTO curso) {
		return ResponseEntity.status(HttpStatus.CREATED).body(curso);
		
	}
	
	//matricular alumno en un curso
	@PostMapping("/cursos/{id}/matriculas")
	ResponseEntity<MatriculaDTO> matriculaAlumno(@Positive @PathVariable(value="id") Integer id, 
		@Valid @RequestBody MatriculaDTO matricula) {
			return ResponseEntity.status(HttpStatus.CREATED).body(matricula);
		}
	
	//modificar parcialmente un curso
	@PatchMapping("/cursos/{id}")
	ResponseEntity<RebajaCursoDTO> rebajaCurso (@Positive @PathVariable(value="id") Integer id,
			@Valid @RequestBody RebajaCursoDTO rebaja) {
		return ResponseEntity.status(HttpStatus.OK).body(rebaja);
	}


	

}
