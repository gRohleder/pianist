package de.gerdrohleder.pianist.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Pianist.
 */
@Entity
@Table(name = "pianist")
public class Pianist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "number")
    private Integer number;

    @OneToMany(mappedBy = "pianist")
    private Set<Score> scores = new HashSet<>();

    @OneToMany(mappedBy = "pianist")
    private Set<Entry> entries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public Pianist number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Set<Score> getScores() {
        return scores;
    }

    public Pianist scores(Set<Score> scores) {
        this.scores = scores;
        return this;
    }

    public Pianist addScore(Score score) {
        this.scores.add(score);
        score.setPianist(this);
        return this;
    }

    public Pianist removeScore(Score score) {
        this.scores.remove(score);
        score.setPianist(null);
        return this;
    }

    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }

    public Set<Entry> getEntries() {
        return entries;
    }

    public Pianist entries(Set<Entry> entries) {
        this.entries = entries;
        return this;
    }

    public Pianist addEntry(Entry entry) {
        this.entries.add(entry);
        entry.setPianist(this);
        return this;
    }

    public Pianist removeEntry(Entry entry) {
        this.entries.remove(entry);
        entry.setPianist(null);
        return this;
    }

    public void setEntries(Set<Entry> entries) {
        this.entries = entries;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pianist)) {
            return false;
        }
        return id != null && id.equals(((Pianist) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Pianist{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            "}";
    }
}
