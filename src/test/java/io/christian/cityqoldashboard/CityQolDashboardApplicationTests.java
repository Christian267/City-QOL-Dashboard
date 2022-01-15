package io.christian.cityqoldashboard;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import io.christian.cityqoldashboard.controller.CityController;
 
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class CityQolDashboardApplicationTests {
 
    @Autowired
    CityController cityController;
 
    @Test
    public void contextLoads() {
        Assertions.assertThat(cityController).isNot(null);
    }
}