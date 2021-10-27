package io.christian.cityqoldashboard.data;

import io.christian.cityqoldashboard.model.City;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.item.ItemProcessor;

public class CityDataProcessor implements ItemProcessor<CityInput, City> {

    private static final Logger log = LoggerFactory.getLogger(CityDataProcessor.class);
  
    @Override
    public City process(final CityInput cityInput) throws Exception {
        City city = new City();
        city.setId(Long.parseLong(cityInput.getId()));
        city.setUa_name(cityInput.getUa_name());
        city.setUa_country(cityInput.getUa_country());
        city.setUa_continent(cityInput.getUa_continent());
        city.setHousing(Float.parseFloat(cityInput.getHousing()));
        city.setCost_of_living(Float.parseFloat(cityInput.getCost_of_living()));
        city.setStartups(Float.parseFloat(cityInput.getStartups()));
        city.setVenture_capital(Float.parseFloat(cityInput.getVenture_capital()));
        city.setTravel_connectivity(Float.parseFloat(cityInput.getTravel_connectivity()));
        city.setCommute(Float.parseFloat(cityInput.getCommute()));
        city.setBusiness_freedom(Float.parseFloat(cityInput.getBusiness_freedom()));
        city.setSafety(Float.parseFloat(cityInput.getSafety()));
        city.setHealthcare(Float.parseFloat(cityInput.getHealthcare()));
        city.setEducation(Float.parseFloat(cityInput.getEducation()));
        city.setEnvironmental_quality(Float.parseFloat(cityInput.getEnvironmental_quality()));
        city.setEconomy(Float.parseFloat(cityInput.getEconomy()));
        return city;
    }
  
  }