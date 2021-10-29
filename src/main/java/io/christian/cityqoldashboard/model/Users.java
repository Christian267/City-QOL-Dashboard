package io.christian.cityqoldashboard.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Users {
  
    @Id
    private long id;
    private String top1;
    private String top2;
    private String top3;
    private String bottom1;
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

    
    public Users() {
    }

    public Users(long id, String top1, String top2, String top3, String bottom1, float housing, float costOfLiving,
            float startups, float ventureCapital, float travelConnectivity, float commute, float businessFreedom,
            float safety, float healthcare, float education, float environmentalQuality, float economy, float taxation,
            float internetAccess, float leisureCulture, float tolerance, float outdoors) {
        this.id = id;
        this.top1 = top1;
        this.top2 = top2;
        this.top3 = top3;
        this.bottom1 = bottom1;
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
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTop1() {
        return top1;
    }
    public void setTop1(String top1) {
        this.top1 = top1;
    }
    public String getTop2() {
        return top2;
    }
    public void setTop2(String top2) {
        this.top2 = top2;
    }
    public String getTop3() {
        return top3;
    }
    public void setTop3(String top3) {
        this.top3 = top3;
    }
    public String getBottom1() {
        return bottom1;
    }
    public void setBottom1(String bottom1) {
        this.bottom1 = bottom1;
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


    
}
