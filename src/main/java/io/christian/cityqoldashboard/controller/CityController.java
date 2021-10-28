package io.christian.cityqoldashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import io.christian.cityqoldashboard.model.City;
import io.christian.cityqoldashboard.repository.CityRepository;

@RestController
public class CityController {
    

    CityRepository cityRepository;


    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    // @GetMapping("/city/{cityName}")
    // public City getAllCities(@PathVariable String cityName) {
    //     return this.cityRepository.findByNameIgnoreCase(cityName);
    // }

}