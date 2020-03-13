import { InfoMiddleware } from './info.middleware';

describe('InfoMiddleware', () => {
  it('should be defined', () => {
    expect(new InfoMiddleware()).toBeDefined();
  });
});
