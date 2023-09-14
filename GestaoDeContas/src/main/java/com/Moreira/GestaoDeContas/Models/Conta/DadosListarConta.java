package com.Moreira.GestaoDeContas.Models.Conta;

import com.Moreira.GestaoDeContas.Models.Pessoa.Pessoa;

import java.time.LocalDateTime;

public record DadosListarConta(Long id, Pessoa pessoaId, Double saldo, Double limiteSaldoDiario, Boolean bandeiraAtivo, TipoContaEnum tipoConta, LocalDateTime dataCriacao) {
    public DadosListarConta(Conta conta){
        this(conta.getId(), conta.getPessoaId(), conta.getSaldo(), conta.getLimiteSaldoDiario() , conta.getBandeiraAtivo(), conta.getTipoConta(), conta.getDataCriacao());
    }
}
