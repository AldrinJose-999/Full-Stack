package com.example.workload_back.Table;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TableService {

    private final TableRepo tableRepo;

    public TableService(TableRepo tableRepo) {
        this.tableRepo = tableRepo;
    }

    public List<Table> getTableDetails() {
        // Example data, replace with actual logic to fetch table data
        return tableRepo.findAll();
    }
    public List<Table> byDay(String day) {
        // Fetch timetable entries by day
        return tableRepo.findAll().stream()
                .filter(table -> table.getDay().equalsIgnoreCase(day))
                .toList();

    }

    String register(Table table) {
        // if (authRepository.findByUsername(user.username) == null) {
        try {
            tableRepo.save(table);
            return "Success";
        } catch (Exception e) {
            return e.getMessage();
        }

    }
    public String delete(String day, String time) {
        try {
            tableRepo.deleteByDayAndTime(day, time);
            return "Success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    
}
