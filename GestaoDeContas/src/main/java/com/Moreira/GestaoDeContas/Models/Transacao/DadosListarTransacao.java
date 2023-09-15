package com.Moreira.GestaoDeContas.Models.Transacao;

import com.Moreira.GestaoDeContas.Models.Conta.Conta;

import java.time.LocalDateTime;

public record DadosListarTransacao(Long id, Conta cliente_id, Double valorTransacao, LocalDateTime dataTransacao) {
    public DadosListarTransacao(Transacao transacao){
        this(transacao.getId(), transacao.getClienteId(), transacao.getValorTransacao(), transacao.getDataTransacao());
    }
}
