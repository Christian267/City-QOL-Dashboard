package io.christian.cityqoldashboard.controller;

import java.util.List;
import java.util.ArrayList;

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

    @GetMapping("/city")
    public List<City> getAllCities() {
        List<City> cities = new ArrayList<City>();
        this.cityRepository.findAll()
        .forEach(cities::add);   // cities.add(currentItem)
        return cities;
    }

    @GetMapping("/city/{cityName}")
    public List<City> getCity(@PathVariable String cityName ) {
        return this.cityRepository.findAllByUaNameIgnoreCase(cityName);
    }
}