package io.christian.cityqoldashboard.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class City {

    @Id
    private long id;
    private String ua_name;
    private String ua_country;
    private String ua_continent;
    private float housing;
    private float cost_of_living;
    private float startups;
    private float venture_capital;
    private float travel_connectivity;
    private float commute;
    private float business_freedom;
    private float safety;
    private float healthcare;
    private float education;
    private float environmental_quality;
    private float economy;

    
    public City() {
    }


    
    public City(long id, String ua_name, String ua_country, String ua_continent, float housing, float cost_of_living,
            float startups, float venture_capital, float travel_connectivity, float commute, float business_freedom,
            float safety, float healthcare, float education, float environmental_quality, float economy) {
        this.id = id;
        this.ua_name = ua_name;
        this.ua_country = ua_country;
        this.ua_continent = ua_continent;
        this.housing = housing;
        this.cost_of_living = cost_of_living;
        this.startups = startups;
        this.venture_capital = venture_capital;
        this.travel_connectivity = travel_connectivity;
        this.commute = commute;
        this.business_freedom = business_freedom;
        this.safety = safety;
        this.healthcare = healthcare;
        this.education = education;
        this.environmental_quality = environmental_quality;
        this.economy = economy;
    }



    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUa_name() {
        return ua_name;
    }
    public void setUa_name(String ua_name) {
        this.ua_name = ua_name;
    }
    public String getUa_country() {
        return ua_country;
    }
    public void setUa_country(String ua_country) {
        this.ua_country = ua_country;
    }
    public String getUa_continent() {
        return ua_continent;
    }
    public void setUa_continent(String ua_continent) {
        this.ua_continent = ua_continent;
    }
    public float getHousing() {
        return housing;
    }
    public void setHousing(float housing) {
        this.housing = housing;
    }
    public float getCost_of_living() {
        return cost_of_living;
    }
    public void setCost_of_living(float cost_of_living) {
        this.cost_of_living = cost_of_living;
    }
    public float getStartups() {
        return startups;
    }
    public void setStartups(float startups) {
        this.startups = startups;
    }
    public float getVenture_capital() {
        return venture_capital;
    }
    public void setVenture_capital(float venture_capital) {
        this.venture_capital = venture_capital;
    }
    public float getTravel_connectivity() {
        return travel_connectivity;
    }
    public void setTravel_connectivity(float travel_connectivity) {
        this.travel_connectivity = travel_connectivity;
    }
    public float getCommute() {
        return commute;
    }
    public void setCommute(float commute) {
        this.commute = commute;
    }
    public float getBusiness_freedom() {
        return business_freedom;
    }
    public void setBusiness_freedom(float business_freedom) {
        this.business_freedom = business_freedom;
    }
    public float getSafety() {
        return safety;
    }
    public void setSafety(float safety) {
        this.safety = safety;
    }
    public float getHealthcare() {
        return healthcare;
    }
    public void setHealthcare(float healthcare) {
        this.healthcare = healthcare;
    }
    public float getEducation() {
        return education;
    }
    public void setEducation(float education) {
        this.education = education;
    }
    public float getEnvironmental_quality() {
        return environmental_quality;
    }
    public void setEnvironmental_quality(float environmental_quality) {
        this.environmental_quality = environmental_quality;
    }
    public float getEconomy() {
        return economy;
    }
    public void setEconomy(float economy) {
        this.economy = economy;
    }

    
    
}
