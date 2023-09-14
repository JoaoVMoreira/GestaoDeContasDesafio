package com.Moreira.GestaoDeContas.Repositorios;

import com.Moreira.GestaoDeContas.Models.Conta.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaRepository extends JpaRepository<Conta, Long> {
}
