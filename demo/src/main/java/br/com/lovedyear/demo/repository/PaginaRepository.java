package br.com.lovedyear.demo.repository;

import br.com.lovedyear.demo.entity.PaginaWrapped;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PaginaRepository extends JpaRepository<PaginaWrapped, Long> {
    
    boolean existsBySlug(String slug);

    Optional<PaginaWrapped> findBySlug(String slug);
}