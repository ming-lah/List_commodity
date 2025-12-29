if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabBar_Params {
    currentOffsetY?: number;
    timer?: number;
    tabsIndex?: number;
    refreshStatus?: boolean;
    refreshingTabIndex?: number;
    refreshText?: Resource;
    homeDS?: AdvancedListDataSource;
    categoryDS?: AdvancedListDataSource;
    selectedSubcategoryId?: string;
    canTriggerRefresh?: boolean;
}
import { initTabBarData } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import { LAYOUT_WIDTH_OR_HEIGHT, NORMAL_FONT_SIZE, BIGGER_FONT_SIZE, MAX_OFFSET_Y, REFRESH_TIME, GOODS_EVALUATE_FONT_SIZE, MAX_LINES_TEXT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import PutDownRefresh from "@bundle:com.example.list_harmony/entry/ets/view/PutDownRefreshLayout";
import WaterfallGoods from "@bundle:com.example.list_harmony/entry/ets/view/WaterfallGoodsComponent";
import CategoryGoodsWaterfall from "@bundle:com.example.list_harmony/entry/ets/view/WaterfallGoodsCategory";
import SearchAndFilterBar from "@bundle:com.example.list_harmony/entry/ets/view/SearchAndFilterBar";
import AdvancedListDataSource from "@bundle:com.example.list_harmony/entry/ets/viewmodel/AdvancedListDataSource";
import { categories } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/GoodsRepository";
import type { Subcategory } from '../models/Category';
export default class TabBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.currentOffsetY = 0;
        this.timer = 0;
        this.__tabsIndex = new ObservedPropertySimplePU(0, this, "tabsIndex");
        this.__refreshStatus = new ObservedPropertySimplePU(false, this, "refreshStatus");
        this.__refreshingTabIndex = new ObservedPropertySimplePU(-1, this, "refreshingTabIndex");
        this.__refreshText = new ObservedPropertyObjectPU({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, this, "refreshText");
        this.__homeDS = new ObservedPropertyObjectPU(new AdvancedListDataSource(), this, "homeDS");
        this.addProvidedVar("homeDS", this.__homeDS, false);
        this.__categoryDS = new ObservedPropertyObjectPU(new AdvancedListDataSource(), this, "categoryDS");
        this.addProvidedVar("categoryDS", this.__categoryDS, false);
        this.__selectedSubcategoryId = new ObservedPropertySimplePU('', this, "selectedSubcategoryId");
        this.canTriggerRefresh = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabBar_Params) {
        if (params.currentOffsetY !== undefined) {
            this.currentOffsetY = params.currentOffsetY;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.tabsIndex !== undefined) {
            this.tabsIndex = params.tabsIndex;
        }
        if (params.refreshStatus !== undefined) {
            this.refreshStatus = params.refreshStatus;
        }
        if (params.refreshingTabIndex !== undefined) {
            this.refreshingTabIndex = params.refreshingTabIndex;
        }
        if (params.refreshText !== undefined) {
            this.refreshText = params.refreshText;
        }
        if (params.homeDS !== undefined) {
            this.homeDS = params.homeDS;
        }
        if (params.categoryDS !== undefined) {
            this.categoryDS = params.categoryDS;
        }
        if (params.selectedSubcategoryId !== undefined) {
            this.selectedSubcategoryId = params.selectedSubcategoryId;
        }
        if (params.canTriggerRefresh !== undefined) {
            this.canTriggerRefresh = params.canTriggerRefresh;
        }
    }
    updateStateVars(params: TabBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabsIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshingTabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshText.purgeDependencyOnElmtId(rmElmtId);
        this.__homeDS.purgeDependencyOnElmtId(rmElmtId);
        this.__categoryDS.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedSubcategoryId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabsIndex.aboutToBeDeleted();
        this.__refreshStatus.aboutToBeDeleted();
        this.__refreshingTabIndex.aboutToBeDeleted();
        this.__refreshText.aboutToBeDeleted();
        this.__homeDS.aboutToBeDeleted();
        this.__categoryDS.aboutToBeDeleted();
        this.__selectedSubcategoryId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private currentOffsetY: number;
    private timer: number;
    private __tabsIndex: ObservedPropertySimplePU<number>;
    get tabsIndex() {
        return this.__tabsIndex.get();
    }
    set tabsIndex(newValue: number) {
        this.__tabsIndex.set(newValue);
    }
    private __refreshStatus: ObservedPropertySimplePU<boolean>; // 是否正在刷新
    get refreshStatus() {
        return this.__refreshStatus.get();
    }
    set refreshStatus(newValue: boolean) {
        this.__refreshStatus.set(newValue);
    }
    private __refreshingTabIndex: ObservedPropertySimplePU<number>;
    get refreshingTabIndex() {
        return this.__refreshingTabIndex.get();
    }
    set refreshingTabIndex(newValue: number) {
        this.__refreshingTabIndex.set(newValue);
    }
    private __refreshText: ObservedPropertyObjectPU<Resource>;
    get refreshText() {
        return this.__refreshText.get();
    }
    set refreshText(newValue: Resource) {
        this.__refreshText.set(newValue);
    }
    // 高级数据源通过 @Provide 共享给子组件（@Consume 接收）
    // 独立的精选数据源与分类数据源，互不影响
    private __homeDS: ObservedPropertyObjectPU<AdvancedListDataSource>;
    get homeDS() {
        return this.__homeDS.get();
    }
    set homeDS(newValue: AdvancedListDataSource) {
        this.__homeDS.set(newValue);
    }
    private __categoryDS: ObservedPropertyObjectPU<AdvancedListDataSource>;
    get categoryDS() {
        return this.__categoryDS.get();
    }
    set categoryDS(newValue: AdvancedListDataSource) {
        this.__categoryDS.set(newValue);
    }
    // 当前选中的子类（每个类目对应一组子类）
    private __selectedSubcategoryId: ObservedPropertySimplePU<string>;
    get selectedSubcategoryId() {
        return this.__selectedSubcategoryId.get();
    }
    set selectedSubcategoryId(newValue: string) {
        this.__selectedSubcategoryId.set(newValue);
    }
    // 下拉是否达到触发阈值
    private canTriggerRefresh: boolean;
    firstTabBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.height(LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(this.tabsIndex === 0 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE);
            Text.fontColor(this.tabsIndex === 0 ? Color.Black : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.maxLines(MAX_LINES_TEXT);
            Text.minFontSize(this.tabsIndex === 0 ? NORMAL_FONT_SIZE : GOODS_EVALUATE_FONT_SIZE);
            Text.maxFontSize(this.tabsIndex === 0 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE);
        }, Text);
        Text.pop();
        Column.pop();
    }
    otherTabBar(content: Resource, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.height(LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(content);
            Text.fontSize(this.tabsIndex === index + 1 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE);
            Text.fontColor(this.tabsIndex === index + 1 ? Color.Black : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.maxLines(MAX_LINES_TEXT);
            Text.minFontSize(this.tabsIndex === index + 1 ? NORMAL_FONT_SIZE : GOODS_EVALUATE_FONT_SIZE);
            Text.maxFontSize(this.tabsIndex === index + 1 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE);
        }, Text);
        Text.pop();
        Column.pop();
    }
    putDownRefresh(event?: TouchEvent): void {
        if (event === undefined) {
            return;
        }
        switch (event.type) {
            // Record the y-coordinate pressed by the finger.
            case TouchType.Down:
                this.currentOffsetY = event.touches[0].y;
                this.canTriggerRefresh = false;
                break;
            case TouchType.Move:
                // Determine whether to refresh based on the drop-down offset.
                if (!this.refreshStatus) {
                    this.canTriggerRefresh = event.touches[0].y - this.currentOffsetY > MAX_OFFSET_Y;
                }
                break;
            case TouchType.Cancel:
                this.canTriggerRefresh = false;
                break;
            case TouchType.Up:
                // 达到阈值才触发刷新
                if (this.canTriggerRefresh && !this.refreshStatus) {
                    this.refreshingTabIndex = this.tabsIndex;
                    this.refreshStatus = true;
                    // 触发数据刷新：保持当前筛选条件，仅重置分页/重新加载
                    const ds: AdvancedListDataSource = (this.tabsIndex === 0) ? this.homeDS : this.categoryDS;
                    ds.refresh();
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.refreshStatus = false;
                        this.refreshingTabIndex = -1;
                    }, REFRESH_TIME);
                }
                this.canTriggerRefresh = false;
                break;
            default:
                break;
        }
    }
    aboutToDisappear() {
        clearTimeout(this.timer);
    }
    loadMoreFooter(ds: AdvancedListDataSource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(ds.hasMore ? { top: 0, bottom: 0 } : { top: 8, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (ds.hasMore) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 用一个极小的“哨兵”触发加载更多（进入可视区域时触发）
                        Row.create();
                        // 用一个极小的“哨兵”触发加载更多（进入可视区域时触发）
                        Row.width('100%');
                        // 用一个极小的“哨兵”触发加载更多（进入可视区域时触发）
                        Row.height(1);
                        // 用一个极小的“哨兵”触发加载更多（进入可视区域时触发）
                        Row.onAppear(() => {
                            ds.loadMore();
                        });
                    }, Row);
                    // 用一个极小的“哨兵”触发加载更多（进入可视区域时触发）
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                        Text.fontSize(NORMAL_FONT_SIZE);
                        Text.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                        Text.width('100%');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create();
            Tabs.onChange((index: number) => {
                // 记录当前 Tab 索引
                this.tabsIndex = index;
                // 当切换到分类 Tab 时，默认按该类目过滤；首个 Tab 恢复全部
                if (index === 0) {
                    this.selectedSubcategoryId = '';
                    this.homeDS.reset();
                }
                else {
                    const catIdx: number = index - 1; // categories 与 initTabBarData 顺序一致
                    if (catIdx >= 0 && catIdx < categories.length) {
                        this.selectedSubcategoryId = '';
                        this.categoryDS.setCategory(categories[catIdx].id, undefined);
                    }
                }
            });
            Tabs.vertical(false);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 首个 Tab：展示首页瀑布流 + 搜索筛选
                    Scroll.create();
                    // 首个 Tab：展示首页瀑布流 + 搜索筛选
                    Scroll.scrollBar(BarState.Off);
                    // 首个 Tab：展示首页瀑布流 + 搜索筛选
                    Scroll.edgeEffect(EdgeEffect.Spring);
                    // 首个 Tab：展示首页瀑布流 + 搜索筛选
                    Scroll.width(LAYOUT_WIDTH_OR_HEIGHT);
                    // 首个 Tab：展示首页瀑布流 + 搜索筛选
                    Scroll.onTouch((event?: TouchEvent) => {
                        // 下拉刷新
                        this.putDownRefresh(event);
                    });
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(LAYOUT_WIDTH_OR_HEIGHT);
                    Column.padding({ top: 0 });
                    Column.justifyContent(FlexAlign.Start);
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.refreshStatus && this.refreshingTabIndex === 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new PutDownRefresh(this, { refreshText: this.__refreshText }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 157, col: 15 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                refreshText: this.refreshText
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "PutDownRefresh" });
                            }
                        });
                    }
                    // 搜索与筛选栏（关键词、排序与多重过滤）
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // 搜索与筛选栏（关键词、排序与多重过滤）
                            SearchAndFilterBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 160, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "SearchAndFilterBar" });
                }
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // 瀑布流商品浏览（高矮图共存）
                            WaterfallGoods(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 162, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "WaterfallGoods" });
                }
                // 触底加载更多 / 无更多提示
                this.loadMoreFooter.bind(this)(ObservedObject.GetRawObject(this.homeDS));
                Column.pop();
                // 首个 Tab：展示首页瀑布流 + 搜索筛选
                Scroll.pop();
            });
            TabContent.tabBar({ builder: this.firstTabBar.bind(this) });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 其它分类 Tab：三步内找到目标品类（点 Tab → 看子类 → 浏览商品）
            ForEach.create();
            const forEachItemGenFunction = (_item, index?: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 分类页使用 Scroll，支持下拉刷新与上拉加载更多
                            Scroll.create();
                            // 分类页使用 Scroll，支持下拉刷新与上拉加载更多
                            Scroll.scrollBar(BarState.Off);
                            // 分类页使用 Scroll，支持下拉刷新与上拉加载更多
                            Scroll.edgeEffect(EdgeEffect.Spring);
                            // 分类页使用 Scroll，支持下拉刷新与上拉加载更多
                            Scroll.width(LAYOUT_WIDTH_OR_HEIGHT);
                            // 分类页使用 Scroll，支持下拉刷新与上拉加载更多
                            Scroll.onTouch((event?: TouchEvent) => {
                                // 下拉刷新
                                this.putDownRefresh(event);
                            });
                        }, Scroll);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
                            Column.padding({ top: 0 });
                            Column.justifyContent(FlexAlign.Start);
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 子类列表（第二步：看子类）
                            Row.create();
                            // 子类列表（第二步：看子类）
                            Row.width(LAYOUT_WIDTH_OR_HEIGHT);
                            // 子类列表（第二步：看子类）
                            Row.padding({ left: 12, right: 12, top: 0 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            ForEach.create();
                            const forEachItemGenFunction = _item => {
                                const sub = _item;
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Button.createWithLabel((this.selectedSubcategoryId === sub.id) ? `✓ ${sub.name}` : sub.name);
                                    Button.type((this.selectedSubcategoryId === sub.id) ? ButtonType.Capsule : ButtonType.Normal);
                                    Button.onClick(() => {
                                        // 设置分类与子类条件（第三步：进列表/瀑布流浏览）
                                        this.selectedSubcategoryId = sub.id;
                                        const catId: string = (index !== undefined && categories[index] !== undefined) ? (categories[index].id) : '';
                                        this.categoryDS.setCategory(catId, sub.id);
                                    });
                                    Button.margin({ right: 8, bottom: 8 });
                                }, Button);
                                Button.pop();
                            };
                            this.forEachUpdateFunction(elmtId, (index !== undefined && categories[index] !== undefined) ? (categories[index].children ?? []) : [], forEachItemGenFunction);
                        }, ForEach);
                        ForEach.pop();
                        // 子类列表（第二步：看子类）
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            // 下拉刷新提示
                            if (this.refreshStatus && this.refreshingTabIndex === (index !== undefined ? index + 1 : -1)) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new PutDownRefresh(this, { refreshText: this.__refreshText }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 208, col: 17 });
                                                ViewPU.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        refreshText: this.refreshText
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                        }, { name: "PutDownRefresh" });
                                    }
                                });
                            }
                            // 商品浏览区域：复用瀑布流组件显示筛选结果（分类专用）
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new 
                                    // 商品浏览区域：复用瀑布流组件显示筛选结果（分类专用）
                                    CategoryGoodsWaterfall(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 211, col: 15 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "CategoryGoodsWaterfall" });
                        }
                        // 触底加载更多 / 无更多提示
                        this.loadMoreFooter.bind(this)(ObservedObject.GetRawObject(this.categoryDS));
                        Column.pop();
                        // 分类页使用 Scroll，支持下拉刷新与上拉加载更多
                        Scroll.pop();
                    });
                    TabContent.tabBar({ builder: () => {
                            this.otherTabBar.call(this, item, index !== undefined ? index : 0);
                        } });
                }, TabContent);
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, initTabBarData, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        // 其它分类 Tab：三步内找到目标品类（点 Tab → 看子类 → 浏览商品）
        ForEach.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
