package de.gerdrohleder.pianist.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import de.gerdrohleder.pianist.domain.enumeration.LEVEL;

/**
 * A Score.
 */
@Entity
@Table(name = "score")
public class Score implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "creator")
    private String creator;

    @Column(name = "how_to_play")
    private Boolean howToPlay;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private LEVEL level;

    @ManyToOne
    @JsonIgnoreProperties("scores")
    private Pianist pianist;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Score name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreator() {
        return creator;
    }

    public Score creator(String creator) {
        this.creator = creator;
        return this;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Boolean isHowToPlay() {
        return howToPlay;
    }

    public Score howToPlay(Boolean howToPlay) {
        this.howToPlay = howToPlay;
        return this;
    }

    public void setHowToPlay(Boolean howToPlay) {
        this.howToPlay = howToPlay;
    }

    public LEVEL getLevel() {
        return level;
    }

    public Score level(LEVEL level) {
        this.level = level;
        return this;
    }

    public void setLevel(LEVEL level) {
        this.level = level;
    }

    public Pianist getPianist() {
        return pianist;
    }

    public Score pianist(Pianist pianist) {
        this.pianist = pianist;
        return this;
    }

    public void setPianist(Pianist pianist) {
        this.pianist = pianist;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Score)) {
            return false;
        }
        return id != null && id.equals(((Score) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Score{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", creator='" + getCreator() + "'" +
            ", howToPlay='" + isHowToPlay() + "'" +
            ", level='" + getLevel() + "'" +
            "}";
    }
}
