package com.Moreira.GestaoDeContas.Models.Transacao;


import com.Moreira.GestaoDeContas.Models.Conta.Conta;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "transacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "conta_id")
    private Conta clienteId;
    private Double valorTransacao;

    @Enumerated(EnumType.STRING)
    private TipoTransacaoEnum tipoTransacao;
    private LocalDateTime dataTransacao = LocalDateTime.now();

    public Transacao(DadosCadastraTransacao dados) {
        this.clienteId = dados.clienteId();
        this.valorTransacao = dados.valorTransacao();
        this.tipoTransacao = dados.tipoTransacao();
    }

}
