import { UserProfile } from "../api/shop-reviews.api";

export class RelevanceScore {
  private scorePerCharacter: number = 1;
  private maxScoreForCharacters: number = 100;
  private scoreForPartialProfile: number = 25;
  private scoreForFullProfile: number = 50;

  constructor(private comment?: string, private profile?: UserProfile) {}

  public calculate(): number {
    const reviewScore = this.calculateReviewScore();
    const userProfileScore = this.calculateUserProfileScore();
    return reviewScore + userProfileScore;
  }

  private calculateReviewScore(): number {
    if (!this.comment) return 0;
    const characterScore = this.comment.trim().length * this.scorePerCharacter;
    return characterScore > this.maxScoreForCharacters
      ? this.maxScoreForCharacters
      : characterScore;
  }

  private calculateUserProfileScore(): number {
    if (!this.profile || !this.profile.firstname || !this.profile.lastname)
      return 0;

    if (
      this.isFullName(this.profile.firstname) &&
      this.isFullName(this.profile.lastname)
    ) {
      return this.scoreForFullProfile;
    }

    return this.scoreForPartialProfile;
  }

  private isFullName(name: string): boolean {
    const sanitized = name.replace(/\./g, ""); // replace all dots
    return sanitized.length > 1;
  }
}
