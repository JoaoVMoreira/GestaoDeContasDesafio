package com.Moreira.GestaoDeContas.Models.Transacao;

import jakarta.validation.constraints.NotNull;

public record DadosCadastraTransacao(
        @NotNull
        Long contaId,
        @NotNull
        Double valorTransacao,
        @NotNull
        TipoTransacaoEnum tipoTransacao
) {
}
