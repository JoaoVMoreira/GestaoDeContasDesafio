package com.Moreira.GestaoDeContas.Repositorios;

import com.Moreira.GestaoDeContas.Models.Transacao.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
}
