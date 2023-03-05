package com.gabriel.backend.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.gabriel.backend.domain.Pessoa;
import com.gabriel.backend.domain.Cliente;
import com.gabriel.backend.domain.dtos.ClienteDTO;
import com.gabriel.backend.repositories.PessoaRepository;
import com.gabriel.backend.repositories.ClienteRepository;
import com.gabriel.backend.services.exceptions.ObjectnotFoundException;

@Service
public class ClienteService {

    @Autowired
	private ClienteRepository repository;

	@Autowired
	private PessoaRepository pessoaRepository;

    public List<Cliente> findAll() {
		return repository.findAll();
	}

    public Cliente findById(Integer id) {
		Optional<Cliente> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto de id: " + id + " não encontrado!"));
	}

	public Cliente clienteCreate(ClienteDTO objDTO) {
		objDTO.setId(null);
		objDTO.setSenha(objDTO.getSenha());
		validaPorCpfEEmail(objDTO);
		Cliente newObj = new Cliente(objDTO);
		return repository.save(newObj);
	}

	public Cliente clienteUpdate(Integer id, @Valid ClienteDTO objDTO) {
		objDTO.setId(id);
		Cliente oldObj = findById(id);
		
		if(!objDTO.getSenha().equals(oldObj.getSenha())) {
			objDTO.setSenha(objDTO.getSenha());
		}
		validaPorCpfEEmail(objDTO);
		return repository.save(new Cliente(objDTO));
	}

	public void clienteDelete(Integer id) {
		Cliente obj = findById(id);
		if (!obj.getChamados().isEmpty()) {
			throw new DataIntegrityViolationException("Técnico possui ordens de serviço e não pode ser deletado!");
		}
		repository.deleteById(id);
	}

	private void validaPorCpfEEmail(ClienteDTO objDTO) {
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
