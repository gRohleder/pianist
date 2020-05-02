package de.gerdrohleder.pianist.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "teacher")
    private String teacher;

    @OneToMany(mappedBy = "course")
    private Set<Entry> entries = new HashSet<>();

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

    public Course name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeacher() {
        return teacher;
    }

    public Course teacher(String teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public Set<Entry> getEntries() {
        return entries;
    }

    public Course entries(Set<Entry> entries) {
        this.entries = entries;
        return this;
    }

    public Course addEntry(Entry entry) {
        this.entries.add(entry);
        entry.setCourse(this);
        return this;
    }

    public Course removeEntry(Entry entry) {
        this.entries.remove(entry);
        entry.setCourse(null);
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
        if (!(o instanceof Course)) {
            return false;
        }
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", teacher='" + getTeacher() + "'" +
            "}";
    }
}
