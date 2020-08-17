import React from "react";
import { Review as ReviewInterface } from "../interfaces/review.interface";

interface ReviewProps {
  review: ReviewInterface;
  highlight: boolean;
}

const Review: React.FC<ReviewProps> = ({ review, highlight }) => {
  return (
    <tr style={{ backgroundColor: highlight ? "#eee" : undefined }}>
      <td>{review.comment}</td>
      <td align="center">{review.mark.toFixed(2)}</td>
      <td align="center">{review.relevanceScore}</td>
      <td align="center">{review.creationDate.formatted}</td>
    </tr>
  );
};

export default Review;
