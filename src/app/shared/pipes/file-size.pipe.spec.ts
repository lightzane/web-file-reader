import { FileSizePipe } from './file-size.pipe';

fdescribe('FileSizePipe', () => {
  let pipe: FileSizePipe;

  beforeEach(() => {
    pipe = new FileSizePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return 1 kb if less than 1000', () => {
      const result = pipe.transform(999);
      expect(result).toBe('1 kb');
    });

    it('should return 2 kb if value is 2000', () => {
      const result = pipe.transform(2000);
      expect(result).toBe('2 kb');
    });

    it('should return 1 mb if value is 1043000', () => {
      const result = pipe.transform(1043000);
      expect(result).toBe('1 mb');
    });

    it('should return 1.04 mb if value is 1043000 with decimal value of 2', () => {
      const result = pipe.transform(1043000, 2);
      expect(result).toBe('1.04 mb');
    });

    it('should return null if value is not a number', () => {
      const result = pipe.transform('1043000mb', 2);
      expect(result).toEqual(null);
    });
  });
});
