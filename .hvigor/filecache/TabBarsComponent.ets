/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { initTabBarData } from '../viewmodel/InitialData';
import {
  LAYOUT_WIDTH_OR_HEIGHT,
  NORMAL_FONT_SIZE,
  BIGGER_FONT_SIZE,
  MAX_OFFSET_Y,
  REFRESH_TIME,
  GOODS_EVALUATE_FONT_SIZE,
  MAX_LINES_TEXT
} from '../common/CommonConstants';
import PutDownRefresh from './PutDownRefreshLayout';
import WaterfallGoods from './WaterfallGoodsComponent';
import CategoryGoodsWaterfall from './WaterfallGoodsCategory';
import SearchAndFilterBar from './SearchAndFilterBar';
import AdvancedListDataSource from '../viewmodel/AdvancedListDataSource';
import { categories } from '../viewmodel/GoodsRepository';
import { Subcategory } from '../models/Category';

@Component
export default struct TabBar {
  private currentOffsetY: number = 0;
  private timer: number = 0;
  @State tabsIndex: number = 0;
  @State refreshStatus: boolean = false; // 是否正在刷新
  @State refreshingTabIndex: number = -1;
  @State refreshText: Resource = $r('app.string.refresh_text');
  // 高级数据源通过 @Provide 共享给子组件（@Consume 接收）
  // 独立的精选数据源与分类数据源，互不影响
  @Provide homeDS: AdvancedListDataSource = new AdvancedListDataSource();
  @Provide categoryDS: AdvancedListDataSource = new AdvancedListDataSource();
  // 当前选中的子类（每个类目对应一组子类）
  @State selectedSubcategoryId: string = '';
  // 下拉是否达到触发阈值
  private canTriggerRefresh: boolean = false;

