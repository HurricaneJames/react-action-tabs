import expect from 'expect.js';
import Styles from '../src/Styles';

describe('Styles', () => {
  describe('merge', () => {
    it('should merge styles passed as arguments', () => {
      expect(Styles.merge(
        { display: 'none' },
        { visibility: 'hidden' }
      )).to.eql({ display: 'none', visibility: 'hidden' });
    });

    it('should flatten arrays in place and apply last with highest precendnce', () => {
      expect(Styles.merge(
        [ { display: 'none', transit: '15s' }, { display: 'here', visibility: 'foggy' }, { trucks: 7 } ],
        { transit: '30s' },
        [ { trucks: 3 }, { trucks: 5 }, false && { trucks: 99 } ]
      )).to.eql({
        display: 'here',
        transit: '30s',
        visibility: 'foggy',
        trucks: 5
      });
    });

    it('should merge styles from an array of objects', () => {
      var styles = [
        { display: 'none' },
        { visibility: 'hidden' },
      ]
      var merged = Styles.merge(styles);
      expect(merged).to.eql({ display: 'none', visibility: 'hidden' });
    });

    it('should overwrite base styles with subsequent styles', () => {
      var styles = [
        { display: 'none', visibility: 'poor' },
        { visibility: 'hidden' },
      ]
      var merged = Styles.merge(styles);
      expect(merged).to.eql({ display: 'none', visibility: 'hidden' });
    });

    it('should ignore false/undefined values', () => {
      var styles = [
        undefined,
        { display: 'none', visibility: 'poor' },
        false,
        { visibility: 'hidden' },
        undefined
      ]
      var merged = Styles.merge(styles);
      expect(merged).to.eql({ display: 'none', visibility: 'hidden' });
    });

    it('should return an empty set when given nothing', () => {
      expect(Styles.merge()).to.eql({});
      expect(Styles.merge([])).to.eql({});
      expect(Styles.merge('wrong')).to.eql({});
      expect(Styles.merge({})).to.eql({});
      expect(Styles.merge(null)).to.eql({});
    })
  });
});
