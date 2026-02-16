import { useState, useEffect } from 'react';

export interface TokenPrice {
    currency: string;
    date: string;
    price: number;
}

const PRICE_URL = 'https://interview.switcheo.com/prices.json';

export const useTokenPrices = () => {
    const [prices, setPrices] = useState<TokenPrice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(PRICE_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch token prices');
                }
                const data: TokenPrice[] = await response.json();

                // Data processing:
                // 1. Filter out tokens without prices (if any, though types say price is number)
                // 2. Handle duplicates: The API returns multiple entries for the same currency with different dates.
                // We want the latest price for each currency.

                const latestPricesMap = new Map<string, TokenPrice>();

                data.forEach((item) => {
                    const current = latestPricesMap.get(item.currency);
                    if (!current || new Date(item.date) > new Date(current.date)) {
                        latestPricesMap.set(item.currency, item);
                    }
                });

                const processedPrices = Array.from(latestPricesMap.values()).sort((a, b) =>
                    a.currency.localeCompare(b.currency)
                );

                setPrices(processedPrices);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    const getPrice = (currency: string) => {
        return prices.find((p) => p.currency === currency)?.price || 0;
    };

    return { prices, loading, error, getPrice };
};
