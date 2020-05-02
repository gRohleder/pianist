package de.gerdrohleder.pianist.web.rest;

import de.gerdrohleder.pianist.PianistApp;
import de.gerdrohleder.pianist.domain.Pianist;
import de.gerdrohleder.pianist.repository.PianistRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PianistResource} REST controller.
 */
@SpringBootTest(classes = PianistApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PianistResourceIT {

    private static final Integer DEFAULT_NUMBER = 1;
    private static final Integer UPDATED_NUMBER = 2;

    @Autowired
    private PianistRepository pianistRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPianistMockMvc;

    private Pianist pianist;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pianist createEntity(EntityManager em) {
        Pianist pianist = new Pianist()
            .number(DEFAULT_NUMBER);
        return pianist;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pianist createUpdatedEntity(EntityManager em) {
        Pianist pianist = new Pianist()
            .number(UPDATED_NUMBER);
        return pianist;
    }

    @BeforeEach
    public void initTest() {
        pianist = createEntity(em);
    }

    @Test
    @Transactional
    public void createPianist() throws Exception {
        int databaseSizeBeforeCreate = pianistRepository.findAll().size();

        // Create the Pianist
        restPianistMockMvc.perform(post("/api/pianists").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pianist)))
            .andExpect(status().isCreated());

        // Validate the Pianist in the database
        List<Pianist> pianistList = pianistRepository.findAll();
        assertThat(pianistList).hasSize(databaseSizeBeforeCreate + 1);
        Pianist testPianist = pianistList.get(pianistList.size() - 1);
        assertThat(testPianist.getNumber()).isEqualTo(DEFAULT_NUMBER);
    }

    @Test
    @Transactional
    public void createPianistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pianistRepository.findAll().size();

        // Create the Pianist with an existing ID
        pianist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPianistMockMvc.perform(post("/api/pianists").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pianist)))
            .andExpect(status().isBadRequest());

        // Validate the Pianist in the database
        List<Pianist> pianistList = pianistRepository.findAll();
        assertThat(pianistList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPianists() throws Exception {
        // Initialize the database
        pianistRepository.saveAndFlush(pianist);

        // Get all the pianistList
        restPianistMockMvc.perform(get("/api/pianists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pianist.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getPianist() throws Exception {
        // Initialize the database
        pianistRepository.saveAndFlush(pianist);

        // Get the pianist
        restPianistMockMvc.perform(get("/api/pianists/{id}", pianist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pianist.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingPianist() throws Exception {
        // Get the pianist
        restPianistMockMvc.perform(get("/api/pianists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePianist() throws Exception {
        // Initialize the database
        pianistRepository.saveAndFlush(pianist);

        int databaseSizeBeforeUpdate = pianistRepository.findAll().size();

        // Update the pianist
        Pianist updatedPianist = pianistRepository.findById(pianist.getId()).get();
        // Disconnect from session so that the updates on updatedPianist are not directly saved in db
        em.detach(updatedPianist);
        updatedPianist
            .number(UPDATED_NUMBER);

        restPianistMockMvc.perform(put("/api/pianists").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPianist)))
            .andExpect(status().isOk());

        // Validate the Pianist in the database
        List<Pianist> pianistList = pianistRepository.findAll();
        assertThat(pianistList).hasSize(databaseSizeBeforeUpdate);
        Pianist testPianist = pianistList.get(pianistList.size() - 1);
        assertThat(testPianist.getNumber()).isEqualTo(UPDATED_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingPianist() throws Exception {
        int databaseSizeBeforeUpdate = pianistRepository.findAll().size();

        // Create the Pianist

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPianistMockMvc.perform(put("/api/pianists").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pianist)))
            .andExpect(status().isBadRequest());

        // Validate the Pianist in the database
        List<Pianist> pianistList = pianistRepository.findAll();
        assertThat(pianistList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePianist() throws Exception {
        // Initialize the database
        pianistRepository.saveAndFlush(pianist);

        int databaseSizeBeforeDelete = pianistRepository.findAll().size();

        // Delete the pianist
        restPianistMockMvc.perform(delete("/api/pianists/{id}", pianist.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pianist> pianistList = pianistRepository.findAll();
        assertThat(pianistList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
