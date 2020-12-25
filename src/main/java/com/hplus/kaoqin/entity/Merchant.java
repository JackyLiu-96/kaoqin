package com.hplus.kaoqin.entity;


import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("kq_merchant")
public class Merchant {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ID_WORKER_STR)
    private String id;
    private String merchantName;
    @TableField(value = "is_deleted")
    @TableLogic
    private Boolean deleted;
}
