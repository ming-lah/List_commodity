if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WaterfallGoods_Params {
    homeDS?: AdvancedListDataSource;
}
import type { Goods } from '../models/Goods';
import type AdvancedListDataSource from '../viewmodel/AdvancedListDataSource';
import * as commonConst from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
export default class WaterfallGoods extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__homeDS = this.initializeConsume("homeDS", "homeDS");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WaterfallGoods_Params) {
    }
    updateStateVars(params: WaterfallGoods_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__homeDS.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__homeDS.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 精选页使用的数据源（与分类页隔离）
    private __homeDS: ObservedPropertyAbstractPU<AdvancedListDataSource>;
    get homeDS() {
        return this.__homeDS.get();
    }
    set homeDS(newValue: AdvancedListDataSource) {
        this.__homeDS.set(newValue);
    }
    // 单个商品卡片
    GoodsCard(item: Goods, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(8);
            Column.backgroundColor(Color.White);
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 缩略图（使用不同高度模拟瀑布流高矮图）
            Image.create(item.image);
            // 缩略图（使用不同高度模拟瀑布流高矮图）
            Image.width('100%');
            // 缩略图（使用不同高度模拟瀑布流高矮图）
            Image.height(item.imageHeight);
            // 缩略图（使用不同高度模拟瀑布流高矮图）
            Image.objectFit(ImageFit.Cover);
            // 缩略图（使用不同高度模拟瀑布流高矮图）
            Image.draggable(false);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 名称与关键词/广告语
            Text.create(item.name);
            // 名称与关键词/广告语
            Text.fontSize(commonConst.NORMAL_FONT_SIZE);
            // 名称与关键词/广告语
            Text.fontColor(Color.Black);
            // 名称与关键词/广告语
            Text.maxLines(1);
            // 名称与关键词/广告语
            Text.margin({ top: 6 });
        }, Text);
        // 名称与关键词/广告语
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (item.advertisingText) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(item.advertisingText);
                        Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
                        Text.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                        Text.maxLines(1);
                    }, Text);
                    Text.pop();
                });
            }
            // 价格
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 价格
            Text.create(`¥${item.price}`);
            // 价格
            Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            // 价格
            Text.fontSize(commonConst.NORMAL_FONT_SIZE);
            // 价格
            Text.margin({ top: 4 });
        }, Text);
        // 价格
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Masonry 模拟：左右两列各自独立堆叠，避免 wrap 造成行高撑开后的空白
            Row.create();
            // Masonry 模拟：左右两列各自独立堆叠，避免 wrap 造成行高撑开后的空白
            Row.alignItems(VerticalAlign.Top);
            // Masonry 模拟：左右两列各自独立堆叠，避免 wrap 造成行高撑开后的空白
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 左列：偶数索引
            Column.create();
            // 左列：偶数索引
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const g = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.margin({ bottom: 12 });
                }, Column);
                this.GoodsCard.bind(this)(g);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.homeDS.getLeftGoods(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 左列：偶数索引
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 右列：奇数索引
            Column.create();
            // 右列：奇数索引
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const g = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.margin({ bottom: 12 });
                }, Column);
                this.GoodsCard.bind(this)(g);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.homeDS.getRightGoods(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 右列：奇数索引
        Column.pop();
        // Masonry 模拟：左右两列各自独立堆叠，避免 wrap 造成行高撑开后的空白
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
