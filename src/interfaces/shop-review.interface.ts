import { Review } from "./review.interface";

export enum ReviewsSortKey {
  CREATION_DATE = "creationDate",
  MARK = "mark",
  RELEVANCE_SCORE = "relevanceScore",
}

export interface ShopReview {
  name: string;
  getReviews: (amount: number) => Review[];
  getRelevantReviews: () => Review[];
  getReviewsSortedBy: (sortKey: ReviewsSortKey) => Review[];
}
