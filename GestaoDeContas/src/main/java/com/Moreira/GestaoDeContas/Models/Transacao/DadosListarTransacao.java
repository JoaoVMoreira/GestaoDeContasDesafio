package com.Moreira.GestaoDeContas.Models.Transacao;

import com.Moreira.GestaoDeContas.Models.Conta.Conta;

import java.time.LocalDateTime;

public record DadosListarTransacao(Long id, Conta cliente_id, Double valorTransacao, LocalDateTime dataTransacao, TipoTransacaoEnum tipoTransacao) {
    public DadosListarTransacao(Transacao transacao){
        this(transacao.getId(), transacao.getContaId(), transacao.getValorTransacao(), transacao.getDataTransacao(), transacao.getTipoTransacao());
    }
}
