import React, { useState } from 'react';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './solutions';
import './Problem1.css';

const Problem1: React.FC = () => {
    const [n, setN] = useState<number>(5);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value) || 0;
        setN(val);
        if (val > 10000) {
            setError('Warning: large N may cause performance issues or stack overflow with recursion.');
        } else if (val < 0) {
            setError('N must be a positive integer.');
        } else {
            setError(null);
        }
    };

    const getResult = (fn: (n: number) => number, name: string) => {
        if (n < 0) return 'Error: N < 0';
        try {
            // Protect against stack overflow for recursion if N is too large
            if (name === 'Recursion' && n > 5000) {
                return 'Skipped (Stack Overflow Risk)';
            }
            return fn(n);
        } catch {
            return 'Error';
        }
    }

    const codeA = `var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};`;

    const codeB = `var sum_to_n_b = function(n) {
    return (n * (n + 1)) / 2;
};`;

    const codeC = `var sum_to_n_c = function(n) {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
};`;

    return (
        <div className="problem1-container">
            <h1>Problem 1: Three ways to sum to n</h1>

            <div className="input-group">
                <label htmlFor="input-n">Enter a number (n):</label>
                <input
                    id="input-n"
                    type="number"
                    value={n}
                    onChange={handleInputChange}
                    min="0"
                />
                {error && <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
            </div>

            <div className="implementations">
                <h2>Implementation A: Iterative Loop</h2>
                <CodeBlock code={codeA} title="solution_a.js" />

                <h2>Implementation B: Mathematical Formula</h2>
                <CodeBlock code={codeB} title="solution_b.js" />

                <h2>Implementation C: Recursion</h2>
                <CodeBlock code={codeC} title="solution_c.js" />
            </div>

            <div className="results-section">
                <h2>Live Results for n = {n}</h2>
                <div className="results-grid">
                    <div className="result-card">
                        <h3>Result A (Loop)</h3>
                        <div className="result-value">{getResult(sum_to_n_a, 'Loop')}</div>
                    </div>
                    <div className="result-card">
                        <h3>Result B (Formula)</h3>
                        <div className="result-value">{getResult(sum_to_n_b, 'Formula')}</div>
                    </div>
                    <div className="result-card">
                        <h3>Result C (Recursion)</h3>
                        <div className="result-value">{getResult(sum_to_n_c, 'Recursion')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
