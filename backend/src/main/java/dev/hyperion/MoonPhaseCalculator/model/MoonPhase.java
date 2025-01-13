package dev.hyperion.MoonPhaseCalculator.model;

import java.time.LocalDateTime;

public class MoonPhase {
    double julianDate;
    double phase;
    double age;
    double fraction;
    double distance;
    double latitude;
    double longitude;
    String phaseName;
    String zodiacSign;
    final String[] PHASES = {"New", "Evening Crescent", "First Quarter", "Waxing Gibbous", "Full", "Waning Gibbous", "Last Quarter", "Morning Crescent"};
    final String[] ZODIAC_SIGNS = {"Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"};
    final double[] ZODIAC_ANGLES = {33.18, 51.16, 93.44, 119.48, 135.30, 173.34, 224.17, 242.57, 271.26, 302.49, 311.72, 348.58};
    final double MOON_SYNODIC_PERIOD = 29.530588853; // Period of moon cycle in days.
    final double MOON_SYNODIC_OFFSET = 2451550.26; // Reference cycle offset in days.
    final double MOON_DISTANCE_PERIOD = 27.55454988; // Period of distance oscillation
    final double MOON_DISTANCE_OFFSET = 2451562.2;
    final double MOON_LATITUDE_PERIOD = 27.212220817; // Latitude oscillation
    final double MOON_LATITUDE_OFFSET = 2451565.2;
    final double MOON_LONGITUDE_PERIOD = 27.321582241; // Longitude oscillation
    final double MOON_LONGITUDE_OFFSET = 2451555.8;

    public MoonPhase() {
        this.julianDate = 0;
        this.phase = 0;
        this.age = 0;
        this.fraction = 0;
        this.distance = 0;
        this.latitude = 0;
        this.longitude = 0;
        this.phaseName = "";
        this.zodiacSign = "";
    }

    public MoonPhase(double julianDate, double phase, double age, double fraction, double distance, double latitude, double longitude, String phaseName, String zodiacSign) {
        this.julianDate = julianDate;
        this.phase = phase;
        this.age = age;
        this.fraction = fraction;
        this.distance = distance;
        this.latitude = latitude;
        this.longitude = longitude;
        this.phaseName = phaseName;
        this.zodiacSign = zodiacSign;
    }

    public MoonPhase(LocalDateTime date){
        int year = date.getYear();
        int month = date.getMonthValue();
        int day = date.getDayOfMonth();
        int hour = date.getHour();
        int minute = date.getMinute();
        int second = date.getSecond();

        // Preparing for Julian date calculation
        if (month < 3) {
            year--;
            month += 12;
        }

        //Calculate Julian date
        double A = Math.floor((double)year/100);
        double B = 2 - A + Math.floor(A/4); //for Gregorian calendar
        double julianDay = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;

        //Adding fraction of the day
        double fractionOfTheDay = (hour + minute/60.0 + second/3600.0) / 24.0;
        double julianDate = julianDay + fractionOfTheDay;

        //Get synodic phase
        double phase = (julianDate - MOON_SYNODIC_OFFSET) / MOON_SYNODIC_PERIOD;
        phase -= Math.floor(phase); //Normilzing
        double age = phase * MOON_SYNODIC_PERIOD; //Age of the moon in days
        double illuminationFraction = (1 - Math.cos(2 * Math.PI * phase)) / 2; //Illumination fraction

        //Get distance
        double distancePhase = (julianDate - MOON_DISTANCE_OFFSET) / MOON_DISTANCE_PERIOD;
        distancePhase -= Math.floor(distancePhase);
        double distance = 60.4 - 3.3 * Math.cos(2 * Math.PI * distancePhase) - 0.6 * Math.cos(2 * 2 * Math.PI * phase - 2 * Math.PI * distancePhase) - 0.5 * Math.cos(2*2*Math.PI *phase); //Distance in Earth radius

        //Determine phase name
        int phaseIndex = (int)Math.floor(phase * 8 + 0.5)%8;
        String phaseName = PHASES[phaseIndex];

        //Calculate eliptic latitude
        double latitudePhase = (julianDate - MOON_LATITUDE_OFFSET) / MOON_LATITUDE_PERIOD;
        latitudePhase -= Math.floor(latitudePhase);
        double latitude = 5.1 * Math.sin(2 * Math.PI * latitudePhase); //Latitude in degrees

        //Calculate eliptic longitude
        double longitudePhase = (julianDate - MOON_LONGITUDE_OFFSET) / MOON_LONGITUDE_PERIOD;
        longitudePhase -= Math.floor(longitudePhase);
        double longitude = 360 * longitudePhase + 6.3 * Math.sin(2 * Math.PI * distancePhase) + 1.3 * Math.sin(2 * 2 * Math.PI * phase - 2 * Math.PI * distancePhase) + 0.7 * Math.sin(2 * 2 * Math.PI * phase); //Longitude in degrees
        if (longitude > 360) {
            longitude -= 360; //Normalizing
        }

        //Determine zodiac sign
        String zodiacSign = ZODIAC_SIGNS[0];
        for (int i = 0; i < ZODIAC_ANGLES.length; i++) {
            if (longitude < ZODIAC_ANGLES[i]) {
                zodiacSign = ZODIAC_SIGNS[i];
                break;
            }
        }


        this.julianDate = julianDate;
        this.phase = phase;
        this.age = age;
        this.fraction = illuminationFraction;
        this.distance = distance;
        this.phaseName = phaseName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zodiacSign = zodiacSign;
    }

    public double getJulianDate() {
        return julianDate;
    }

    public void setJulianDate(double julianDate) {
        this.julianDate = julianDate;
    }

    public double getPhase() {
        return phase;
    }

    public void setPhase(double phase) {
        this.phase = phase;
    }

    public double getAge() {
        return age;
    }

    public void setAge(double age) {
        this.age = age;
    }

    public double getFraction() {
        return fraction;
    }

    public void setFraction(double fraction) {
        this.fraction = fraction;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getPhaseName() {
        return phaseName;
    }

    public void setPhaseName(String phaseName) {
        this.phaseName = phaseName;
    }

    public String getZodiacSign() {
        return zodiacSign;
    }

    public void setZodiacSign(String zodiacSign) {
        this.zodiacSign = zodiacSign;
    }
}
