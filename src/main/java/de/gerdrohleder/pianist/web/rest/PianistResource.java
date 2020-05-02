package de.gerdrohleder.pianist.web.rest;

import de.gerdrohleder.pianist.domain.Pianist;
import de.gerdrohleder.pianist.repository.PianistRepository;
import de.gerdrohleder.pianist.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.gerdrohleder.pianist.domain.Pianist}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PianistResource {

    private final Logger log = LoggerFactory.getLogger(PianistResource.class);

    private static final String ENTITY_NAME = "pianist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PianistRepository pianistRepository;

    public PianistResource(PianistRepository pianistRepository) {
        this.pianistRepository = pianistRepository;
    }

    /**
     * {@code POST  /pianists} : Create a new pianist.
     *
     * @param pianist the pianist to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pianist, or with status {@code 400 (Bad Request)} if the pianist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pianists")
    public ResponseEntity<Pianist> createPianist(@RequestBody Pianist pianist) throws URISyntaxException {
        log.debug("REST request to save Pianist : {}", pianist);
        if (pianist.getId() != null) {
            throw new BadRequestAlertException("A new pianist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pianist result = pianistRepository.save(pianist);
        return ResponseEntity.created(new URI("/api/pianists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pianists} : Updates an existing pianist.
     *
     * @param pianist the pianist to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pianist,
     * or with status {@code 400 (Bad Request)} if the pianist is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pianist couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pianists")
    public ResponseEntity<Pianist> updatePianist(@RequestBody Pianist pianist) throws URISyntaxException {
        log.debug("REST request to update Pianist : {}", pianist);
        if (pianist.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pianist result = pianistRepository.save(pianist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pianist.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pianists} : get all the pianists.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pianists in body.
     */
    @GetMapping("/pianists")
    public List<Pianist> getAllPianists() {
        log.debug("REST request to get all Pianists");
        return pianistRepository.findAll();
    }

    /**
     * {@code GET  /pianists/:id} : get the "id" pianist.
     *
     * @param id the id of the pianist to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pianist, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pianists/{id}")
    public ResponseEntity<Pianist> getPianist(@PathVariable Long id) {
        log.debug("REST request to get Pianist : {}", id);
        Optional<Pianist> pianist = pianistRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pianist);
    }

    /**
     * {@code DELETE  /pianists/:id} : delete the "id" pianist.
     *
     * @param id the id of the pianist to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pianists/{id}")
    public ResponseEntity<Void> deletePianist(@PathVariable Long id) {
        log.debug("REST request to delete Pianist : {}", id);
        pianistRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
