package com.example.workload_back.Table;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "table")
public class Table {

    @Id
    private String Id;
    private String time;
    private String day; 
    private String subject;
    private String type;


}