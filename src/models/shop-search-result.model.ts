import { Review } from "../interfaces/review.interface";
import { ShopSearchResultData } from "../api/shop-search.api";

export class ShopSearchResultModel {
  constructor(
    private result: ShopSearchResultData,
    private relevantReviews: Review[]
  ) {}

  public get id() {
    return this.result.tsId;
  }

  public get name() {
    return this.result.name;
  }

  public get overallMark() {
    return this.result.qualityIndicator.reviewIndicator.overallMark;
  }

  public get reviews() {
    return this.relevantReviews;
  }
}
