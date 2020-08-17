import { ShopReviewData } from "../api/shop-reviews.api";
import { ReviewModel } from "./review.model";
import { Review } from "../interfaces/review.interface";
import {
  ShopReview,
  ReviewsSortKey,
} from "../interfaces/shop-review.interface";

export class ShopReviewModel implements ShopReview {
  constructor(private shopReviews: ShopReviewData) {}

  public get name() {
    return this.shopReviews.name;
  }

  public getReviews = () => {
    return this.shopReviews.reviews.map((review) => new ReviewModel(review));
  };

  public getRelevantReviews = (amount: number = 3) => {
    return this.getReviews()
      .sort((a: Review, b: Review) => b.relevanceScore - a.relevanceScore)
      .slice(0, amount);
  };

  public getReviewsSortedBy = (sortKey: ReviewsSortKey): Review[] => {
    const reviews = this.getReviews();
    const comparator = {
      creationDate: (a: Review, b: Review) =>
        b.creationDate.date.getTime() - a.creationDate.date.getTime(),
      relevanceScore: (a: Review, b: Review) =>
        b.relevanceScore - a.relevanceScore,
      mark: (a: Review, b: Review) => b.mark - a.mark,
    };

    return [...reviews].sort(comparator[sortKey]);
  };
}
