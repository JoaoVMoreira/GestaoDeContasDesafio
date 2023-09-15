package com.Moreira.GestaoDeContas.Controller;


import com.Moreira.GestaoDeContas.Models.Conta.Conta;
import com.Moreira.GestaoDeContas.Models.Conta.DadosCadastraConta;
import com.Moreira.GestaoDeContas.Models.Conta.DadosListarConta;
import com.Moreira.GestaoDeContas.Models.Conta.DadosTransacaoConta;
import com.Moreira.GestaoDeContas.Models.Transacao.Transacao;
import com.Moreira.GestaoDeContas.Repositorios.ContaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;


@RestController
@RequestMapping("/contas")
public class ContasController {


    @Autowired
    private ContaRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosListarConta> cadastrar(@RequestBody @Valid DadosCadastraConta dados, UriComponentsBuilder uriComponentsBuilder){
        var conta = new Conta(dados);
        repository.save(conta);
        var uri = uriComponentsBuilder.path("/conta/{id}").buildAndExpand(conta.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosListarConta(conta));
    }

    @GetMapping
    public ResponseEntity<List<DadosListarConta>> listar(){
        List<DadosListarConta> contas = repository.findAll().stream().map(DadosListarConta::new).toList();
        return  ResponseEntity.ok(contas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosListarConta> buscarPorId(@PathVariable Long id){
        var conta = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosListarConta(conta));
    }

    @GetMapping("/consultaSaldo/{id}")
    public ResponseEntity<Double> consultaSaldo(@PathVariable Long id){
        var saldo = repository.getReferenceById(id).getSaldo();
        return ResponseEntity.ok(saldo);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<DadosListarConta> bloquearConta(@PathVariable Long id){
        var conta = repository.getReferenceById(id);
        conta.Bloquear();
        return ResponseEntity.ok(new DadosListarConta(conta));
    }

    //Saque
    @PutMapping("/saque/{id}")
    @Transactional
    public ResponseEntity<DadosListarConta> saque(@PathVariable Long id, @RequestBody DadosTransacaoConta dados){
        var conta = repository.getReferenceById(id);
        conta.Debitar(dados.valor());
        return ResponseEntity.ok(new DadosListarConta(conta));
    }

    //Deposito
    @PutMapping("/deposito/{id}")
    @Transactional
    public ResponseEntity<DadosListarConta> deposito(@PathVariable Long id, @RequestBody DadosTransacaoConta dados){
        var conta = repository.getReferenceById(id);
        conta.Depositar(dados.valor());
        return ResponseEntity.ok(new DadosListarConta(conta));
    }
}
