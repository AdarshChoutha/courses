# Stock Price Checker

This project is a completed implementation of the FreeCodeCamp Information Security Stock Price Checker.

## Features
- View real-time stock prices for any symbol
- Like stocks (likes are tracked per user/IP)
- Compare two stocks and see relative likes
- Fully tested with functional tests

## How to Use
1. Install dependencies:
	```bash
	npm install
	```
2. Start the server:
	```bash
	npm run start
	```
3. Visit [http://localhost:3000](http://localhost:3000) in your browser.

### API Endpoints
- `GET /api/stock-prices?stock=GOOG` - View one stock
- `GET /api/stock-prices?stock=GOOG&like=true` - Like a stock
- `GET /api/stock-prices?stock=GOOG&stock=MSFT` - Compare two stocks
- `GET /api/stock-prices?stock=GOOG&stock=MSFT&like=true` - Like both stocks and compare
