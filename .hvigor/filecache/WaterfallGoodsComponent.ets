/*
 * 瀑布流商品组件：首页展示缩略图、关键词介绍，高矮图共存
 * 使用 Grid 双列模拟瀑布流效果（ArkUI 兼容性更好）
 * 中文注释，ArkTS 代码规范
 */

import { Goods } from '../models/Goods';
import AdvancedListDataSource from '../viewmodel/AdvancedListDataSource';
import * as commonConst from '../common/CommonConstants';

@Component
export default struct WaterfallGoods {
  // 精选页使用的数据源（与分类页隔离）
  @Consume homeDS: AdvancedListDataSource;

  // 单个商品卡片
  @Builder
  GoodsCard(item: Goods) {
    Column() {
      // 缩略图（使用不同高度模拟瀑布流高矮图）
      Image(item.image)
        .width('100%')
        .height(item.imageHeight)
        .objectFit(ImageFit.Cover)
        .draggable(false)

      // 名称与关键词/广告语
      Text(item.name)
        .fontSize(commonConst.NORMAL_FONT_SIZE)
        .fontColor(Color.Black)
        .maxLines(1)
        .margin({ top: 6 })
      if (item.advertisingText) {
        Text(item.advertisingText)
          .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
          .fontColor($r('app.color.gray'))
          .maxLines(1)
      }

      // 价格
      Text(`¥${item.price}`)
        .fontColor($r('app.color.freshRed'))
        .fontSize(commonConst.NORMAL_FONT_SIZE)
        .margin({ top: 4 })
    }
    .width('100%')
    .padding(8)
    .backgroundColor(Color.White)
    .borderRadius(8)
  }

  build() {
    const goods: Goods[] = this.homeDS.getGoods();
    const leftColumnGoods: Goods[] = [];
    const rightColumnGoods: Goods[] = [];
    for (let i = 0; i < goods.length; i++) {
      if (i % 2 === 0) {
        leftColumnGoods.push(goods[i]);
      } else {
        rightColumnGoods.push(goods[i]);
      }
    }

    // Masonry 模拟：左右两列各自独立堆叠，避免 wrap 造成行高撑开后的空白
    Row() {
      // 左列：偶数索引
      Column() {
        ForEach(leftColumnGoods, (g: Goods) => {
          Column() {
            this.GoodsCard(g)
          }
          .width('100%')
          .margin({ bottom: 12 })
        }, (g: Goods) => g.id.toString())
      }
      .width('50%')

      // 右列：奇数索引
      Column() {
        ForEach(rightColumnGoods, (g: Goods) => {
          Column() {
            this.GoodsCard(g)
          }
          .width('100%')
          .margin({ bottom: 12 })
        }, (g: Goods) => g.id.toString())
      }
      .width('50%')
    }
    .alignItems(VerticalAlign.Top)
    .width('100%')
  }
}
