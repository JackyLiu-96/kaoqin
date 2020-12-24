package com.hplus.kaoqin.controller;

import com.hplus.kaoqin.common.vo.R;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/list")
    public R list() {
        List<Merchant> merchants = merchantService.getMerchantList();
        return R.ok().data("merchants", merchants);
    }
}
