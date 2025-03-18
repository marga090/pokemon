import { Type } from './type';

describe('Tipo', () => {
  it('should create an instance', () => {
    expect(new Type(1, 'url', 'name', 'image')).toBeTruthy();
  });
});
