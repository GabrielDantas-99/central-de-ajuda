package com.gabriel.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gabriel.backend.domain.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    
}
