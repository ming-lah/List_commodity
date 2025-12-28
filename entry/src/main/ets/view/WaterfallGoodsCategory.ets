/*
 * 分类页瀑布流组件：消费 categoryDS，与精选页筛选互不影响
 */

import { Goods } from '../models/Goods';
import AdvancedListDataSource from '../viewmodel/AdvancedListDataSource';
import * as commonConst from '../common/CommonConstants';

@Component
export default struct CategoryGoodsWaterfall {
  // 分类页使用的数据源
  @Consume categoryDS: AdvancedListDataSource;

  @Builder
  GoodsCard(item: Goods) {
    Column() {
      Image(item.image)
        .width('100%')
        .height(item.imageHeight)
        .objectFit(ImageFit.Cover)
        .draggable(false)
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
    const goods: Goods[] = this.categoryDS.getGoods();
    const leftColumnGoods: Goods[] = [];
    const rightColumnGoods: Goods[] = [];
    for (let i = 0; i < goods.length; i++) {
      if (i % 2 === 0) {
        leftColumnGoods.push(goods[i]);
      } else {
        rightColumnGoods.push(goods[i]);
      }
    }

    // Masonry 模拟：左右两列各自独立堆叠，避免 wrap 行高带来的空白
    Row() {
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
