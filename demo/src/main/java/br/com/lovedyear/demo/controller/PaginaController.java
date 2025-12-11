package br.com.lovedyear.demo.controller;

import br.com.lovedyear.demo.entity.PaginaWrapped;
import br.com.lovedyear.demo.service.PaginaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pagina")
@CrossOrigin(origins = "*")
public class PaginaController {

    @Autowired
    private PaginaService service;

    @PostMapping
    public ResponseEntity<PaginaWrapped> criar(@RequestBody PaginaWrapped pagina) {
        PaginaWrapped nova = service.criarPagina(pagina);
        return ResponseEntity.ok(nova);
    }
    
    @GetMapping("/{slug}")
    public ResponseEntity<PaginaWrapped> obter(@PathVariable String slug) {
        try {
            return ResponseEntity.ok(service.buscarPorSlug(slug));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}