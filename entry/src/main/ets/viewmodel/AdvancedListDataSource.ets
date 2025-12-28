/*
 * 高级数据源：支持搜索、分类、排序与多重筛选
 * 中文注释，ArkTS 代码规范
 */

import { Goods, FilterOptions, SortBy } from '../models/Goods';
import { getAllGoods } from './GoodsRepository';
import { MAX_DATA_LENGTH } from '../common/CommonConstants';

// 使用可观察类，在 UI 中以 @ObjectLink 传递以触发刷新
@Observed
export default class AdvancedListDataSource {
  // 全量商品数据（只读）
  allGoods: Goods[] = getAllGoods();

  // 当前筛选条件
  // 默认按价格升序排序
  filter: FilterOptions = { sortBy: SortBy.PriceAsc };

  // 筛选后的全量结果（不分页）
  filteredAllGoods: Goods[] = [];

  // 当前已加载（分页后）可展示的商品结果（被观察，修改会触发 UI 更新）
  filteredGoods: Goods[] = [];

  // 分页状态：是否还有更多、是否正在加载更多
  hasMore: boolean = false;
  loadingMore: boolean = false;

  // 每次加载的数量（越小越能体现“懒加载/分页”效果）
  private readonly pageSize: number = 8;

  constructor() {
    this.applyFilters(true);
  }

  // 对外访问
  getGoods(): Goods[] {
    return this.filteredGoods;
  }

  // 设置搜索关键词
  setKeyword(keyword?: string) {
    const kw: string | undefined = keyword?.trim();
    this.filter.keyword = (kw && kw.length > 0) ? kw : undefined;
    this.applyFilters(true);
  }

  // 设置分类与子类
  setCategory(categoryId?: string, subcategoryId?: string) {
    this.filter.categoryId = categoryId;
    this.filter.subcategoryId = subcategoryId;
    this.applyFilters(true);
  }

  // 设置价格区间
  setPriceRange(minPrice?: number, maxPrice?: number) {
    this.filter.minPrice = minPrice;
    this.filter.maxPrice = maxPrice;
    this.applyFilters(true);
  }

  // 批量设置：关键词 + 价格区间（避免多次重复 applyFilters）
  setKeywordAndPriceRange(keyword: string, minPrice?: number, maxPrice?: number) {
    const kw: string | undefined = keyword?.trim();
    this.filter.keyword = (kw && kw.length > 0) ? kw : undefined;
    this.filter.minPrice = minPrice;
    this.filter.maxPrice = maxPrice;
    this.applyFilters(true);
  }

  // 不再支持标签过滤，方法移除

  // 设置排序
  setSort(sortBy: SortBy) {
    this.filter.sortBy = sortBy;
    this.applyFilters(true);
  }

  // 清空所有条件
  reset() {
    this.filter = { sortBy: SortBy.PriceAsc };
    this.applyFilters(true);
  }

  // 下拉刷新（示例：重新应用当前筛选，并重置分页到第一页）
  refresh() {
    this.applyFilters(true);
  }

  // 上拉加载更多：按页追加，直到触达筛选结果末尾或最大长度
  loadMore() {
    if (this.loadingMore || !this.hasMore) {
      return;
    }
    this.loadingMore = true;

    // 示例数据本地生成，这里同步追加；如需模拟网络可改为 setTimeout
    const currentLength: number = this.filteredGoods.length;
    const maxLength: number = Math.min(MAX_DATA_LENGTH, this.filteredAllGoods.length);
    const nextEnd: number = Math.min(currentLength + this.pageSize, maxLength);
    if (nextEnd > currentLength) {
      this.filteredGoods = this.filteredAllGoods.slice(0, nextEnd);
    }
    this.hasMore = this.filteredGoods.length < maxLength;
    this.loadingMore = false;
  }

  // 应用筛选与排序
  private applyFilters(resetPage: boolean) {
    const f = this.filter;
    let result = this.allGoods.slice();

    // 关键词匹配（名称或关键词包含）
    if (f.keyword && f.keyword.length > 0) {
      const kw = f.keyword.toLowerCase();
      result = result.filter(g =>
        g.name.toLowerCase().includes(kw) ||
        (g.keywords?.some(k => k.toLowerCase().includes(kw)) ?? false)
      );
    }

    // 类目过滤
    if (f.categoryId) {
      result = result.filter(g => g.category.categoryId === f.categoryId);
    }
    if (f.subcategoryId) {
      result = result.filter(g => g.category.subcategoryId === f.subcategoryId);
    }

    // 价格区间
    if (typeof f.minPrice === 'number') {
      result = result.filter(g => g.price >= (f.minPrice as number));
    }
    if (typeof f.maxPrice === 'number') {
      result = result.filter(g => g.price <= (f.maxPrice as number));
    }

    // 标签过滤已移除

    // 排序
    switch (f.sortBy) {
      case SortBy.PriceAsc:
        result.sort((a, b) => a.price - b.price);
        break;
      case SortBy.PriceDesc:
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    this.filteredAllGoods = result;

    // 分页：默认展示第一页；也允许在不重置分页的情况下保持当前长度（用于后续扩展）
    const maxLength: number = Math.min(MAX_DATA_LENGTH, this.filteredAllGoods.length);
    if (resetPage) {
      const firstEnd: number = Math.min(this.pageSize, maxLength);
      this.filteredGoods = this.filteredAllGoods.slice(0, firstEnd);
    } else {
      const keepEnd: number = Math.min(this.filteredGoods.length, maxLength);
      this.filteredGoods = this.filteredAllGoods.slice(0, keepEnd);
    }
    this.hasMore = this.filteredGoods.length < maxLength;
    this.loadingMore = false;
  }
}
