package br.com.lovedyear.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "paginas_wrapped") // Removi a uniqueConstraint dos nomes
public class PaginaWrapped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Esse campo vai guardar a URL final (ex: "romeu-julieta-2")
    // Ele precisa ser único para o site não abrir a página errada
    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String nome1;

    @Column(nullable = false)
    private String nome2;

    private String mainPhoto;
    private String songUrl;
    private String passwordToOpen;

    @ElementCollection
    @CollectionTable(name = "paginas_carrousel", joinColumns = @JoinColumn(name = "pagina_id"))
    @Column(name = "foto_url")
    private List<String> carrousel;

    @Column(name = "spotify_image")
    private String spotifyImage;
}