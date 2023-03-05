package com.gabriel.backend.resource;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gabriel.backend.domain.Tecnico;
import com.gabriel.backend.domain.dtos.TecnicoDTO;
import com.gabriel.backend.services.TecnicoService;

@RestController
@RequestMapping(value = "/tecnicos")
public class TecnicoResource {
    
    @Autowired
	private TecnicoService tecnicoService;

    @GetMapping
	public ResponseEntity<List<TecnicoDTO>> findAll() {
		List<Tecnico> list = tecnicoService.findAll();
		List<TecnicoDTO> listDTO = list.stream().map(obj -> new TecnicoDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
	}

    @GetMapping(value = "/{id}")
	public ResponseEntity<TecnicoDTO> findById(@PathVariable Integer id) {
		Tecnico obj = tecnicoService.findById(id);
		return ResponseEntity.ok().body(new TecnicoDTO(obj));
	}

    @PostMapping
	public ResponseEntity<TecnicoDTO> tecnicoCreate(@Valid @RequestBody TecnicoDTO objDTO) {
		Tecnico newObj = tecnicoService.tecnicoCreate(objDTO);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}").buildAndExpand(newObj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

    @PutMapping(value = "/{id}")
	public ResponseEntity<TecnicoDTO> tecnicoUpdate(
        @PathVariable Integer id, @Valid @RequestBody TecnicoDTO objDTO) {
		Tecnico obj = tecnicoService.tecnicoUpdate(id, objDTO);
		return ResponseEntity.ok().body(new TecnicoDTO(obj));
	}

}
