package com.Moreira.GestaoDeContas.Controller;

import com.Moreira.GestaoDeContas.Models.Pessoa.DadosCadastraPessoa;
import com.Moreira.GestaoDeContas.Models.Pessoa.DadosListarPessoa;
import com.Moreira.GestaoDeContas.Models.Pessoa.Pessoa;
import com.Moreira.GestaoDeContas.Repositorios.PessoaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/pessoas")
@CrossOrigin(origins = "*")
public class PessoaController {

    @Autowired
    private PessoaRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosListarPessoa> cadastrar(@RequestBody @Valid DadosCadastraPessoa dados, UriComponentsBuilder uriComponentsBuilder){
        var pessoa = new Pessoa(dados);
        repository.save(pessoa);
        var uri = uriComponentsBuilder.path("/pessoa/{id}").buildAndExpand(pessoa.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosListarPessoa(pessoa));
    }

    @GetMapping
    public ResponseEntity<List<DadosListarPessoa>> listar(){
        List<DadosListarPessoa> pessoas = repository.findAll().stream().map(DadosListarPessoa::new).toList();
        return ResponseEntity.ok(pessoas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosListarPessoa> buscarPorId(@PathVariable Long id){
        var pessoa = repository.getReferenceById(id);
        return  ResponseEntity.ok(new DadosListarPessoa(pessoa));
    }
}
