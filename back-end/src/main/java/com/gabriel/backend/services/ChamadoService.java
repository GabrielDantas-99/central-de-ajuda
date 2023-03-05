package com.gabriel.backend.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gabriel.backend.domain.Chamado;
import com.gabriel.backend.domain.Cliente;
import com.gabriel.backend.domain.Tecnico;
import com.gabriel.backend.domain.dtos.ChamadoDTO;
import com.gabriel.backend.domain.enums.Prioridade;
import com.gabriel.backend.domain.enums.Status;
import com.gabriel.backend.repositories.ChamadoRepository;
import com.gabriel.backend.services.exceptions.ObjectnotFoundException;

@Service
public class ChamadoService {

    @Autowired
	private ChamadoRepository chamadoRepository;

    @Autowired
	private TecnicoService tecnicoService;

	@Autowired
	private ClienteService clienteService;

    public List<Chamado> findAll() {
		return chamadoRepository.findAll();
	}

    public Chamado findById(Integer id) {
		Optional<Chamado> obj = chamadoRepository.findById(id);
		return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto de id: " + id + " não encontrado!"));
	}

    public Chamado chamadoCreate(@Valid ChamadoDTO obj) {
        return chamadoRepository.save(newChamado(obj));
    }

    private Chamado newChamado(ChamadoDTO obj) {
		Tecnico tecnico = tecnicoService.findById(obj.getTecnico());
		Cliente cliente = clienteService.findById(obj.getCliente());
		
		Chamado chamado = new Chamado();
		if(obj.getId() != null) {
			chamado.setId(obj.getId());
		}
		
		if(obj.getStatus().equals(2)) {
			chamado.setDataFechamento(LocalDate.now());
		}
		
		chamado.setTecnico(tecnico);
		chamado.setCliente(cliente);
		chamado.setPrioridade(Prioridade.toEnum(obj.getPrioridade()));
		chamado.setStatus(Status.toEnum(obj.getStatus()));
		chamado.setTitulo(obj.getTitulo());
		chamado.setObservacoes(obj.getObservacoes());
		return chamado;
	}
    
}
