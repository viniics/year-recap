package br.com.lovedyear.demo.service;

import br.com.lovedyear.demo.entity.PaginaWrapped;
import br.com.lovedyear.demo.repository.PaginaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;

@Service
public class PaginaService {

    @Autowired
    private PaginaRepository repository;

    public PaginaWrapped criarPagina(PaginaWrapped pagina) {
        String n1 = pagina.getNome1().trim();
        String n2 = pagina.getNome2().trim();
        String baseSlug = sanitizarString(n1) + "-" + sanitizarString(n2);
        
        String finalSlug = baseSlug;
        int contador = 2;

        while (repository.existsBySlug(finalSlug)) {
            finalSlug = baseSlug + "-" + contador;
            contador++;
        }

        pagina.setSlug(finalSlug);
        
        return repository.save(pagina);
    }

    public PaginaWrapped buscarPorSlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Página não encontrada!"));
    }

    private String sanitizarString(String texto) {
        String slug = Normalizer.normalize(texto, Normalizer.Form.NFD);
        slug = slug.replaceAll("[^\\p{ASCII}]", "");
        slug = slug.toLowerCase().replaceAll("[^a-z0-9]", "-");
        slug = slug.replaceAll("-+", "-");
        if (slug.endsWith("-")) slug = slug.substring(0, slug.length() - 1);
        return slug;
    }
}