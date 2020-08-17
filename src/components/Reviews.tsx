import React from "react";
import { Review as ReviewInterface } from "../interfaces/review.interface";
import Review from "./Review";

interface ReviewListProps {
  reviews: ReviewInterface[];
  highlight: Highlight;
}

export enum Highlight {
  EVEN = "even",
  ODD = "odd",
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  highlight,
  ...props
}) => {
  const isHighlighted = (index: number): boolean => {
    if (highlight === Highlight.EVEN) return index % 2 === 0;
    return Math.abs(index % 2) === 1;
  };

  return (
    <table style={{ width: "100%" }} {...props}>
      <thead>
        <tr>
          <th>Comment</th>
          <th>Mark</th>
          <th>Relevance Score</th>
          <th>Creation Date</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review, index) => (
          <Review
            key={review.id}
            review={review}
            highlight={isHighlighted(index)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ReviewList;
