package de.gerdrohleder.pianist.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Entry.
 */
@Entity
@Table(name = "entry")
public class Entry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("entries")
    private Pianist pianist;

    @ManyToOne
    @JsonIgnoreProperties("entries")
    private Course course;

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

    public Entry name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Pianist getPianist() {
        return pianist;
    }

    public Entry pianist(Pianist pianist) {
        this.pianist = pianist;
        return this;
    }

    public void setPianist(Pianist pianist) {
        this.pianist = pianist;
    }

    public Course getCourse() {
        return course;
    }

    public Entry course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entry)) {
            return false;
        }
        return id != null && id.equals(((Entry) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Entry{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
