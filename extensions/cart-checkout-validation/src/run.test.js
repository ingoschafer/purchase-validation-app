import { describe, it, expect } from 'vitest';
import { run } from './run';

/**
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

describe('cart checkout validation function', () => {
  it('returns no error when quantity is below threshold', () => {
    const result = run({
      cart: {
        lines: [
          {
            quantity: 3
          }
        ]
      }
    });
    const expected = /** @type {FunctionRunResult} */ ({ errors: [] });

    expect(result).toEqual(expected);
  });

  it('returns an error when quantity is above threshold', () => {
    const result = run({
      cart: {
        lines: [
          {
            quantity: 51
          }
        ]
      }
    });
    const expected = /** @type {FunctionRunResult} */ ({ errors: [
      {
        localizedMessage: "It is not permitted to buy more than 50 instances of a product at once.",
        target: "cart"
      }
    ] });

    expect(result).toEqual(expected);
  });

  it('returns an error when cart is empty', () => {
    const result = run({
      cart: null
    });
    const expected = /** @type {FunctionRunResult} */ ({ errors: [
      {
        localizedMessage: "missing cart data",
        target: "cart"
      }
    ] });

    expect(result).toEqual(expected);
  });
});