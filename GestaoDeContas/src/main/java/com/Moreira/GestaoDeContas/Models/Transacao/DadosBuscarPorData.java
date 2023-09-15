package com.Moreira.GestaoDeContas.Models.Transacao;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record DadosBuscarPorData(
        @NotNull
        LocalDate dataInicial,
        @NotNull
        LocalDate dataFinal
) {
}
