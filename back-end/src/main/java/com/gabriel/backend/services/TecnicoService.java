package com.gabriel.backend.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.gabriel.backend.domain.Pessoa;
import com.gabriel.backend.domain.Tecnico;
import com.gabriel.backend.domain.dtos.TecnicoDTO;
import com.gabriel.backend.repositories.PessoaRepository;
import com.gabriel.backend.repositories.TecnicoRepository;
import com.gabriel.backend.services.exceptions.ObjectnotFoundException;

@Service
public class TecnicoService {

    @Autowired
	private TecnicoRepository repository;

	@Autowired
	private PessoaRepository pessoaRepository;

    public List<Tecnico> findAll() {
		return repository.findAll();
	}

    public Tecnico findById(Integer id) {
		Optional<Tecnico> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto de id: " + id + " não encontrado!"));
	}

	public Tecnico tecnicoCreate(TecnicoDTO objDTO) {
		objDTO.setId(null);
		objDTO.setSenha(objDTO.getSenha());
		validaPorCpfEEmail(objDTO);
		Tecnico newObj = new Tecnico(objDTO);
		return repository.save(newObj);
	}

	public Tecnico tecnicoUpdate(Integer id, @Valid TecnicoDTO objDTO) {
		objDTO.setId(id);
		Tecnico oldObj = findById(id);
		
		if(!objDTO.getSenha().equals(oldObj.getSenha())) {
			objDTO.setSenha(objDTO.getSenha());
		}
		validaPorCpfEEmail(objDTO);
		return repository.save(new Tecnico(objDTO));
	}

	private void validaPorCpfEEmail(TecnicoDTO objDTO) {
		Optional<Pessoa> obj = pessoaRepository.findByCpf(objDTO.getCpf());
		if (obj.isPresent() && !Objects.equals(obj.get().getId(), objDTO.getId())) {
			throw new DataIntegrityViolationException("CPF já cadastrado no sistema!");
		}

		obj = pessoaRepository.findByEmail(objDTO.getEmail());
		if (obj.isPresent() && !Objects.equals(obj.get().getId(), objDTO.getId())) {
			throw new DataIntegrityViolationException("E-mail já cadastrado no sistema!");
		}
	}

}
