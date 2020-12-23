package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hplus.kaoqin.entity.Employee;

public interface EmployeeService extends IService<Employee> {

    /**
     * 员工录入信息
     */
    int insertEmployee(Employee employee);
}
