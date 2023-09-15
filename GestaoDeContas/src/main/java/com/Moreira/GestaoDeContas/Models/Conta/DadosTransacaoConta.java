package com.Moreira.GestaoDeContas.Models.Conta;

import jakarta.validation.constraints.NotNull;

public record DadosTransacaoConta(
        @NotNull
        Double valor
) {
}
