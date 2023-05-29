import React from 'react';

const PriceAnalysis = ({ capital_price, product_price }) => {
	const analysis_number = ((capital_price - product_price) * 100) / capital_price;

	if (analysis_number < 0) {
		return (
			<p className={`text-[0.5rem] text-center text-red-500`}>
				Harga Naik Profit &le; {Math.abs(analysis_number).toFixed(2)}%
			</p>
		);
	} else if (analysis_number > 0) {
		return (
			<p className={`text-[0.5rem] text-center text-green-500`}>
				Harga Turun Profit &ge; {Math.abs(analysis_number).toFixed(2)}%
			</p>
		);
	} else {
		return <p className={`text-[0.5rem] text-center text-sky-500`}>Harga Tetap Profit = 0% </p>;
	}
};

export default PriceAnalysis;
