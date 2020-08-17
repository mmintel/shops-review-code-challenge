export interface Review {
  id: string;
  comment: string;
  mark: number;
  creationDate: {
    date: Date;
    formatted: string;
  };
  relevanceScore: number;
}
