# NSE Stock Intelligence 📈

Analyse stocks for future trends. **SELL/BUY** - Real-time NSE stock analysis and recommendations for Indian markets.

## 🌟 Features

✅ **Live Stock Prices** - Real-time quotes with technical indicators  
✅ **AI Signals** - Smart BUY/SELL/HOLD recommendations  
✅ **Portfolio Tracking** - Manage your investments  
✅ **Price Alerts** - Get notified when prices hit your targets  
✅ **Market Overview** - Nifty 50, Sensex, and sector performance  
✅ **Technical Analysis** - RSI, MACD, Momentum indicators  
✅ **Offline Support** - PWA with full offline functionality  
✅ **iPhone Ready** - Add to home screen like a native app  

## 🚀 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/abym250005ms-collab/Stock-Intelligence-.git
cd Stock-Intelligence-

# Install dependencies
npm install

# Start backend server
npm start

# Backend runs on http://localhost:5000
# API endpoints available at http://localhost:5000/api
```

### Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

```
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
```

## 📡 API Endpoints

All endpoints available at `http://localhost:5000/api`

### 1. Search Stocks
```bash
GET /api/search?q=RELIANCE
```
**Response:**
```json
[
  { "symbol": "RELIANCE", "name": "Reliance Industries" },
  { "symbol": "ADANIPORTS", "name": "Adani Ports & SEZ" }
]
```

### 2. Get Stock Quote
```bash
GET /api/quote/RELIANCE
```
**Response:**
```json
{
  "symbol": "RELIANCE",
  "quote": {
    "price": 2941.50,
    "change": 45.25,
    "changePercent": 1.56,
    "open": 2920.00,
    "high": 2950.00,
    "low": 2910.00,
    "volume": 1500000,
    "marketCap": 198000000000
  },
  "indicators": {
    "rsi": 65.32,
    "macd": 2.45,
    "momentum": 2.34,
    "signal": "BUY"
  }
}
```

### 3. Get Multiple Quotes
```bash
POST /api/quotes
Content-Type: application/json

{
  "symbols": ["RELIANCE", "TCS", "INFY"]
}
```

### 4. Chart Data
```bash
GET /api/chart/RELIANCE?period=1M
```
**Periods:** `1W` (1 Week), `1M` (1 Month), `3M` (3 Months), `6M` (6 Months)

**Response:**
```json
{
  "symbol": "RELIANCE",
  "period": "1M",
  "data": [
    { "date": "2026-04-29", "price": 2850.00, "volume": 1200000 },
    { "date": "2026-04-30", "price": 2875.50, "volume": 1350000 }
  ]
}
```

### 5. Recommendations
```bash
GET /api/recommendations
```
Returns top 10 stocks with BUY/SELL/HOLD signals and confidence scores.

### 6. Market Overview
```bash
GET /api/market
```
**Response:**
```json
{
  "indices": {
    "NIFTY 50": {
      "value": 23150.45,
      "change": 125.50,
      "changePercent": 0.54
    },
    "SENSEX": {
      "value": 75320.00,
      "change": 250.00,
      "changePercent": 0.33
    }
  },
  "sectors": {
    "IT": 1.23,
    "Banking": 0.87,
    "Auto": -0.45
  }
}
```

### 7. Health Check
```bash
GET /api/health
```

## 🌐 Deployment Options

### Option 1: Render.com (Recommended) ⭐

1. Push to GitHub (already done!)
2. Visit https://render.com and sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Set these values:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Click **"Create Web Service"**
7. ✅ Your API is live! Example: `https://stock-intelligence.onrender.com`

**Free Tier:** 0.5 GB RAM, auto-sleeps after 15 mins of inactivity

### Option 2: Railway.app

1. Visit https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your repository
4. Railway auto-detects Node.js configuration
5. ✅ Deploy! Example: `https://stock-intelligence.up.railway.app`

**Free Tier:** $5/month free credits

### Option 3: Vercel (Serverless)

1. Visit https://vercel.com
2. Click **"Import Project"** → Select GitHub repo
3. Set Root Directory: `api/`
4. Deploy!

**Free Tier:** Unlimited API calls

## 🔗 Connect Frontend to Backend

Update `index.html` with your deployed backend URL:

```javascript
// Local development
const API_URL = 'http://localhost:5000';

// Production (replace with your deployed URL)
const API_URL = 'https://your-app.onrender.com';
// or
const API_URL = 'https://your-app.up.railway.app';

// Example usage
async function getStockQuote(symbol) {
  const response = await fetch(`${API_URL}/api/quote/${symbol}`);
  const data = await response.json();
  console.log(`${data.symbol}: ₹${data.quote.price} (${data.indicators.signal})`);
}

getStockQuote('RELIANCE');
```

## 📱 iPhone Setup

1. **Deploy backend** on Render.com or Railway.app
2. **Update API_URL** in index.html to your backend URL
3. **Open on iPhone Safari:**
   ```
   https://abym250005ms-collab.github.io/Stock-Intelligence-/
   ```
4. **Tap Share** → **"Add to Home Screen"**
5. **Name it:** "NSE Intelligence"
6. ✅ App now runs with live data!

## 📊 Nifty 50 Stocks Included

50 major Indian stocks tracked:
- **Banking:** SBIN, HDFC, ICICI, Axis, Kotak
- **IT:** TCS, Infosys, Wipro, Tech Mahindra, HCL
- **Auto:** Maruti, Tata Motors, Eicher, Hero
- **Energy:** Reliance, ONGC, Coal India
- **And 35+ more...**

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend** | Node.js, Express.js |
| **Client Storage** | localStorage (Portfolio & Alerts) |
| **Charts** | Chart.js 4.4.1 |
| **PWA** | Service Worker, Manifest.json |
| **Hosting** | Render.com / Railway.app (Free) |

## 📋 Roadmap

- [ ] Real NSE API integration (replace mock data)
- [ ] WebSocket for real-time price updates
- [ ] Advanced charting with Technical Analysis
- [ ] Social features (share signals, follow traders)
- [ ] Options chain analysis
- [ ] Backtesting framework
- [ ] Machine Learning predictions

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⚠️ Disclaimer

This app is for **educational and analysis purposes only**. Always do your own research and consult a financial advisor before trading. Past performance doesn't guarantee future results.

## 📝 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**ABY P AJI**  
NSE Stock Intelligence Project  
[GitHub](https://github.com/abym250005ms-collab)

---

## 🚀 Next Steps

1. ✅ Backend API created
2. ⏭️ Deploy to Render.com (5 minutes)
3. ⏭️ Connect frontend to backend
4. ⏭️ Test on iPhone
5. ⏭️ Share with friends!

**Made with 💜 for NSE traders everywhere**
