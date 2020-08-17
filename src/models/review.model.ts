import { RelevanceScore } from "../lib/relevance-score";
import { ReviewData } from "../api/shop-reviews.api";
import { Review } from "../interfaces/review.interface";

export class ReviewModel implements Review {
  constructor(private data: ReviewData) {}

  public get id() {
    return this.data.UID;
  }

  public get comment() {
    return this.data.comment;
  }

  public get mark() {
    return Number(this.data.mark);
  }

  public get creationDate() {
    const date = new Date(this.data.creationDate);
    return {
      date,
      formatted: date.toLocaleDateString("de"),
    };
  }

  public get relevanceScore() {
    const score = new RelevanceScore(
      this.data.comment,
      this.data.reviewer?.profile
    );
    return score.calculate();
  }
}
