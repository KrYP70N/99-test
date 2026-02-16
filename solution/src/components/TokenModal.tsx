import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check } from 'lucide-react';
import { ICON_BASE_URL } from '../config';
import './TokenModal.css';

// Define the interface locally or import it. 
// Since it was imported from useTokenPrices, i'll define a compatible interface here to decouple.
export interface TokenData {
    currency: string;
    price: number;
    // date: string; // Not needed for display
}

interface TokenModalProps {
    isOpen: boolean;
    onClose: () => void;
    tokens: TokenData[]; // Use the local interface
    onSelect: (currency: string) => void;
    selectedCurrency: string;
}

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose, tokens, onSelect, selectedCurrency }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTokens = useMemo(() => {
        return tokens.filter(t =>
            t.currency.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tokens, searchQuery]);

    const suggestedTokens = useMemo(() => {
        const popular = ['ETH', 'USD', 'USDC', 'WBTC', 'OKB'];
        return tokens.filter(t => popular.includes(t.currency));
    }, [tokens]);

    const getIconUrl = (currency: string) => `${ICON_BASE_URL}${currency}.svg`;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="modal-container"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                    >
                        <div className="modal-header">
                            <h3>Select a Token</h3>
                            <button className="close-btn" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="search-container">
                            <Search className="search-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or paste address"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="token-search-input"
                                autoFocus
                            />
                        </div>

                        <div className="token-list">
                            {!searchQuery && suggestedTokens.length > 0 && (
                                <div className="suggested-section">
                                    <h4>Popular Tokens</h4>
                                    <div className="suggested-chips">
                                        {suggestedTokens.map(token => (
                                            <button
                                                key={token.currency}
                                                className={`suggested-chip ${selectedCurrency === token.currency ? 'selected' : ''}`}
                                                onClick={() => {
                                                    onSelect(token.currency);
                                                    onClose();
                                                }}
                                            >
                                                <img
                                                    src={getIconUrl(token.currency)}
                                                    alt={token.currency}
                                                    width={20}
                                                    height={20}
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                                {token.currency}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="list-header">Token Name</div>

                            {filteredTokens.length > 0 ? (
                                filteredTokens.map((token) => (
                                    <div
                                        key={token.currency}
                                        className={`token-item ${selectedCurrency === token.currency ? 'selected' : ''}`}
                                        onClick={() => {
                                            onSelect(token.currency);
                                            onClose();
                                        }}
                                    >
                                        <img
                                            src={getIconUrl(token.currency)}
                                            alt={token.currency}
                                            className="token-item-icon"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                        <div className="token-item-info">
                                            <span className="token-symbol">{token.currency}</span>
                                            <span className="token-name">
                                                {/* In a real app we might map Symbols to Names, here just reusing symbol or if we had name data */}
                                                Token
                                            </span>
                                        </div>
                                        <div className="token-item-price">
                                            ${token.price ? token.price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : '0.00'}
                                        </div>
                                        {selectedCurrency === token.currency && <Check size={18} className="check-icon" />}
                                    </div>
                                ))
                            ) : (
                                <div className="no-tokens">No tokens found</div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TokenModal;
