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
    private Double saldo;
    private Double limiteSaldoDiario;
    private Boolean bandeiraAtivo = true;
    @Enumerated(EnumType.STRING)
    private TipoContaEnum tipoConta;
    private LocalDateTime dataCriacao = LocalDateTime.now();

    public Conta(DadosCadastraConta dados) {
        this.pessoaId = dados.pessoaId();
        this.tipoConta = dados.tipoConta();
        this.saldo = dados.saldo();
        this.limiteSaldoDiario = dados.limiteSaldoDiario();
    }

    public void Bloquear() {
        this.bandeiraAtivo = !this.bandeiraAtivo;
    }
}
