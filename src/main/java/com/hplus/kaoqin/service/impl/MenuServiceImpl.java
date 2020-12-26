package com.hplus.kaoqin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hplus.kaoqin.entity.Menu;
import com.hplus.kaoqin.entity.Shift;
import com.hplus.kaoqin.mapper.MenuMapper;
import com.hplus.kaoqin.mapper.ShiftMapper;
import com.hplus.kaoqin.service.MenuService;
import com.hplus.kaoqin.service.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * @author LiuJiang
 * @date 2020/12/24 9:29
 */
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements MenuService {

}
