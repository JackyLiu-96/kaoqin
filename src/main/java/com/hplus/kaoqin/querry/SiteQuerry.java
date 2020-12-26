package com.hplus.kaoqin.querry;

import lombok.Data;

import java.io.Serializable;

/**
 * @author LiuJiang
 * @date 2020/12/25 11:26
 */
@Data
public class SiteQuerry implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    private String siteName;

    private String siteStatus;
}
