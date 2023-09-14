package com.Moreira.GestaoDeContas.Models.Conta;

import com.Moreira.GestaoDeContas.Models.Conta.TipoContaEnum;
import com.Moreira.GestaoDeContas.Models.Pessoa.Pessoa;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record DadosCadastraConta(
        @NotNull
        Pessoa pessoaId,
        @NotNull
        Double saldo,
        @NotNull
        Double limiteSaldoDiario,
        @NotBlank
        TipoContaEnum tipoConta
) {
}
