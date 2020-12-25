package com.hplus.kaoqin.querry;

import lombok.Data;

import java.io.Serializable;

/**
 * @author LiuJiang
 * @date 2020/12/25 11:26
 */
@Data
public class EmployeeQuerry implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    private String name;

    private String merchantName;

    private String shiftName;

    private String startTime;

    private String endTime;

}