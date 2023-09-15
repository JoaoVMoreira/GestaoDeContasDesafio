package com.Moreira.GestaoDeContas.Repositorios;

import com.Moreira.GestaoDeContas.Models.Transacao.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    @Query(
            value = "SELECT * FROM TRANSACOES WHERE data_transacao BETWEEN :dataInicial AND :dataFinal AND conta_id = :clinenteId",
            nativeQuery = true
    )
    List<Transacao> BuscarPorPeriodo(LocalDate dataInicial, LocalDate dataFinal, Long clinenteId);


    @Query(
            value = "SELECT SUM(VALOR_TRANSACAO) FROM TRANSACOES WHERE DATA_TRANSACAO BETWEEN :dataInicial AND :dataFinal AND TIPO_TRANSACAO = 'Debito' AND CONTA_ID = :id",
            nativeQuery = true
    )
    Double ValorTransacoesToday(LocalDate dataInicial, LocalDate dataFinal, Long id);
}
