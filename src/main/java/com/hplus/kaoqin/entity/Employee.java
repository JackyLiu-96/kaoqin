package com.hplus.kaoqin.entity;


import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("kq_employee")
@AllArgsConstructor
@NoArgsConstructor
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private String id;
    private String merchantId;//商户编号
    private String merchantName;//商户名称
    private Date createTime;//创建时间
    private String startTime;//开始时间
    private String endTime;//结束时间
    private Double workHour;//工时
    private String name;//名字
    private String shiftId;//班次id
    private String shiftName;//班次
    @TableField(value = "is_deleted")
    @TableLogic
    private Boolean deleted;

}
