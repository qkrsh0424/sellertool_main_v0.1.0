package com.sellertl.sellertool_v1.model.entity.itemManager.marketCost;

import com.sellertl.sellertool_v1.model.entity.itemManager.ItemStoreEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemClassify.IClassifyPureEntity;
import com.sellertl.sellertool_v1.model.entity.itemManager.itemOption.IOptionPureEntity;

public interface MkcJClassifyJOptionJStoreProj {
    MkcPureEntity getMkc();
    IClassifyPureEntity getClassify();
    IOptionPureEntity getOption();
    ItemStoreEntity getStore();
}
