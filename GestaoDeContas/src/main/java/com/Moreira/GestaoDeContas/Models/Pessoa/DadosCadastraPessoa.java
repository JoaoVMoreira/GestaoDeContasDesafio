package com.Moreira.GestaoDeContas.Models.Pessoa;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DadosCadastraPessoa(
        @NotBlank
        String nome,
        @NotNull
        Long cpf,
        @NotNull
        LocalDate dataNascimento
) {
}
