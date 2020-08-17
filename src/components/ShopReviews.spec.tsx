import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ShopReviews from "./ShopReviews";
import { useShopReviews } from "../hooks/use-shop-reviews";

jest.mock("../hooks/use-shop-reviews");

const mockData = {
  name: "foo",
  getReviewsSortedBy: jest.fn().mockReturnValue([
    {
      id: "1",
      comment: "Lorem Ipsum",
      mark: 5,
      relevanceScore: 40,
      creationDate: {
        formatted: "20.06.2020",
      },
    },
  ]),
};

describe("ShopReviews", () => {
  it("renders without crashing", () => {
    (useShopReviews as jest.Mock).mockReturnValue({
      isLoading: false,
      data: undefined,
    });
    const { container } = render(<ShopReviews shopId="foo" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  describe("when no data is available", () => {
    it("renders a hint", () => {
      (useShopReviews as jest.Mock).mockReturnValue({
        isLoading: false,
        data: undefined,
      });
      const { getByTestId } = render(<ShopReviews shopId="foo" />);
      expect(getByTestId("no-data")).toBeInTheDocument();
    });
  });

  describe("when is loading", () => {
    it("shows a loading indicator", () => {
      (useShopReviews as jest.Mock).mockReturnValue({
        isLoading: true,
        data: undefined,
      });
      const { getByTestId } = render(<ShopReviews shopId="foo" />);
      expect(getByTestId("loading")).toBeInTheDocument();
    });
  });

  describe("when data is loaded", () => {
    beforeEach(() => {
      (useShopReviews as jest.Mock).mockReturnValue({
        isLoading: false,
        data: mockData,
      });
    });

    it("renders the shop name", () => {
      const { getByText } = render(<ShopReviews shopId="foo" />);
      expect(getByText(/foo/)).toBeInTheDocument();
    });

    it("renders the reviews", () => {
      const { getByText } = render(<ShopReviews shopId="foo" />);
      expect(getByText("Lorem Ipsum")).toBeInTheDocument();
    });

    describe("highlight", () => {
      it("highlights even rows per default", () => {
        const { getByTestId } = render(<ShopReviews shopId="foo" />);
        expect(getByTestId("highlighted:even")).toBeInTheDocument();
      });

      it("highlights odd rows after toggle", () => {
        const { getByTestId } = render(<ShopReviews shopId="foo" />);
        const button = getByTestId("highlight-toggle");
        fireEvent.click(button);
        expect(getByTestId("highlighted:odd")).toBeInTheDocument();
      });

      it("highlights even rows after toggling back", () => {
        const { getByTestId } = render(<ShopReviews shopId="foo" />);
        const button = getByTestId("highlight-toggle");
        fireEvent.click(button);
        fireEvent.click(button);
        expect(getByTestId("highlighted:even")).toBeInTheDocument();
      });
    });

    describe("orderBy", () => {
      beforeEach(() => {
        expect(mockData.getReviewsSortedBy).not.toHaveBeenCalled();
      });

      it("orders by creationDate per default", () => {
        const { getByLabelText } = render(<ShopReviews shopId="foo" />);
        const select = getByLabelText("Order by") as HTMLSelectElement;
        expect(select.value).toEqual("creationDate");
        expect(mockData.getReviewsSortedBy).toHaveBeenCalledWith(
          "creationDate"
        );
      });

      it("orders by mark when selected", () => {
        const { getByLabelText } = render(<ShopReviews shopId="foo" />);
        const select = getByLabelText("Order by") as HTMLSelectElement;
        fireEvent.change(select, { target: { value: "mark" } });
        expect(select.value).toEqual("mark");
        expect(mockData.getReviewsSortedBy).toHaveBeenCalledWith("mark");
      });

      it("orders by relevanceScore when selected", () => {
        const { getByLabelText } = render(<ShopReviews shopId="foo" />);
        const select = getByLabelText("Order by") as HTMLSelectElement;
        fireEvent.change(select, { target: { value: "relevanceScore" } });
        expect(select.value).toEqual("relevanceScore");
        expect(mockData.getReviewsSortedBy).toHaveBeenCalledWith(
          "relevanceScore"
        );
      });
    });
  });
});
