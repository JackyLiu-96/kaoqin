package com.hplus.kaoqin.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author LiuJiang
 * @date 2020/12/24 15:47
 */
public class DateUtil {

    /**
     * 时间字符串转时间
     *
     * @param str
     * @return
     */
    public static Date StrToDate(String str) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = format.parse(str);
        } catch (Exception e) {
            date = new Date();
        }
        return date;
    }


}
