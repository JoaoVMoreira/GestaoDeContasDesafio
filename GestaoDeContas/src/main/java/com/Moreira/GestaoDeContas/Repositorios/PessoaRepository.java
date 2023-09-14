package com.Moreira.GestaoDeContas.Repositorios;

import com.Moreira.GestaoDeContas.Models.Pessoa.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}
