package com.gabriel.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gabriel.backend.domain.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
    
}
