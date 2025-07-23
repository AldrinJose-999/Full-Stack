package com.example.workload_back.Table;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@RestController
@RequestMapping("/table")
@CrossOrigin(origins = "http://localhost:3000") // Adjust the origin as needed
public class TableController {

    private final TableService tableservice;
    

    public TableController(TableService tableService) {
        this.tableservice = tableService;
    }
   
    @GetMapping("getTable")
    public List<Table> getTable() {
        // Example data, replace with actual logic to fetch table data
        return tableservice.getTableDetails();
    }
    @GetMapping("getTimetableByDay/{day}")
    public List<Table> getTimetableByDay(@PathVariable String day) {
    return tableservice.byDay(day);
}
     @PostMapping("register")
    public String register(@RequestBody Table table) {
        
        return tableservice.register(table);
    }
     @DeleteMapping("delete")
    public String delete(@RequestBody Table table) {
    return tableservice.delete(table.getDay(), table.getTime());
}
}
