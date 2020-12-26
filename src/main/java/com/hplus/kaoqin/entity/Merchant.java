package com.hplus.kaoqin.entity;


import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("kq_merchant")
public class Merchant {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private String id;
    private String merchantName;
    @TableField(value = "is_deleted")
    @TableLogic
    private Boolean deleted;
    private String createTime;
    private String pwd;
    private String level;
    private String phone;
    private String roleName;
}
