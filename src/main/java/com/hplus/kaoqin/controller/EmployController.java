package com.hplus.kaoqin.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hplus.kaoqin.common.vo.R;
import com.hplus.kaoqin.entity.Employee;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.entity.Shift;
import com.hplus.kaoqin.querry.EmployeeQuerry;
import com.hplus.kaoqin.service.EmployeeService;
import com.hplus.kaoqin.service.MerchantService;
import com.hplus.kaoqin.service.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author LiuJiang
 * @date 2020/12/24 9:46
 */
@RestController
@RequestMapping("/kq/employee")
public class EmployController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private MerchantService merchantService;
    @Autowired
    private ShiftService shiftService;

    @PostMapping("/insertEmployee")
    public R insertEmployee(@RequestParam(value = "id") String id,
                            @RequestParam(value = "merchantName") String merchantName,
                            @RequestParam(value = "name") String name,
                            @RequestParam(value = "shiftName") String shiftName,
                            @RequestParam(value = "startTime") String startTime,
                            @RequestParam(value = "endTime") String endTime,
                            @RequestParam(value = "workHour") String workHour) {
        Employee employee = new Employee();
        //查对应的供应商
        Map<String, Object> marchantMap = new HashMap<>();
        marchantMap.put("merchant_name", merchantName);
        List<Merchant> merchants = merchantService.selectByMap(marchantMap);
        if (merchants != null && merchants.size() > 0) {
            employee.setMerchantId(merchants.get(0).getId());
        }
        //查对应的班次
        Map<String, Object> shiftMap = new HashMap<>();
        shiftMap.put("shift_name", shiftName);
        List<Shift> shifts = shiftService.selectByMap(shiftMap);
        if (shifts != null && shifts.size() > 0) {
            employee.setShiftId(shifts.get(0).getId());
        }
        employee.setCreateTime(new Date());
        employee.setMerchantName(merchantName);
        employee.setStartTime(startTime);
        employee.setEndTime(endTime);
        employee.setWorkHour(Double.parseDouble(workHour));
        employee.setName(name);
        employee.setShiftName(shiftName);
        employee.setDeleted(false);
        if (id == "") {
            int flag = employeeService.insertEmployee(employee);
            if (flag == 1) {
                return R.ok().message("新增成功");
            } else {
                return R.error().message("新增失败");
            }
        } else {
            employee.setId(id);
            int flag = employeeService.updateEmployee(employee);
            if (flag == 1) {
                return R.ok().message("修改成功");
            } else {
                return R.error().message("修改失败");
            }
        }
    }

    @GetMapping("/selectList")
    public R selectList(@RequestParam(value = "id") String id,
                        @RequestParam(value = "merchantName") String merchantName,
                        @RequestParam(value = "name") String name,
                        @RequestParam(value = "shiftName") String shiftName,
                        @RequestParam(value = "startTime") String startTime,
                        @RequestParam(value = "endTime") String endTime) {
        QueryWrapper<Employee> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByAsc("id");
        EmployeeQuerry employeeQuerry = new EmployeeQuerry();
        employeeQuerry.setId(id);
        employeeQuerry.setName(name);
        employeeQuerry.setMerchantName(merchantName);
        employeeQuerry.setShiftName(shiftName);
        employeeQuerry.setStartTime(startTime);
        employeeQuerry.setEndTime(endTime);
        List<Employee> employees = employeeService.selectQuery(queryWrapper, employeeQuerry);
        return R.ok().data("employees", employees);
    }

    @GetMapping("/list")
    public R list() {
        List<Employee> employees = employeeService.list(null);
        return R.ok().data("employees", employees);
    }

    @GetMapping(value = "{id}")
    public R findById(@PathVariable(name = "id", required = true) String id) {
        Employee employee = employeeService.getById(id);

        return R.ok().data("employee", employee);
    }

    @PostMapping("/delete/{id}")
    public R deleteById(@PathVariable String id) {
        Boolean flag = employeeService.removeById(id);
        if (flag == true) {
            return R.ok().message("删除成功");
        } else {
            return R.error().message("删除失败");
        }
    }

//    @PostMapping("/test")
//    public R test1(){
//        String a ="48.5";
//
//    }
public static void main(String[] args) {
    String a ="48.5";
    System.out.println(Double.parseDouble(a));
}
}
