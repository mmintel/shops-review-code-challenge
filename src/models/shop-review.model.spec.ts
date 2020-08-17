import { ReviewData } from "../api/shop-reviews.api";
import { ReviewsSortKey } from "../interfaces/shop-review.interface";
import { ShopReviewModel } from "./shop-review.model";

const mockReviews: ReviewData[] = [
  {
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
  },
  {
    UID: "2",
    comment: "foobar",
    creationDate: "2020-06-23T11:05:31+02:00",
    mark: "5",
  },
  {
    UID: "3",
    comment: "foobarbaz",
    creationDate: "2019-06-23T11:05:31+02:00",
    mark: "2.75",
  },
];

describe("ShopReviewModel", () => {
  it("initializes without crashing", () => {
    expect(
      () =>
        new ShopReviewModel({
          name: "foo",
          reviews: [],
        })
    ).not.toThrow();
  });

  it("returns the name", () => {
    const shopReview = new ShopReviewModel({
      name: "foo",
      reviews: [],
    });
    expect(shopReview.name).toEqual("foo");
  });

  describe("getReviewsSortedBy", () => {
    it("sorts by creationDate", () => {
      const shopReview = new ShopReviewModel({
        name: "foo",
        reviews: mockReviews,
      });
      const reviews = shopReview.getReviewsSortedBy(
        ReviewsSortKey.CREATION_DATE
      );
      expect(reviews[0].id).toEqual("2");
      expect(reviews[1].id).toEqual("1");
      expect(reviews[2].id).toEqual("3");
    });

    it("sorts by mark", () => {
      const shopReview = new ShopReviewModel({
        name: "foo",
        reviews: mockReviews,
      });
      const reviews = shopReview.getReviewsSortedBy(ReviewsSortKey.MARK);
      expect(reviews[0].id).toEqual("2");
      expect(reviews[1].id).toEqual("1");
      expect(reviews[2].id).toEqual("3");
    });

    it("sorts by relevanceScore", () => {
      const shopReview = new ShopReviewModel({
        name: "foo",
        reviews: mockReviews,
      });
      const reviews = shopReview.getReviewsSortedBy(
        ReviewsSortKey.RELEVANCE_SCORE
      );
      expect(reviews[0].id).toEqual("1");
      expect(reviews[1].id).toEqual("3");
      expect(reviews[2].id).toEqual("2");
    });
  });

  describe("getRelevantReviews", () => {
    it("gets three reviews by default", () => {
      const shopReview = new ShopReviewModel({
        name: "foo",
        reviews: mockReviews,
      });
      const reviews = shopReview.getRelevantReviews();
      expect(reviews[0].id).toEqual("1");
      expect(reviews[1].id).toEqual("3");
      expect(reviews[2].id).toEqual("2");
      expect(reviews.length).toBe(3);
    });

    it("gets the most relevant review", () => {
      const shopReview = new ShopReviewModel({
        name: "foo",
        reviews: mockReviews,
      });
      const reviews = shopReview.getRelevantReviews(1);
      expect(reviews[0].id).toEqual("1");
      expect(reviews.length).toBe(1);
    });
  });
});
