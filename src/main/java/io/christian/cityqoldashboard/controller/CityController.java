package io.christian.cityqoldashboard.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.christian.cityqoldashboard.model.City;
import io.christian.cityqoldashboard.repository.CityRepository;

@RestController
@CrossOrigin
public class CityController {
    
    @Autowired
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
        City city = this.cityRepository.findByUaNameIgnoreCaseAndUaCountryIgnoreCase(cityName, countryName);
        if (city == null) {
            String message404 = "Could not find city: " + cityName;
            List<City> countryCities = this.cityRepository.findAllByUaCountryIgnoreCase(countryName);
            if ( countryCities.size() == 0) {
                message404 = "Could not find country: " + countryName;
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, message404);

        }
        return city;
    }


}