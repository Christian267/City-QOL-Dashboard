package io.christian.cityqoldashboard.controller;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.TestReporter;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import io.christian.cityqoldashboard.repository.CityRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("city controller test")
public class CityControllerTest {

    
    @Mock
    private CityRepository cityRepository;
    private CityController cityController;

    TestInfo testInfo;
    TestReporter testReporter;

    @BeforeEach
    void init(TestInfo testInfo, TestReporter testReporter) {
        cityController = new CityController(cityRepository);
        this.testInfo = testInfo;
        this.testReporter = testReporter;
        testReporter.publishEntry("Running " + testInfo.getDisplayName() + " with tags " + testInfo.getTags());
    }

    @Test
    @Tag("HTTP-GET")
    @DisplayName("/city")
    void testGetAllCities() {
        cityController.getAllCities();
        verify(cityRepository).findAll();
    }

    @Test
    @Tag("HTTP-GET")
    @DisplayName("/city/{cityName}/{countryName}")
    void testGetCity() {
        cityController.getCity("dallas", "texas");
        verify(cityRepository).findByUaNameIgnoreCaseAndUaCountryIgnoreCase("dallas", "texas");
    }
}
