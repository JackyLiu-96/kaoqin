package com.hplus.kaoqin.querry;

import lombok.Data;

import java.io.Serializable;

/**
 * @Author Wangxiang
 * @Date 2020/12/26 22:55
 */

@Data
public class MerchantQuery implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String merchantName;
    private String roleName;
    private String level;
    private String phone;
}
