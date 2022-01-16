package io.christian.cityqoldashboard.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.christian.cityqoldashboard.model.*;

@Repository
public interface CityRepository extends CrudRepository<City, Long>  {
    
    City findByUaNameIgnoreCaseAndUaCountryIgnoreCase(String cityName, String countryName);
}