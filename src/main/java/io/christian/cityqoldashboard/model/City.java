package io.christian.cityqoldashboard.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class City {

    @Id
    private long id;
    private String uaName;
    private String uaCountry;
    private String uaContinent;
    private float housing;
    private float costOfLiving;
    private float startups;
    private float ventureCapital;
    private float travelConnectivity;
    private float commute;
    private float businessFreedom;
    private float safety;
    private float healthcare;
    private float education;
    private float environmentalQuality;
    private float economy;
    private float taxation;
    private float internetAccess;
    private float leisureCulture;
    private float tolerance;
    private float outdoors;

    @Transient
    private float score;
    
    public City() {
    }
    
    public City(long id, String uaName, String uaCountry, String uaContinent, float housing, float costOfLiving,
            float startups, float ventureCapital, float travelConnectivity, float commute, float businessFreedom,
            float safety, float healthcare, float education, float environmentalQuality, float economy, float taxation,
            float internetAccess, float leisureCulture, float tolerance, float outdoors) {
        this.id = id;
        this.uaName = uaName;
        this.uaCountry = uaCountry;
        this.uaContinent = uaContinent;
        this.housing = housing;
        this.costOfLiving = costOfLiving;
        this.startups = startups;
        this.ventureCapital = ventureCapital;
        this.travelConnectivity = travelConnectivity;
        this.commute = commute;
        this.businessFreedom = businessFreedom;
        this.safety = safety;
        this.healthcare = healthcare;
        this.education = education;
        this.environmentalQuality = environmentalQuality;
        this.economy = economy;
        this.taxation = taxation;
        this.internetAccess = internetAccess;
        this.leisureCulture = leisureCulture;
        this.tolerance = tolerance;
        this.outdoors = outdoors;
        this.score = (housing + costOfLiving + startups + ventureCapital + 
        travelConnectivity + commute + businessFreedom + safety + healthcare + 
        education + environmentalQuality + economy + taxation + internetAccess + 
        leisureCulture + tolerance + outdoors) / 17;

    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUaName() {
        return uaName;
    }
    public void setUaName(String uaName) {
        this.uaName = uaName;
    }
    public String getUaCountry() {
        return uaCountry;
    }
    public void setUaCountry(String uaCountry) {
        this.uaCountry = uaCountry;
    }
    public String getUaContinent() {
        return uaContinent;
    }
    public void setUaContinent(String uaContinent) {
        this.uaContinent = uaContinent;
    }
    public float getHousing() {
        return housing;
    }
    public void setHousing(float housing) {
        this.housing = housing;
    }
    public float getCostOfLiving() {
        return costOfLiving;
    }
    public void setCostOfLiving(float costOfLiving) {
        this.costOfLiving = costOfLiving;
    }
    public float getStartups() {
        return startups;
    }
    public void setStartups(float startups) {
        this.startups = startups;
    }
    public float getVentureCapital() {
        return ventureCapital;
    }
    public void setVentureCapital(float ventureCapital) {
        this.ventureCapital = ventureCapital;
    }
    public float getTravelConnectivity() {
        return travelConnectivity;
    }
    public void setTravelConnectivity(float travelConnectivity) {
        this.travelConnectivity = travelConnectivity;
    }
    public float getCommute() {
        return commute;
    }
    public void setCommute(float commute) {
        this.commute = commute;
    }
    public float getBusinessFreedom() {
        return businessFreedom;
    }
    public void setBusinessFreedom(float businessFreedom) {
        this.businessFreedom = businessFreedom;
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
    public float getEnvironmentalQuality() {
        return environmentalQuality;
    }
    public void setEnvironmentalQuality(float environmentalQuality) {
        this.environmentalQuality = environmentalQuality;
    }
    public float getEconomy() {
        return economy;
    }
    public void setEconomy(float economy) {
        this.economy = economy;
    }
    public float getTaxation() {
        return taxation;
    }
    public void setTaxation(float taxation) {
        this.taxation = taxation;
    }
    public float getInternetAccess() {
        return internetAccess;
    }
    public void setInternetAccess(float internetAccess) {
        this.internetAccess = internetAccess;
    }
    public float getLeisureCulture() {
        return leisureCulture;
    }
    public void setLeisureCulture(float leisureCulture) {
        this.leisureCulture = leisureCulture;
    }
    public float getTolerance() {
        return tolerance;
    }
    public void setTolerance(float tolerance) {
        this.tolerance = tolerance;
    }
    public float getOutdoors() {
        return outdoors;
    }
    public void setOutdoors(float outdoors) {
        this.outdoors = outdoors;
    }

    public float getScore() {
        float sum = (this.housing + this.costOfLiving + this.startups + this.ventureCapital + this.
        travelConnectivity + this.commute + this.businessFreedom + this.safety + this.healthcare + this.
        education + this.environmentalQuality + this.economy + this.taxation + this.internetAccess + this.
        leisureCulture + this.tolerance + this.outdoors) / 17;
        setScore(sum);
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }



    
}
