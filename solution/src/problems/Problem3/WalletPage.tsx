import React, { useMemo } from 'react';

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    navigate?: (path: string) => void;
}

const useWalletBalances = (): WalletBalance[] => {
    return [
        { currency: 'OSMO', amount: 100, blockchain: 'Osmosis' },
        { currency: 'ETH', amount: 50, blockchain: 'Ethereum' },
        { currency: 'ARB', amount: 30, blockchain: 'Arbitrum' },
        { currency: 'ZIL', amount: 20, blockchain: 'Zilliqa' },
        { currency: 'NEO', amount: 20, blockchain: 'Neo' },
    ];
};

const usePrices = (): Record<string, number> => {
    return {
        'OSMO': 1.5,
        'ETH': 2000,
        'ARB': 1.2,
        'ZIL': 0.03,
        'NEO': 10,
    };
};

const blockchainPriority: Record<string, number> = {
    'Osmosis': 100,
    'Ethereum': 50,
    'Arbitrum': 30,
    'Zilliqa': 20,
    'Neo': 20,
};

const getPriority = (blockchain: string): number => {
    return blockchainPriority[blockchain] ?? -99;
};

const WalletRow: React.FC<{
    amount: number;
    usdValue: number;
    formattedAmount: string;
    currency: string;
}> = ({ amount, usdValue, formattedAmount, currency }) => {
    return (
        <div className="wallet-row" title={`Amount: ${amount}`} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #eee'
        }}>
            <span style={{ fontWeight: 'bold' }}>{currency}</span>
            <span>{formattedAmount}</span>
            <span>${usdValue.toFixed(2)}</span>
        </div>
    )
};

const WalletPage: React.FC<Props> = (props: Props) => {
    const { ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = getPriority(balance.blockchain);
                return balancePriority > -99 && balance.amount > 0;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);

                if (leftPriority > rightPriority) {
                    return -1;
                } else if (rightPriority < leftPriority) {
                    return 1;
                }
                return 0;
            });
    }, [balances]);

    const formattedBalances = useMemo(() => {
        return sortedBalances.map((balance: WalletBalance) => {
            return {
                ...balance,
                formatted: balance.amount.toFixed(2)
            };
        });
    }, [sortedBalances]);

    const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
        const usdValue = (prices[balance.currency] || 0) * balance.amount;

        return (
            <WalletRow
                key={balance.currency}
                currency={balance.currency}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        );
    });

    return (
        <div {...rest}>
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>Wallet Balances</h2>
                {rows}
            </div>
        </div>
    );
};

export default WalletPage;
