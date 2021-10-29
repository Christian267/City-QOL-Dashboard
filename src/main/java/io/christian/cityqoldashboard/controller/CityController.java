package io.christian.cityqoldashboard.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import io.christian.cityqoldashboard.model.City;
import io.christian.cityqoldashboard.repository.CityRepository;

@RestController
@CrossOrigin
public class CityController {
    

    CityRepository cityRepository;


    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @GetMapping("/city")
    public List<City> getAllCities() {
        List<City> cities = new ArrayList<City>();
        this.cityRepository.findAll()
        .forEach(cities::add);
        return cities;
    }

    @GetMapping("/city/{cityName}/{countryName}")
    public City getCity(@PathVariable String cityName, @PathVariable String countryName ) {
        return this.cityRepository.findByUaNameIgnoreCaseAndUaCountryIgnoreCase(cityName, countryName);
    }


}