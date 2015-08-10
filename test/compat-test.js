import compat from '../src/compat';
import expect from 'expect.js';

describe('compat', () => {
  it('should be able to check if something is an array', () => {
    // not the best way to test, but I'm copy/pasting this from my grab bag of old tricks
    // specifically, it does not test that this works in all browsers unless running in something like karma+sauce
    expect(compat.isArray([])).to.be.ok();
    expect(compat.isArray({})).not.to.be.ok();
    expect(compat.isArray()).not.to.be.ok();
    expect(compat.isArray(null)).not.to.be.ok();
    expect(compat.isArray('string')).not.to.be.ok();
  });

  it('should be able to find the indexOf something in an array', () => {
    expect(compat.indexOf([1, 2, 3], 3)).to.be(2);
    expect(compat.indexOf(['a', 'b', 'c'], 'b')).to.be(1);
  });

  it('should be able to filter an array', () => {
    expect(compat.filter([1, 2, 3], (i) => i === 2)).to.eql([2]);
    expect(compat.filter([1, 2, 3], ( ) => true)).to.eql([1, 2, 3]);
  });
});