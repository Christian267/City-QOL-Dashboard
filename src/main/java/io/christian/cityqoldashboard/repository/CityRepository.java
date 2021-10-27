package io.christian.cityqoldashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.christian.cityqoldashboard.model.*;

@Repository
public interface CityRepository extends JpaRepository<City, Long>  {
    
}
