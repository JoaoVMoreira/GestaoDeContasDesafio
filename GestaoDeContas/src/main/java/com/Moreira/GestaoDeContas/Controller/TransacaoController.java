package com.Moreira.GestaoDeContas.Controller;

import com.Moreira.GestaoDeContas.Models.Transacao.*;
import com.Moreira.GestaoDeContas.Repositorios.ContaRepository;
import com.Moreira.GestaoDeContas.Repositorios.TransacaoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {

    @Autowired
    private TransacaoRepository repository;

    @Autowired
    private ContaRepository contaRepository;
    @PostMapping
    @Transactional
    public ResponseEntity<DadosListarTransacao> cadastrar(@RequestBody @Valid DadosCadastraTransacao dados, UriComponentsBuilder uriComponentsBuilder){
        var conta = contaRepository.findById(dados.contaId()).get();
        var transacao = new Transacao(conta, dados);
        repository.save(transacao);
        if(dados.tipoTransacao() == TipoTransacaoEnum.Debito){

            Double transacoesToday = repository.ValorTransacoesToday(LocalDate.now(), LocalDate.now().plusDays(1), dados.contaId());
            if(transacoesToday > conta.getLimiteSaldoDiario()){
                throw new IllegalArgumentException("Limite diário atingido");
            }

            conta.Debitar(transacao.getValorTransacao());
        } else {
            conta.Depositar(transacao.getValorTransacao());
        }
        var uri = uriComponentsBuilder.path("/transacao/{id}").buildAndExpand(transacao.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosListarTransacao(transacao));
    }
    @GetMapping
    public ResponseEntity<List<DadosListarTransacao>> listar(){
        var contas = repository.findAll().stream().map(DadosListarTransacao::new).toList();
        return ResponseEntity.ok(contas);
    }

    @GetMapping("/periodo/{id}")
    public ResponseEntity<List<DadosListarTransacao>> extrato(@RequestBody @Valid DadosBuscarPorData dados, @PathVariable Long id){
        if(dados.dataInicial().isAfter(dados.dataFinal())){
            throw new RuntimeException("A data inicial não pode ser superior a data final");
        }
        var transacoes = repository.BuscarPorPeriodo(dados.dataInicial(), dados.dataFinal(), id).stream().map(DadosListarTransacao::new).toList();
        return ResponseEntity.ok(transacoes);
    }
}
