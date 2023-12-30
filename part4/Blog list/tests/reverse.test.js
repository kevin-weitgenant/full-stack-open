import { describe, expect, it } from 'vitest';
import { reverse } from '../utils/for_testing';

describe('reverse function', () => {
  it('reverse of a', () => {
    const result = reverse('a');
    expect(result).toBe('a');
  });

  it('reverse of react', () => {
    const result = reverse('react');
    expect(result).toBe('tcaer');
  });

  it('reverse of releveler', () => {
    const result = reverse('releveler');
    expect(result).toBe('releveler');
  });
});