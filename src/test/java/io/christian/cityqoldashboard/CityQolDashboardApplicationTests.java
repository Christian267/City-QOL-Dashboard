package io.christian.cityqoldashboard;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.TestReporter;
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
    
    TestInfo testInfo;
    TestReporter testReporter;

    @BeforeAll
    static void beforeAllinit() {
        System.out.println("This needs to run before all");
    }

    @BeforeEach
    void init(TestInfo testInfo, TestReporter testReporter) {
        this.testInfo = testInfo;
        this.testReporter = testReporter;
        testReporter.publishEntry("Running " + testInfo.getDisplayName() + " with tags " + testInfo.getTags());
    }

    @Test
    @Tag("Context")
    @DisplayName("load cityController")
    public void contextLoads() {

        Assertions.assertThat(cityController).isNot(null);
    }
}