package com.hplus.kaoqin.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.hplus.kaoqin.common.vo.R;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.querry.MerchantQuery;
import com.hplus.kaoqin.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author LiuJiang
 * @date 2020/12/24 9:25
 */
@RestController
@RequestMapping("/kq/merchant")
public class MerchantController {

    @Autowired
    private MerchantService merchantService;

    public static final String IS_NOT_DELETE="0";

    @GetMapping("/list")
    public R list() {
        List<Merchant> merchants = merchantService.list(null);
        return R.ok().data("merchants", merchants);
    }

    @PostMapping("/save")
    public R saveMerchant(@RequestParam(value = "id",required = false) String id,
                          @RequestParam(value = "merchantName") String merchantName,
                          @RequestParam(value = "roleName") String roleName,
                          @RequestParam(value = "level") String level,
                          @RequestParam(value = "phone") String phone){
        Merchant merchant = new Merchant();
//        merchant.setId("M"+new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
        merchant.setCreateTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        merchant.setDeleted(false);
        merchant.setMerchantName(merchantName);
        merchant.setLevel(level);
        merchant.setRoleName(roleName);
        merchant.setPhone(phone);
        if (id=="" || id==null){
            int flag = merchantService.insertMerchant(merchant);
            if (flag==1){
                return R.ok().message("新增成功");
            }else {
                return R.error().message("新增失败");
            }
        }else {
            merchant.setId(id);
            int flag = merchantService.updateMerchantById(merchant);
            if (flag==1){
                return R.ok().message("修改成功");
            }else {
                return R.error().message("修改失败");
            }
        }
    }

    @PostMapping("/delete/{id}")
    public R deleteById(@PathVariable(name = "id",required = true) String id){
        boolean flag = merchantService.removeById(id);
        if (flag==true){
            return R.ok().message("删除成功");
        }else {
            return R.error().message("删除失败");
        }
    }

    @GetMapping(value = "{id}")
    public R getById(@PathVariable(value = "id",required = true) String id){
        Merchant merchant = merchantService.getById(id);
        return R.ok().data("merchant",merchant);
    }

    @GetMapping("/selectList")
    public R selectList(@RequestParam(value = "id") String id,
                        @RequestParam(value = "merchantName") String merchantName,
                        @RequestParam(value = "roleName") String roleName,
                        @RequestParam(value = "level") String level,
                        @RequestParam(value = "phone") String phone){
        QueryWrapper<Merchant> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByAsc("id");
        MerchantQuery merchantQuery = new MerchantQuery();
        merchantQuery.setId(id);
        merchantQuery.setMerchantName(merchantName);
        merchantQuery.setRoleName(roleName);
        merchantQuery.setLevel(level);
        merchantQuery.setPhone(phone);
        List<Merchant> merchantList = merchantService.selectCondition(queryWrapper, merchantQuery);
        return R.ok().data("merchantList",merchantList);
    }
}
