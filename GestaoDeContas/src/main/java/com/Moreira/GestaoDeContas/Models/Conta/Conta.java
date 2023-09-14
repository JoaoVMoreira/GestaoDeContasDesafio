package com.Moreira.GestaoDeContas.Models.Conta;

import com.Moreira.GestaoDeContas.Models.Pessoa.Pessoa;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name = "contas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Conta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoaId;
    private Double Saldo;
    private Double limiteSaldoDiario;
    private Boolean bandeiraAtivo;
    @Enumerated(EnumType.STRING)
    private TipoContaEnum tipoConta;
    private LocalDateTime dataCriacao = LocalDateTime.now();

}
