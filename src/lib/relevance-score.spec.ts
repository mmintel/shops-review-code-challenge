import { RelevanceScore } from './relevance-score';

const TOO_LONG_COMMENT = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et d';

describe('RelevanceScore', () => {
  it('should initialise without crashing', () => {
    expect(() => new RelevanceScore()).not.toThrow();
  })

  describe('calculate', () => {
    describe('without anything', () => {
      it('should return the right score', () => {
        expect(new RelevanceScore().calculate()).toEqual(0)
        expect(new RelevanceScore('').calculate()).toEqual(0)
        expect(new RelevanceScore('', {}).calculate()).toEqual(0)
      });
    });

    describe('with only a comment', () => {
      it('should return the score equal to amount of characters', () => {
        expect(new RelevanceScore('f').calculate()).toEqual(1)
        expect(new RelevanceScore('foo').calculate()).toEqual(3)
        expect(new RelevanceScore('foobar').calculate()).toEqual(6)
      });

      it('should return a max score of 100', () => {
        expect(new RelevanceScore(TOO_LONG_COMMENT).calculate()).toEqual(100)
      });
    });

    describe('with only a profile', () => {
      it('should return a score of 0 when firstname is missing', () => {
        expect(new RelevanceScore(undefined, { lastname: 'Doe' }).calculate()).toEqual(0)
      });

      it('should return a score of 0 when lastname is missing', () => {
        expect(new RelevanceScore(undefined, { firstname: 'John' }).calculate()).toEqual(0)
      });

      it('should return a partial score of 25 if only firstname is given as fullname', () => {
        expect(new RelevanceScore(undefined, { firstname: 'John', lastname: 'D' }).calculate()).toEqual(25)
        expect(new RelevanceScore(undefined, { firstname: 'John', lastname: 'D.' }).calculate()).toEqual(25)
        expect(new RelevanceScore(undefined, { firstname: 'John', lastname: 'D..' }).calculate()).toEqual(25)
      });

      it('should return a partial score of 25 if only lastname is given as fullname', () => {
        expect(new RelevanceScore(undefined, { firstname: 'J', lastname: 'Doe' }).calculate()).toEqual(25)
        expect(new RelevanceScore(undefined, { firstname: 'J.', lastname: 'Doe' }).calculate()).toEqual(25)
        expect(new RelevanceScore(undefined, { firstname: 'J..', lastname: 'Doe' }).calculate()).toEqual(25)
      });

      it('should return a full score of 50 if firstname and lastname are given as fullnames', () => {
        expect(new RelevanceScore(undefined, { firstname: 'John', lastname: 'Doe' }).calculate()).toEqual(50)
      });
    });
  });

  describe('with comment and profile', () => {
    it('returns the right score with both fullnames', () => {
      expect(new RelevanceScore('', { firstname: 'John', lastname: 'Doe' }).calculate()).toEqual(50)
      expect(new RelevanceScore('foo', { firstname: 'John', lastname: 'Doe' }).calculate()).toEqual(53)
      expect(new RelevanceScore('foobar', { firstname: 'John', lastname: 'Doe' }).calculate()).toEqual(56)
    });

    it('returns the right score with one fullname', () => {
      expect(new RelevanceScore('', { firstname: 'John', lastname: 'D.' }).calculate()).toEqual(25)
      expect(new RelevanceScore('foo', { firstname: 'John', lastname: 'D.' }).calculate()).toEqual(28)
      expect(new RelevanceScore('foobar', { firstname: 'John', lastname: 'D.' }).calculate()).toEqual(31)
    });
  });
})