package de.gerdrohleder.pianist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.gerdrohleder.pianist.web.rest.TestUtil;

public class PianistTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pianist.class);
        Pianist pianist1 = new Pianist();
        pianist1.setId(1L);
        Pianist pianist2 = new Pianist();
        pianist2.setId(pianist1.getId());
        assertThat(pianist1).isEqualTo(pianist2);
        pianist2.setId(2L);
        assertThat(pianist1).isNotEqualTo(pianist2);
        pianist1.setId(null);
        assertThat(pianist1).isNotEqualTo(pianist2);
    }
}
