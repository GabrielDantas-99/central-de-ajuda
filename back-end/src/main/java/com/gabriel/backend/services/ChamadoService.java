package com.gabriel.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gabriel.backend.domain.Chamado;
import com.gabriel.backend.repositories.ChamadoRepository;
import com.gabriel.backend.services.exceptions.ObjectnotFoundException;

@Service
public class ChamadoService {

    @Autowired
	private ChamadoRepository chamadoRepository;

    public List<Chamado> findAll() {
		return chamadoRepository.findAll();
	}

    public Chamado findById(Integer id) {
		Optional<Chamado> obj = chamadoRepository.findById(id);
		return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto de id: " + id + " não encontrado!"));
	}
    
}
