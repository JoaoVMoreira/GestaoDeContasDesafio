package com.Moreira.GestaoDeContas.Models.Transacao;

import com.Moreira.GestaoDeContas.Models.Conta.Conta;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record DadosCadastraTransacao(
        @NotNull
        Conta contaId,
        @NotNull
        Double valorTransacao,
        @NotNull
        TipoTransacaoEnum tipoTransacao
) {
}
