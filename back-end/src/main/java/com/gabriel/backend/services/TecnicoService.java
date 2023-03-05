package com.gabriel.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gabriel.backend.domain.Tecnico;
import com.gabriel.backend.repositories.TecnicoRepository;
import com.gabriel.backend.services.exceptions.ObjectnotFoundException;

@Service
public class TecnicoService {

    @Autowired
	private TecnicoRepository repository;

    public List<Tecnico> findAll() {
		return repository.findAll();
	}

    public Tecnico findById(Integer id) {
		Optional<Tecnico> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto de id: " + id + " não encontrado!"));
	}
    
}
