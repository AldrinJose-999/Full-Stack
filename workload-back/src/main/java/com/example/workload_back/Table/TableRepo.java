 package com.example.workload_back.Table;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
 public interface TableRepo extends MongoRepository<Table, String> {

    void deleteByDayAndTime(String day, String time);
     
 }