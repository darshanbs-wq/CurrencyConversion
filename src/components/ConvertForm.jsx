import React, { useEffect, useState } from 'react';
import CurrencySelect from './CurrencySelect';

export const ConvertForm = () => {
    const [Fromcurrency, setFromcurrency] = useState("USD");
    const [amount, setamount] = useState(1);
    const [Tocurrency, setToecurrency] = useState("INR");
    const [Result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false); // Controls when to show the result
    const [triggerFetch, setTriggerFetch] = useState(false); // Controls API call in useEffect

    const handleSwapCurrencies = () => {
        setFromcurrency(Tocurrency);
        setToecurrency(Fromcurrency);
    };

    const exchangeRate = async () => {
        setLoading(true);
        setShowResult(false); // Hide result initially
        const API_KEY = `927ae2832c2a73a8fc4bba8e`;
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${Fromcurrency}/${Tocurrency}`;
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw Error("Something went wrong");
            const data = await response.json();
            const rate = (data.conversion_rate * amount).toFixed(2);
            setTimeout(() => {
                setResult(`${amount} ${Fromcurrency} = ${rate} ${Tocurrency}`);
                setShowResult(true); // Show result after delay
            }, 2000); // 1-second delay
        } catch (error) {
            setResult("Error fetching exchange rate");
            setLoading(false);
        } finally {
            setLoading(false); // Stop loading state
            setTriggerFetch(false); // Reset trigger
        }
    };

    const handleformsubmit = (e) => {
        e.preventDefault();
        setTriggerFetch(true); // Set the trigger to true to start fetching data
    };

    useEffect(() => {
        if (triggerFetch) {
            exchangeRate(); // Fetch data only if triggerFetch is true
        }
    }, [triggerFetch, Fromcurrency, Tocurrency, amount]); // Dependencies include triggerFetch and other variables

    return (
        <form className="convertor-form" onSubmit={handleformsubmit}>
            <div className="form-group">
                <label className="form-label">Enter amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group form-group-currency">
                <div className="form-section">
                    <label className="form-label">From</label>
                    <CurrencySelect
                        SelectedCurrency={Fromcurrency}
                        handleCurrency={(e) => setFromcurrency(e.target.value)}
                    />
                </div>
                <div className="swap-icon" onClick={handleSwapCurrencies}>
                    <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                            fill="#fff"
                        />
                    </svg>
                </div>

                <div className="form-section">
                    <label className="form-label">To</label>
                    <CurrencySelect
                        SelectedCurrency={Tocurrency}
                        handleCurrency={(e) => setToecurrency(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className="submit-button">Get exchange rate</button>
            <p className="exchange-result">
                {loading ? "Fetching exchange rate..." : Result}
            </p>
        </form>
    );
};

export default ConvertForm;
