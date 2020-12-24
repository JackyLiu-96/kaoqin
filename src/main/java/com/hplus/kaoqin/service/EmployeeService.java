package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.hplus.kaoqin.entity.Employee;

import java.util.List;
import java.util.Map;

public interface EmployeeService extends IService<Employee> {

    /**
     * 员工录入信息
     */
    int insertEmployee(Employee employee);

    int updateEmployee(Employee employee);

//    Map<String, Object> pageListWeb(Page<Employee> pageParam);
}
