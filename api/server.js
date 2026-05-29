import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Nifty 50 companies list
const NIFTY_50 = [
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank' },
  { symbol: 'INFY', name: 'Infosys' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki' },
  { symbol: 'AXISBANK', name: 'Axis Bank' },
  { symbol: 'LT', name: 'Larsen & Toubro' },
  { symbol: 'WIPRO', name: 'Wipro' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints' },
  { symbol: 'TITAN', name: 'Titan Company' },
  { symbol: 'NESTLEIND', name: 'Nestle India' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors' },
  { symbol: 'TECHM', name: 'Tech Mahindra' },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv' },
  { symbol: 'JSWSTEEL', name: 'JSW Steel' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical' },
  { symbol: 'DRREDDY', name: "Dr. Reddy's Laboratories" },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance' },
  { symbol: 'HDFCLIFE', name: 'HDFC Life Insurance' },
  { symbol: 'EICHERMOT', name: 'Eicher Motors' },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp' },
  { symbol: 'NTPC', name: 'NTPC' },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation' },
  { symbol: 'ONGC', name: 'Oil & Natural Gas' },
  { symbol: 'COALINDIA', name: 'Coal India' },
  { symbol: 'M&M', name: 'Mahindra & Mahindra' },
  { symbol: 'GRASIM', name: 'Grasim Industries' },
  { symbol: 'HINDALCO', name: 'Hindalco Industries' },
  { symbol: 'TATASTEEL', name: 'Tata Steel' },
  { symbol: 'TATACONSUM', name: 'Tata Consumer Products' },
  { symbol: 'ADANIPORTS', name: 'Adani Ports & SEZ' },
  { symbol: 'ADANIENT', name: 'Adani Enterprises' },
  { symbol: 'CIPLA', name: 'Cipla' },
  { symbol: 'ITC', name: 'ITC' },
  { symbol: 'BRITANNIA', name: 'Britannia' },
  { symbol: 'DIVISLAB', name: "Divi's Laboratories" },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank' },
  { symbol: 'HCLTECH', name: 'HCL Technologies' },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement' },
  { symbol: 'BPCL', name: 'BPCL' },
  { symbol: 'BEL', name: 'Bharat Electronics' },
  { symbol: 'SBILIFE', name: 'SBI Life Insurance' },
  { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals' },
  { symbol: 'TRENT', name: 'Trent' }
];

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

// Helper to generate realistic mock quotes
function generateMockQuote(symbol) {
  const basePrice = Math.random() * 10000 + 500;
  const change = (Math.random() - 0.5) * 500;
  const rsi = Math.random() * 100;
  
  return {
    symbol,
    quote: {
      price: parseFloat(basePrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(((change / basePrice) * 100).toFixed(2)),
      open: parseFloat((basePrice - Math.random() * 100).toFixed(2)),
      high: parseFloat((basePrice + Math.random() * 200).toFixed(2)),
      low: parseFloat((basePrice - Math.random() * 200).toFixed(2)),
      volume: Math.floor(Math.random() * 10000000),
      marketCap: Math.floor(Math.random() * 1000000000000)
    },
    indicators: {
      rsi: parseFloat(rsi.toFixed(2)),
      macd: parseFloat((Math.random() * 10 - 5).toFixed(2)),
      momentum: parseFloat(((change / basePrice) * 100 * 1.5).toFixed(2)),
      signal: rsi > 70 ? 'SELL' : rsi < 30 ? 'BUY' : 'HOLD'
    }
  };
}

function generateChartData(symbol, period) {
  const points = period === '1W' ? 7 : period === '1M' ? 30 : period === '3M' ? 90 : 180;
  const data = [];
  let price = Math.random() * 10000 + 500;

  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.5) * 200;
    data.push({
      date: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: Math.max(parseFloat(price.toFixed(2)), 100),
      volume: Math.floor(Math.random() * 5000000)
    });
  }

  return { symbol, period, data };
}

function generateMockRecommendations() {
  return NIFTY_50.slice(0, 10).map(stock => ({
    symbol: stock.symbol,
    name: stock.name,
    price: parseFloat((Math.random() * 10000).toFixed(2)),
    change: parseFloat(((Math.random() - 0.5) * 500).toFixed(2)),
    changePercent: parseFloat(((Math.random() - 0.5) * 10).toFixed(2)),
    signal: ['BUY', 'SELL', 'HOLD'][Math.floor(Math.random() * 3)],
    confidence: parseFloat((Math.random() * 40 + 60).toFixed(1))
  }));
}

// API Routes

// Root endpoint - API documentation
app.get('/', (req, res) => {
  res.json({
    status: '✅ NSE Stock Intelligence API is LIVE',
    version: '1.0.0',
    description: 'Analyse stocks for future trends. SELL/BUY',
    baseUrl: 'https://stock-intelligence-ag0e.onrender.com/api',
    endpoints: {
      search: {
        method: 'GET',
        url: '/api/search?q=RELIANCE',
        description: 'Search stocks by symbol or name'
      },
      quote: {
        method: 'GET',
        url: '/api/quote/:symbol',
        description: 'Get stock quote with indicators',
        example: '/api/quote/RELIANCE'
      },
      multipleQuotes: {
        method: 'POST',
        url: '/api/quotes',
        description: 'Get multiple stock quotes',
        body: { symbols: ['RELIANCE', 'TCS', 'INFY'] }
      },
      chart: {
        method: 'GET',
        url: '/api/chart/:symbol?period=1M',
        description: 'Get chart data (1W, 1M, 3M, 6M)',
        example: '/api/chart/RELIANCE?period=1M'
      },
      recommendations: {
        method: 'GET',
        url: '/api/recommendations',
        description: 'Get stock recommendations with BUY/SELL/HOLD signals'
      },
      market: {
        method: 'GET',
        url: '/api/market',
        description: 'Get market overview (indices and sector performance)'
      },
      health: {
        method: 'GET',
        url: '/api/health',
        description: 'Health check endpoint'
      }
    },
    nifty50Count: NIFTY_50.length,
    timestamp: new Date().toISOString()
  });
});

// 1. Search stocks
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json(NIFTY_50);
  }

  const filtered = NIFTY_50.filter(stock => 
    stock.symbol.toLowerCase().includes(q.toLowerCase()) ||
    stock.name.toLowerCase().includes(q.toLowerCase())
  );

  res.json(filtered);
});

// 2. Get stock quote
app.get('/api/quote/:symbol', (req, res) => {
  const { symbol } = req.params;
  
  try {
    const cacheKey = `${symbol}_${Math.floor(Date.now() / CACHE_DURATION)}`;
    
    if (cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
    }

    const quote = generateMockQuote(symbol.toUpperCase());
    cache.set(cacheKey, quote);
    res.json(quote);
  } catch (error) {
    console.error('Quote error:', error);
    res.json(generateMockQuote(symbol));
  }
});

// 3. Get multiple quotes
app.post('/api/quotes', (req, res) => {
  const { symbols } = req.body;
  
  if (!Array.isArray(symbols) || symbols.length === 0) {
    return res.status(400).json({ error: 'symbols array required' });
  }

  try {
    const quotes = symbols.map(sym => generateMockQuote(sym.toUpperCase()));
    res.json(quotes);
  } catch (error) {
    console.error('Quotes error:', error);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// 4. Get chart data
app.get('/api/chart/:symbol', (req, res) => {
  const { symbol } = req.params;
  const { period = '1M' } = req.query;

  try {
    const data = generateChartData(symbol.toUpperCase(), period);
    res.json(data);
  } catch (error) {
    console.error('Chart error:', error);
    res.json(generateChartData(symbol, period));
  }
});

// 5. Get recommendations
app.get('/api/recommendations', (req, res) => {
  try {
    const recommendations = generateMockRecommendations();
    res.json(recommendations);
  } catch (error) {
    console.error('Recommendations error:', error);
    res.json(generateMockRecommendations());
  }
});

// 6. Get market overview
app.get('/api/market', (req, res) => {
  try {
    const indices = {
      'NIFTY 50': {
        value: parseFloat((23000 + Math.random() * 2000).toFixed(2)),
        change: parseFloat(((Math.random() - 0.5) * 500).toFixed(2)),
        changePercent: parseFloat(((Math.random() - 0.5) * 2).toFixed(2))
      },
      'SENSEX': {
        value: parseFloat((75000 + Math.random() * 5000).toFixed(2)),
        change: parseFloat(((Math.random() - 0.5) * 1000).toFixed(2)),
        changePercent: parseFloat(((Math.random() - 0.5) * 2).toFixed(2))
      },
      'NIFTY BANK': {
        value: parseFloat((55000 + Math.random() * 3000).toFixed(2)),
        change: parseFloat(((Math.random() - 0.5) * 750).toFixed(2)),
        changePercent: parseFloat(((Math.random() - 0.5) * 2.5).toFixed(2))
      }
    };

    const sectors = {
      'IT': parseFloat(((Math.random() - 0.5) * 3).toFixed(2)),
      'Banking': parseFloat(((Math.random() - 0.5) * 2.5).toFixed(2)),
      'Auto': parseFloat(((Math.random() - 0.5) * 4).toFixed(2)),
      'Energy': parseFloat(((Math.random() - 0.5) * 3.5).toFixed(2)),
      'Pharma': parseFloat(((Math.random() - 0.5) * 2).toFixed(2)),
      'FMCG': parseFloat(((Math.random() - 0.5) * 1.5).toFixed(2))
    };

    res.json({ indices, sectors });
  } catch (error) {
    console.error('Market error:', error);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

// 7. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ NSE Stock Intelligence API running on port ${PORT}`);
  console.log(`📊 API Base: http://localhost:${PORT}/api`);
  console.log(`🔍 Search: GET /api/search?q=RELIANCE`);
  console.log(`📈 Quote: GET /api/quote/RELIANCE`);
  console.log(`💹 Market: GET /api/market`);
});
