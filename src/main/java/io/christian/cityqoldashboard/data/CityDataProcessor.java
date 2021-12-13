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
        city.setUaName(cityInput.getUaName());
        city.setUaCountry(cityInput.getUaCountry());
        city.setUaContinent(cityInput.getUaContinent());
        city.setHousing(Float.parseFloat(cityInput.getHousing()));
        city.setCostOfLiving(Float.parseFloat(cityInput.getCostOfLiving()));
        city.setStartups(Float.parseFloat(cityInput.getStartups()));
        city.setVentureCapital(Float.parseFloat(cityInput.getVentureCapital()));
        city.setTravelConnectivity(Float.parseFloat(cityInput.getTravelConnectivity()));
        city.setCommute(Float.parseFloat(cityInput.getCommute()));
        city.setBusinessFreedom(Float.parseFloat(cityInput.getBusinessFreedom()));
        city.setSafety(Float.parseFloat(cityInput.getSafety()));
        city.setHealthcare(Float.parseFloat(cityInput.getHealthcare()));
        city.setEducation(Float.parseFloat(cityInput.getEducation()));
        city.setEnvironmentalQuality(Float.parseFloat(cityInput.getEnvironmentalQuality()));
        city.setEconomy(Float.parseFloat(cityInput.getEconomy()));
        city.setTaxation(Float.parseFloat(cityInput.getTaxation()));
        city.setInternetAccess(Float.parseFloat(cityInput.getInternetAccess()));
        city.setLeisureCulture(Float.parseFloat(cityInput.getLeisureCulture()));
        city.setTolerance(Float.parseFloat(cityInput.getTolerance()));
        city.setOutdoors(Float.parseFloat(cityInput.getOutdoors()));
        return city;
    }
  
  }