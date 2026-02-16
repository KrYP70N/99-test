import { describe, it, expect } from 'vitest';
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './solutions';

describe('Problem 1 - Sum to N', () => {
    const testCases = [
        { n: 1, expected: 1 },
        { n: 5, expected: 15 },
        { n: 10, expected: 55 },
        { n: 100, expected: 5050 },
    ];

    describe('Implementation A (Loop)', () => {
        testCases.forEach(({ n, expected }) => {
            it(`should return ${expected} for n=${n}`, () => {
                expect(sum_to_n_a(n)).toBe(expected);
            });
        });
    });

    describe('Implementation B (Formula)', () => {
        testCases.forEach(({ n, expected }) => {
            it(`should return ${expected} for n=${n}`, () => {
                expect(sum_to_n_b(n)).toBe(expected);
            });
        });
    });

    describe('Implementation C (Recursion)', () => {
        testCases.forEach(({ n, expected }) => {
            it(`should return ${expected} for n=${n}`, () => {
                expect(sum_to_n_c(n)).toBe(expected);
            });
        });
    });
});
