package com.Moreira.GestaoDeContas.Models.Conta;

import com.Moreira.GestaoDeContas.Models.Pessoa.Pessoa;
import jakarta.validation.constraints.NotNull;


public record DadosCadastraConta(
        @NotNull
        Long pessoaId,
        @NotNull
        Double saldo,
        @NotNull
        Double limiteSaldoDiario,
        @NotNull
        TipoContaEnum tipoConta
) {
}
