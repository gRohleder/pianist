package de.gerdrohleder.pianist.repository;

import de.gerdrohleder.pianist.domain.Pianist;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pianist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PianistRepository extends JpaRepository<Pianist, Long> {
}
