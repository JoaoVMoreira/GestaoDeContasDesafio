package com.Moreira.GestaoDeContas.Controller;


import com.Moreira.GestaoDeContas.Models.Conta.Conta;
import com.Moreira.GestaoDeContas.Models.Conta.DadosCadastraConta;
import com.Moreira.GestaoDeContas.Models.Conta.DadosListarConta;
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

}
