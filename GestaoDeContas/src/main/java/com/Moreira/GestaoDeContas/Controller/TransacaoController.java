package com.Moreira.GestaoDeContas.Controller;

import com.Moreira.GestaoDeContas.Models.Transacao.DadosCadastraTransacao;
import com.Moreira.GestaoDeContas.Models.Transacao.DadosListarTransacao;
import com.Moreira.GestaoDeContas.Models.Transacao.Transacao;
import com.Moreira.GestaoDeContas.Repositorios.TransacaoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/transacao")
public class TransacaoController {

    @Autowired
    private TransacaoRepository repository;
    //CadastroTransacao
    @PostMapping
    @Transactional
    public ResponseEntity<DadosListarTransacao> cadastrar(@RequestBody @Valid DadosCadastraTransacao dados, UriComponentsBuilder uriComponentsBuilder){
        var transacao = new Transacao(dados);
        repository.save(transacao);
        var uri = uriComponentsBuilder.path("/transacao/{id}").buildAndExpand(transacao.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosListarTransacao(transacao));
    }

    //ListarTransações
    @GetMapping
    public ResponseEntity<List<DadosListarTransacao>> listar(){
        var contas = repository.findAll().stream().map(DadosListarTransacao::new).toList();
        return ResponseEntity.ok(contas);
    }


    //ExratoTransacaoPorPeriodo
    //Saque
    //Deposito
}
