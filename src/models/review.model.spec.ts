import { ReviewData } from "./../api/shop-reviews.api";
import { ReviewModel } from "./review.model";

const mockReview: ReviewData = {
  UID: "1",
  comment: "foo",
  creationDate: "2020-05-20T11:05:31+02:00",
  mark: "4.33",
  reviewer: {
    profile: {
      firstname: "John",
      lastname: "Doe",
    },
  },
};

describe("Review", () => {
  it("initializes without crashing", () => {
    expect(() => new ReviewModel(mockReview)).not.toThrow();
  });

  it("returns the id", () => {
    const review = new ReviewModel(mockReview);
    expect(review.id).toEqual(mockReview.UID);
  });

  it("returns the comment", () => {
    const review = new ReviewModel(mockReview);
    expect(review.comment).toEqual(mockReview.comment);
  });

  it("returns the mark as number", () => {
    const review = new ReviewModel(mockReview);
    expect(review.mark).toEqual(Number(mockReview.mark));
  });

  it("returns the creationDate as date and formatted", () => {
    const review = new ReviewModel(mockReview);
    expect(review.creationDate.date).toEqual(new Date(mockReview.creationDate));
    expect(review.creationDate.formatted).toEqual("20.5.2020");
  });

  it("returns the relevanceScore", () => {
    const review = new ReviewModel(mockReview);
    expect(review.relevanceScore).toEqual(53);
  });
});