  @Builder
  firstTabBar() {
    Column() {
      Text($r('app.string.selected'))
        .fontSize(this.tabsIndex === 0 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE)
        .fontColor(this.tabsIndex === 0 ? Color.Black : $r('app.color.gray'))
        .maxLines(MAX_LINES_TEXT)
        .minFontSize(this.tabsIndex === 0 ? NORMAL_FONT_SIZE : GOODS_EVALUATE_FONT_SIZE)
        .maxFontSize(this.tabsIndex === 0 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE)
    }
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .height(LAYOUT_WIDTH_OR_HEIGHT)
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  otherTabBar(content: Resource, index: number) {
    Column() {
      Text(content)
        .fontSize(this.tabsIndex === index + 1 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE)
        .fontColor(this.tabsIndex === index + 1 ? Color.Black : $r('app.color.gray'))
        .maxLines(MAX_LINES_TEXT)
        .minFontSize(this.tabsIndex === index + 1 ? NORMAL_FONT_SIZE : GOODS_EVALUATE_FONT_SIZE)
        .maxFontSize(this.tabsIndex === index + 1 ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE)
    }
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .height(LAYOUT_WIDTH_OR_HEIGHT)
    .justifyContent(FlexAlign.Center)
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

  @Builder
  loadMoreFooter(ds: AdvancedListDataSource) {
    Column() {
      if (ds.hasMore) {
        // 用一个极小的“哨兵”触发加载更多（进入可视区域时触发）
        Row() {}
          .width('100%')
          .height(1)
          .onAppear(() => {
            ds.loadMore();
          })
      } else {
        Text($r('app.string.to_bottom'))
          .fontSize(NORMAL_FONT_SIZE)
          .fontColor($r('app.color.gray'))
          .width('100%')
          .textAlign(TextAlign.Center)
      }
    }
    .width('100%')
    .padding(ds.hasMore ? { top: 0, bottom: 0 } : { top: 8, bottom: 16 })
  }

  build() {
    Tabs() {
      TabContent() {
        // 首个 Tab：展示首页瀑布流 + 搜索筛选
        Scroll() {
          Column() {
            if (this.refreshStatus && this.refreshingTabIndex === 0) {
              PutDownRefresh({ refreshText: $refreshText })
            }
            // 搜索与筛选栏（关键词、排序与多重过滤）
            SearchAndFilterBar()
            // 瀑布流商品浏览（高矮图共存）
            WaterfallGoods()
            // 触底加载更多 / 无更多提示
            this.loadMoreFooter(this.homeDS)
          }
          .width(LAYOUT_WIDTH_OR_HEIGHT)
          .padding({ top: 0 })
          .justifyContent(FlexAlign.Start)
          .alignItems(HorizontalAlign.Start)
        }
        .scrollBar(BarState.Off)
        .edgeEffect(EdgeEffect.Spring)
        .width(LAYOUT_WIDTH_OR_HEIGHT)
        // 让内容自然从顶部开始，而不是强占满高导致视觉上下居中
        // .height(LAYOUT_WIDTH_OR_HEIGHT)
        .onTouch((event?: TouchEvent) => {
          // 下拉刷新
          this.putDownRefresh(event);
        })
      }
      .tabBar(this.firstTabBar)

      // 其它分类 Tab：三步内找到目标品类（点 Tab → 看子类 → 浏览商品）
      ForEach(initTabBarData, (item: Resource, index?: number) => {
        TabContent() {
          // 分类页使用 Scroll，支持下拉刷新与上拉加载更多
          Scroll() {
            Column() {
              // 子类列表（第二步：看子类）
              Row() {
                ForEach((index !== undefined && categories[index] !== undefined) ? (categories[index].children ?? []) : [], (sub: Subcategory) => {
                  Button((this.selectedSubcategoryId === sub.id) ? `✓ ${sub.name}` : sub.name)
                    .type((this.selectedSubcategoryId === sub.id) ? ButtonType.Capsule : ButtonType.Normal)
                    .onClick(() => {
                      // 设置分类与子类条件（第三步：进列表/瀑布流浏览）
                      this.selectedSubcategoryId = sub.id;
                      const catId: string = (index !== undefined && categories[index] !== undefined) ? (categories[index].id) : '';
                      this.categoryDS.setCategory(catId, sub.id);
                    })
                    .margin({ right: 8, bottom: 8 })
                })
              }
              .width(LAYOUT_WIDTH_OR_HEIGHT)
              .padding({ left: 12, right: 12, top: 0 })

              // 下拉刷新提示
              if (this.refreshStatus && this.refreshingTabIndex === (index !== undefined ? index + 1 : -1)) {
                PutDownRefresh({ refreshText: $refreshText })
              }
              // 商品浏览区域：复用瀑布流组件显示筛选结果（分类专用）
              CategoryGoodsWaterfall()
              // 触底加载更多 / 无更多提示
              this.loadMoreFooter(this.categoryDS)
            }
            .width(LAYOUT_WIDTH_OR_HEIGHT)
            .padding({ top: 0 })
            .justifyContent(FlexAlign.Start)
            .alignItems(HorizontalAlign.Start)
          }
          .scrollBar(BarState.Off)
          .edgeEffect(EdgeEffect.Spring)
          .width(LAYOUT_WIDTH_OR_HEIGHT)
          // 让内容自然从顶部开始，而不是强占满高导致视觉上下居中
          // .height(LAYOUT_WIDTH_OR_HEIGHT)
          .onTouch((event?: TouchEvent) => {
            // 下拉刷新
            this.putDownRefresh(event);
          })
          // Scroll 不支持 justifyContent，这里移除并保持尺寸设置在前文
        }
        .tabBar(this.otherTabBar(item, index !== undefined ? index : 0))
      })
    }
    .onChange((index: number) => {
      // 记录当前 Tab 索引
      this.tabsIndex = index;
      // 当切换到分类 Tab 时，默认按该类目过滤；首个 Tab 恢复全部
      if (index === 0) {
        this.selectedSubcategoryId = '';
        this.homeDS.reset();
      } else {
        const catIdx: number = index - 1; // categories 与 initTabBarData 顺序一致
        if (catIdx >= 0 && catIdx < categories.length) {
          this.selectedSubcategoryId = '';
          this.categoryDS.setCategory(categories[catIdx].id, undefined);
        }
      }
    })
    .vertical(false)
  }
}
