import { Review } from "../interfaces/review.interface";
import { ShopSearchResultModel } from "./shop-search-result.model";
import { ShopSearchResultData } from "../api/shop-search.api";

const mockResult: ShopSearchResultData = {
  tsId: "1",
  name: "foo",
  qualityIndicator: {
    reviewIndicator: {
      overallMark: "4.5",
    },
  },
};

const mockReviews: Review[] = [
  {
    id: "1",
    comment: "foo",
    creationDate: {
      date: new Date("2020-05-20T11:05:31+02:00"),
      formatted: "20.05.2020",
    },
    mark: 4.33,
    relevanceScore: 10,
  },
  {
    id: "2",
    comment: "foobar",
    creationDate: {
      date: new Date("2020-06-15T11:05:31+02:00"),
      formatted: "15.06.2020",
    },
    mark: 5,
    relevanceScore: 105,
  },
  {
    id: "3",
    comment: "foobarbaz",
    creationDate: {
      date: new Date("2019-02-03T11:05:31+02:00"),
      formatted: "03.02.2019",
    },
    mark: 1.5,
    relevanceScore: 75,
  },
  {
    id: "3",
    comment: "foofoo",
    creationDate: {
      date: new Date("2019-02-03T11:05:31+02:00"),
      formatted: "03.02.2019",
    },
    mark: 3,
    relevanceScore: 95,
  },
];

describe("ShopSearchResult", () => {
  it("initializes without crashing", () => {
    expect(
      () => new ShopSearchResultModel(mockResult, mockReviews)
    ).not.toThrow();
  });

  it("returns the name", () => {
    const shopReview = new ShopSearchResultModel(mockResult, mockReviews);
    expect(shopReview.name).toEqual("foo");
  });

  it("returns the id", () => {
    const shopReview = new ShopSearchResultModel(mockResult, mockReviews);
    expect(shopReview.id).toEqual("1");
  });

  it("returns the overallMark", () => {
    const shopReview = new ShopSearchResultModel(mockResult, mockReviews);
    expect(shopReview.overallMark).toEqual("4.5");
  });

  it("returns the received reviews", () => {
    const shopReview = new ShopSearchResultModel(mockResult, mockReviews);
    expect(shopReview.reviews).toEqual(mockReviews);
  });
});
