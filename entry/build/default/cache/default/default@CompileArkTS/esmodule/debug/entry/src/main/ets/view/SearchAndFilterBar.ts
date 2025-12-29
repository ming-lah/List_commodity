if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchAndFilterBar_Params {
    homeDS?: AdvancedListDataSource;
    keyword?: string;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}
import type AdvancedListDataSource from '../viewmodel/AdvancedListDataSource';
import { SortBy } from "@bundle:com.example.list_harmony/entry/ets/models/Goods";
import * as commonConst from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
export default class SearchAndFilterBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__homeDS = this.initializeConsume("homeDS", "homeDS");
        this.__keyword = new ObservedPropertySimplePU('', this, "keyword");
        this.__minPrice = new ObservedPropertyObjectPU(undefined, this, "minPrice");
        this.__maxPrice = new ObservedPropertyObjectPU(undefined, this, "maxPrice");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchAndFilterBar_Params) {
        if (params.keyword !== undefined) {
            this.keyword = params.keyword;
        }
        if (params.minPrice !== undefined) {
            this.minPrice = params.minPrice;
        }
        if (params.maxPrice !== undefined) {
            this.maxPrice = params.maxPrice;
        }
    }
    updateStateVars(params: SearchAndFilterBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__homeDS.purgeDependencyOnElmtId(rmElmtId);
        this.__keyword.purgeDependencyOnElmtId(rmElmtId);
        this.__minPrice.purgeDependencyOnElmtId(rmElmtId);
        this.__maxPrice.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__homeDS.aboutToBeDeleted();
        this.__keyword.aboutToBeDeleted();
        this.__minPrice.aboutToBeDeleted();
        this.__maxPrice.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 精选页的独立数据源，避免影响其它分类页
    private __homeDS: ObservedPropertyAbstractPU<AdvancedListDataSource>;
    get homeDS() {
        return this.__homeDS.get();
    }
    set homeDS(newValue: AdvancedListDataSource) {
        this.__homeDS.set(newValue);
    }
    // 本地输入状态（需提供默认值）
    private __keyword: ObservedPropertySimplePU<string>;
    get keyword() {
        return this.__keyword.get();
    }
    set keyword(newValue: string) {
        this.__keyword.set(newValue);
    }
    private __minPrice: ObservedPropertyObjectPU<number | undefined>;
    get minPrice() {
        return this.__minPrice.get();
    }
    set minPrice(newValue: number | undefined) {
        this.__minPrice.set(newValue);
    }
    private __maxPrice: ObservedPropertyObjectPU<number | undefined>;
    get maxPrice() {
        return this.__maxPrice.get();
    }
    set maxPrice(newValue: number | undefined) {
        this.__maxPrice.set(newValue);
    }
    // 移除标签过滤，仅保留关键词与价格相关筛选
    private applyAll() {
        this.homeDS.setKeywordAndPriceRange(this.keyword, this.minPrice, this.maxPrice);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 8, bottom: 8 });
            Column.backgroundColor({ "id": 16777240, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 搜索框
            Row.create();
            // 搜索框
            Row.width(commonConst.GOODS_LIST_WIDTH);
            // 搜索框
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ArkTS 当前不支持 TextInput 的 placeholder 属性，移除以保证编译
            TextInput.create();
            // ArkTS 当前不支持 TextInput 的 placeholder 属性，移除以保证编译
            TextInput.width('75%');
            // ArkTS 当前不支持 TextInput 的 placeholder 属性，移除以保证编译
            TextInput.height(40);
            // ArkTS 当前不支持 TextInput 的 placeholder 属性，移除以保证编译
            TextInput.onChange((value: string) => { this.keyword = value; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('搜索');
            Button.type(ButtonType.Normal);
            Button.width('22%');
            Button.height(40);
            Button.onClick(() => this.homeDS.setKeyword(this.keyword));
        }, Button);
        Button.pop();
        // 搜索框
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 排序按钮
            Row.create();
            // 排序按钮
            Row.width(commonConst.GOODS_LIST_WIDTH);
            // 排序按钮
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('价格↑');
            Button.onClick(() => this.homeDS.setSort(SortBy.PriceAsc));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('价格↓');
            Button.onClick(() => this.homeDS.setSort(SortBy.PriceDesc));
            Button.margin({ left: 8 });
        }, Button);
        Button.pop();
        // 排序按钮
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 价格区间 + 应用按钮
            Row.create();
            // 价格区间 + 应用按钮
            Row.width(commonConst.GOODS_LIST_WIDTH);
            // 价格区间 + 应用按钮
            Row.margin({ bottom: 8 });
            // 价格区间 + 应用按钮
            Row.width(commonConst.GOODS_LIST_WIDTH);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('价格区间:');
            Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.minPrice === undefined ? '' : String(this.minPrice) });
            TextInput.width(80);
            TextInput.onChange((v: string) => {
                const n: number = Number(v);
                this.minPrice = isNaN(n) ? undefined : n;
            });
            TextInput.margin({ left: 8 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.maxPrice === undefined ? '' : String(this.maxPrice) });
            TextInput.width(80);
            TextInput.onChange((v: string) => {
                const n: number = Number(v);
                this.maxPrice = isNaN(n) ? undefined : n;
            });
            TextInput.margin({ left: 8 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('应用');
            Button.onClick(() => this.applyAll());
            Button.margin({ left: 12 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置');
            Button.onClick(() => {
                this.keyword = '';
                this.minPrice = undefined;
                this.maxPrice = undefined;
                this.homeDS.reset();
            });
            Button.margin({ left: 8 });
        }, Button);
        Button.pop();
        // 价格区间 + 应用按钮
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
