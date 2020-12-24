package com.hplus.kaoqin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hplus.kaoqin.entity.Employee;
import com.hplus.kaoqin.mapper.EmployeeMapper;
import com.hplus.kaoqin.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeServiceImpl extends ServiceImpl<EmployeeMapper, Employee> implements EmployeeService {

    @Autowired
    private EmployeeMapper employeeMapper;


    @Override
    public int insertEmployee(Employee employee) {
        return employeeMapper.insert(employee);
    }

    @Override
    public int updateEmployee(Employee employee) {
        return employeeMapper.updateById(employee);
    }

//    @Override
//    public Map<String, Object> pageListWeb(Page<Employee> pageParam) {
//
//        QueryWrapper<Employee> queryWrapper = new QueryWrapper<>();
//        queryWrapper.orderByAsc("sort");
//
//        baseMapper.selectPage(pageParam, queryWrapper);
//
//        List<Employee> records = pageParam.getRecords();
//        long current = pageParam.getCurrent();
//        long pages = pageParam.getPages();
//        long size = pageParam.getSize();
//        long total = pageParam.getTotal();
//        boolean hasNext = pageParam.hasNext();
//        boolean hasPrevious = pageParam.hasPrevious();
//
//        Map<String, Object> map = new HashMap<String, Object>();
//        map.put("items", records);
//        map.put("current", current);
//        map.put("pages", pages);
//        map.put("size", size);
//        map.put("total", total);
//        map.put("hasNext", hasNext);
//        map.put("hasPrevious", hasPrevious);
//
//        return map;
//    }

}
