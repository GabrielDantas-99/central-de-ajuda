package com.gabriel.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gabriel.backend.domain.Tecnico;

public interface TecnicoRepository extends JpaRepository<Tecnico, Integer> {
    
}
