package com.hplus.kaoqin.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hplus.kaoqin.common.vo.R;
import com.hplus.kaoqin.entity.Employee;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.service.EmployeeService;
import com.hplus.kaoqin.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/insertEmployee")
    public R insertEmployee(@RequestParam(value = "id") String id,
                            @RequestParam(value = "merchantName") String merchantName,
                            @RequestParam(value = "name") String name,
                            @RequestParam(value = "shift") String shift,
                            @RequestParam(value = "startTime") String startTime,
                            @RequestParam(value = "endTime") String endTime,
                            @RequestParam(value = "workHour") String workHour) {

        Employee employee = new Employee();
        //查对应的供应商
        Map<String, Object> map = new HashMap<>();
        map.put("merchant_name", merchantName);
        List<Merchant> merchants = merchantService.selectByMap(map);
        if (merchants != null && merchants.size() > 0) {
            employee.setMerchantId(merchants.get(0).getId());
        }
        employee.setCreateTime(new Date());
        employee.setMerchantName(merchantName);
        employee.setStartTime(startTime);
        employee.setEndTime(endTime);
        employee.setWorkHour(Double.valueOf(workHour));
        employee.setName(name);
        employee.setShift(shift);
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

    @GetMapping("/list")
    public R list() {
        List<Employee> employees = employeeService.list(null);
        return R.ok().data("employees", employees);
    }

//    @GetMapping(value = "{page}/{limit}")
//    public R pageList(@PathVariable Long page, @PathVariable Long limit) {
//        Page<Employee> pageParam = new Page<Employee>(page, limit);
//        Map<String, Object> map = employeeService.pageListWeb(pageParam);
//        return R.ok().data(map);
//    }

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
}
