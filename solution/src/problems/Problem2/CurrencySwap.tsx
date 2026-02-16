import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, ChevronDown } from 'lucide-react';
import { useTokenPrices } from './hooks/useTokenPrices';
import TokenModal from '../../components/TokenModal';
import { ICON_BASE_URL } from '../../config';
import './CurrencySwap.css';

const CurrencySwap: React.FC = () => {
    const { prices, loading, error } = useTokenPrices();

    const [fromCurrency, setFromCurrency] = useState<string>('ETH');
    const [toCurrency, setToCurrency] = useState<string>('USD');
    const [amount, setAmount] = useState<string>('');
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isSwapped, setIsSwapped] = useState<boolean>(false);

    // Modal states
    const [isFromModalOpen, setIsFromModalOpen] = useState(false);
    const [isToModalOpen, setIsToModalOpen] = useState(false);

    const fromPrice = useMemo(() => prices.find(p => p.currency === fromCurrency)?.price || 0, [prices, fromCurrency]);
    const toPrice = useMemo(() => prices.find(p => p.currency === toCurrency)?.price || 0, [prices, toCurrency]);

    const exchangeRate = useMemo(() => {
        if (!toPrice || !fromPrice) return 0;
        return fromPrice / toPrice;
    }, [fromPrice, toPrice]);

    const outputAmount = useMemo(() => {
        if (!amount || isNaN(parseFloat(amount))) return '';
        const val = parseFloat(amount) * exchangeRate;
        return val.toLocaleString(undefined, { maximumFractionDigits: 6 });
    }, [amount, exchangeRate]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setAmount(val);

        if (val === '') {
            setValidationError(null);
            return;
        }

        const num = parseFloat(val);
        if (isNaN(num)) {
            setValidationError('Please enter a valid number');
        } else if (num < 0) {
            setValidationError('Amount cannot be negative');
        } else {
            setValidationError(null);
        }
    };

    const handleSwapValues = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (parseFloat(amount) > 0 && !validationError) {
            setIsSwapped(true);
            setTimeout(() => setIsSwapped(false), 2000);
            alert(`Swapped ${amount} ${fromCurrency} to ${outputAmount} ${toCurrency}`);
        }
    };

    const getIconUrl = (currency: string) => `${ICON_BASE_URL}${currency}.svg`;

    if (loading) {
        return (
            <div className="swap-container">
                <div className="swap-card">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading prices...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="swap-container">
                <div className="swap-card">
                    <div className="error-message">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="swap-container">
            <motion.div
                className="swap-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="swap-header">
                    <h2>Swap Assets</h2>
                    <p>Trade tokens in an instant</p>
                </div>

                <form className="swap-form" onSubmit={handleSubmit}>
                    {/* From Section */}
                    <div className="input-wrapper">
                        <label className="input-label">Amount to send</label>
                        <div className={`currency-input-group ${validationError ? 'error' : ''}`}>
                            <input
                                type="number"
                                className="amount-input"
                                placeholder="0.00"
                                value={amount}
                                onChange={handleAmountChange}
                                step="any"
                            />
                            <button
                                type="button"
                                className="currency-select-btn"
                                onClick={() => setIsFromModalOpen(true)}
                            >
                                <img
                                    src={getIconUrl(fromCurrency)}
                                    alt={fromCurrency}
                                    className="token-icon"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                                <span className="token-symbol">{fromCurrency}</span>
                                <ChevronDown size={16} className="chevron-icon" />
                            </button>
                        </div>
                        {validationError && <div className="error-message">{validationError}</div>}
                    </div>

                    {/* Swap Trigger */}
                    <div className="swap-divider">
                        <motion.button
                            type="button"
                            className="swap-icon-btn"
                            onClick={handleSwapValues}
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Switch currencies"
                        >
                            <ArrowDownUp size={20} />
                        </motion.button>
                    </div>

                    {/* To Section */}
                    <div className="input-wrapper">
                        <label className="input-label">Amount to receive</label>
                        <div className="currency-input-group">
                            <input
                                type="text"
                                className="amount-input"
                                placeholder="0.00"
                                value={outputAmount}
                                readOnly
                            />
                            <button
                                type="button"
                                className="currency-select-btn"
                                onClick={() => setIsToModalOpen(true)}
                            >
                                <img
                                    src={getIconUrl(toCurrency)}
                                    alt={toCurrency}
                                    className="token-icon"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                                <span className="token-symbol">{toCurrency}</span>
                                <ChevronDown size={16} className="chevron-icon" />
                            </button>
                        </div>
                    </div>

                    {exchangeRate > 0 && (
                        <div className="exchange-rate">
                            1 {fromCurrency} ≈ {exchangeRate.toFixed(6)} {toCurrency}
                        </div>
                    )}

                    <motion.button
                        type="submit"
                        className="swap-button"
                        disabled={!amount || !!validationError || parseFloat(amount) <= 0}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isSwapped ? 'Swapped!' : 'CONFIRM SWAP'}
                    </motion.button>
                </form>
            </motion.div>

            {/* Token Modals */}
            <TokenModal
                isOpen={isFromModalOpen}
                onClose={() => setIsFromModalOpen(false)}
                tokens={prices}
                onSelect={setFromCurrency}
                selectedCurrency={fromCurrency}
            />

            <TokenModal
                isOpen={isToModalOpen}
                onClose={() => setIsToModalOpen(false)}
                tokens={prices}
                onSelect={setToCurrency}
                selectedCurrency={toCurrency}
            />
        </div>
    );
};

export default CurrencySwap;
