package com.hplus.kaoqin.entity;


import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("kq_site")
public class Site {

    private static final long serialVersionUID = 1L;


    @TableId(value = "id", type = IdType.AUTO)
    private String id;
    private String siteName;
    private String siteStatus;
    @TableField(value = "is_deleted")
    @TableLogic
    private Boolean deleted;
}
