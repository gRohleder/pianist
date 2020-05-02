package de.gerdrohleder.pianist.repository;

import de.gerdrohleder.pianist.domain.Score;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Score entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
}
