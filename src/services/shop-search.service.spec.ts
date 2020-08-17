import { ShopSearchApi } from "../api/shop-search.api";
import { ShopReviews } from "../interfaces/shop-reviews.interface";
import { ShopSearchService } from "./shop-search.service";
import { ShopSearchResultModel } from "../models/shop-search-result.model";

const mockSearchApi: ShopSearchApi = {
  search: jest.fn().mockResolvedValue({
    shops: [
      {
        tsId: "1",
        name: "foo",
        qualityIndicator: {
          reviewIndicator: {
            overallMark: "4.5",
          },
        },
      },
    ],
    _metaData: {
      count: 0,
    },
  }),
};

const mockReviewsService: ShopReviews = {
  getByID: jest.fn().mockResolvedValue({
    getRelevantReviews: jest.fn(),
  }),
};

describe("ShopSearchService", () => {
  it("initializes without crashing", () => {
    expect(() => new ShopSearchService(mockSearchApi, mockReviewsService));
  });

  describe("getByID", () => {
    it("calls the api wit the right URL", async () => {
      const shopSearchService = new ShopSearchService(
        mockSearchApi,
        mockReviewsService
      );
      expect(mockSearchApi.search).not.toHaveBeenCalled();
      await shopSearchService.search("foo");
      expect(mockSearchApi.search).toHaveBeenCalledTimes(1);
      expect(mockSearchApi.search).toHaveBeenCalledWith("foo", 0);
    });

    it("returns ShopSearchResultModels", async () => {
      const shopSearchService = new ShopSearchService(
        mockSearchApi,
        mockReviewsService
      );
      const shopReview = await shopSearchService.search("foo");
      expect(shopReview[0]).toBeInstanceOf(ShopSearchResultModel);
    });

    it("encodes the search term", async () => {
      const shopSearchService = new ShopSearchService(
        mockSearchApi,
        mockReviewsService
      );
      await shopSearchService.search("foo bar");
      expect(mockSearchApi.search).toHaveBeenCalledWith("foo%20bar", 0);
    });

    it("searches for specific page", async () => {
      const shopSearchService = new ShopSearchService(
        mockSearchApi,
        mockReviewsService
      );
      await shopSearchService.search("foo", 5);
      expect(mockSearchApi.search).toHaveBeenCalledWith("foo", 5);
    });
  });

  describe("getShopReviews", () => {
    it("calls the reviews service", async () => {
      const shopSearchService = new ShopSearchService(
        mockSearchApi,
        mockReviewsService
      );
      await shopSearchService.getShopReviews("foobar");
      expect(mockReviewsService.getByID).toHaveBeenCalledWith("foobar");
    });
  });
});
