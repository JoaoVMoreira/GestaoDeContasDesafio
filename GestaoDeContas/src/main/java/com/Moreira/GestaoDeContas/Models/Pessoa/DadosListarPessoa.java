package com.Moreira.GestaoDeContas.Models.Pessoa;

import java.time.LocalDate;

public record DadosListarPessoa (Long id, String nome, Long cpf, LocalDate dataNascimento) {
    public DadosListarPessoa(Pessoa pessoa){
        this(pessoa.getId(), pessoa.getNome(), pessoa.getCpf(), pessoa.getDataNascimento());
    }
}
