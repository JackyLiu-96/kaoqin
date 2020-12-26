package com.hplus.kaoqin.entity;


import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("kq_menu")
public class Menu {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ID_WORKER_STR)
    private String id;
    @TableField(exist = false)
    private String[] parent;
    @TableField(exist = false)
    private String[] children;
    private String menuName;
    private String icon;
    private String url;
    private String parentId;
    @TableField(value = "is_deleted")
    @TableLogic
    private Boolean deleted;
}
