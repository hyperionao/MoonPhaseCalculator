package dev.hyperion.MoonPhaseCalculator.controller;

import dev.hyperion.MoonPhaseCalculator.model.MoonPhase;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/api/moonphase")
public class MoonPhaseController {

    // Get moon phase for a specific date, no specific time
    @GetMapping("/date/{date}")
    public MoonPhase getMoonPhase(@PathVariable String date) {

        try{
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            LocalDate parsedDate = LocalDate.parse(date, dateFormatter);
            LocalDateTime dateTime = parsedDate.atStartOfDay();
            return new MoonPhase(dateTime);
        } catch (DateTimeParseException e){
            throw new IllegalArgumentException("Invalid date format. Please use yyyy-MM-dd");
        }
    }

    // Get moon phase for a specific date AND time
    @GetMapping("/datetime/{datetime}")
    public MoonPhase getMoonPhaseWithTime (@PathVariable String datetime){
        try {
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime parsedDateTime = LocalDateTime.parse(datetime, dateTimeFormatter);
            return new MoonPhase(parsedDateTime);
        } catch (DateTimeParseException e){
            throw new IllegalArgumentException("Invalid date format. Please use 'yyyy-MM-dd'T'HH:mm:ss'");
        }
    }
}
