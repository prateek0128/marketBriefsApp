const data = [
  {
    authors: ["MoneyControl"],
    categories: ["Stocks", "Startups"],
    date_extracted: false,
    engagement: { comments: 2, likes: 1 },
    experience_levels: ["novice", "beginner", "intermediate", "expert"],
    id: "68d117b6f1d9c670410cce86",
    impact_label: "Exceptional Impact",
    impact_score: 9.5,
    market_mood: { negative: 0, neutral: 15, positive: 85 },
    published_at: "2025-09-22T08:22:18Z",
    reading_level: "Multi-Level",
    sentiment_label: "bullish",
    sentiment_score: 0.85,
    sentiment_source: "gpt",
    source: "MoneyControl",
    summary:
      "Phonepe's adjusted EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization) (excluding ESOP costs) more than doubled to Rs 1,477 crore from the previous year",
    summary_by_level: {
      beginner:
        "• PhonePe's revenue rose to Rs 7,115 crore in FY25, a 40% increase year-on-year. • This growth was driven by the company's expansion into financial services beyond just payments. • For average investors, this indicates a strong performance and potential for future growth.",
      expert:
        "• PhonePe's FY25 revenue reached Rs 7,115 crore, reflecting a 40% year-on-year growth, with adjusted PAT (Profit After Tax) soaring 220% to Rs 630 crore. • This performance is driven by a strategic shift towards financial services, including loan distribution and stock broking, alongside core payment operations. • These results could influence market sentiment towards fintech stocks, potentially leading to increased trading volumes and investment strategies focused on diversified financial service providers.",
      intermediate:
        "• PhonePe reported a 40% revenue increase to Rs 7,115 crore in FY25, with adjusted PAT (Profit After Tax) up 220% to Rs 630 crore. • This surge is attributed to the company's strategic diversification into loan distribution and stock broking. • Such developments may positively impact the fintech sector and attract more investments in similar companies.",
      novice:
        "• PhonePe's revenue increased by 40% to Rs 7,115 crore in FY25. • This growth is important as it shows the company's success in expanding its services. • It's like a restaurant that starts offering delivery and catering, boosting its earnings significantly.",
    },
    tag: "bullish",
    time_ago: "22 hours ago",
    title:
      "IPO (Initial Public Offering)-bound PhonePe's FY25 revenue rises 40%, adjusted PAT (Profit After Tax) up 220%",
    title_by_level: {
      beginner: "PhonePe Reports 40% Revenue Growth and 220% Profit Increase",
      expert:
        "PhonePe Achieves 40% Revenue Growth and 220% PAT (Profit After Tax) Surge Amid Strategic Diversification",
      intermediate:
        "PhonePe's FY25 Revenue Rises 40% Driven by Financial Services Expansion",
      novice: "PhonePe's Revenue Grows Significantly",
    },
    url: "https://www.moneycontrol.com/news/business/startup/ipo-bound-phonepe-s-fy25-revenue-rises-40-adjusted-pat-up-220-13566221.html",
  },
  {
    authors: ["LiveMint"],
    categories: ["Stocks", "Economy"],
    date_extracted: false,
    engagement: { comments: 0, likes: 0 },
    experience_levels: ["novice", "beginner", "intermediate", "expert"],
    id: "68d113c38af3c0ece6cabe04",
    impact_label: "Exceptional Impact",
    impact_score: 9.3,
    market_mood: { negative: 65, neutral: 35, positive: 0 },
    published_at: "2025-09-22T09:04:20Z",
    reading_level: "Multi-Level",
    sentiment_label: "bearish",
    sentiment_score: -0.65,
    sentiment_source: "gpt",
    source: "LiveMint",
    summary:
      "Stock Market News: Share Market Today: India stock market news, world share market news and updates on Mint. Indian investors, Sensex latest updates.",
    summary_by_level: {
      beginner:
        "• The US government raised H-1B visa fees from $1.5–4K to $100,000 annually.• This increase is expected to pressure project margins for Indian IT (Information Technology) firms.• Investors should be cautious as this could lead to lower profits for these companies.",
      expert:
        "• The US has increased H-1B visa fees to $100,000, affecting new applications and potentially reducing Indian IT (Information Technology) export growth below 4%.• This policy shift is seen as a tactical maneuver in trade negotiations, with significant implications for project margins and operational strategies.• The Indian IT (Information Technology) sector's reliance on H-1B visas could lead to a reevaluation of investment strategies, particularly for firms heavily dependent on traditional staffing models.",
      intermediate:
        "• The H-1B visa fee hike could disrupt Indian IT (Information Technology) exports, which were valued at $181 billion in FY25. • Analysts suggest this move is a tactic in US trade negotiations, impacting project delivery models. • Medium-sized firms may face more significant challenges compared to larger firms that have diversified their hiring strategies.",
      novice:
        "• The US has increased H-1B visa fees significantly. • This change can hurt Indian IT (Information Technology) companies and their profits. • It's like raising the cost of a ticket to a concert that many people rely on to attend.",
    },
    tag: "bearish",
    time_ago: "21 hours ago",
    title:
      "H-1B visa fee hike: Are Trump's tariffs getting extended to services? Explained",
    title_by_level: {
      beginner:
        "H-1B Visa Fee Hike Impacts Indian IT (Information Technology) Companies Significantly",
      expert:
        "Strategic Implications of H-1B Visa Fee Hike on Indian IT (Information Technology) Sector's Profitability",
      intermediate:
        "H-1B Visa Fee Increase Threatens Margins in Indian IT (Information Technology) Sector",
      novice:
        "H-1B Visa Fees Increase Affects Indian IT (Information Technology) Sector",
    },
    url: "https://www.livemint.com/market/stock-market-news/h1b-visa-fee-hike-are-trumps-tariffs-getting-extended-to-services-explained-11758526588002.html",
  },
];

const filterData = [
  {
    id: "68ce5800cc337f3620ea8f93",
    title:
      "Trading in Piramal Enterprises shares suspends from September 23 following merger with Piramal Finance",
    summary:
      "SynopsisThe NSE (National Stock Exchange) will suspend trading of Piramal Enterprises Ltd (PEL) shares effective September 23, 2025, due to its amalgamation with Piramal Finance Ltd (PFL), a move sanctioned by the NCLT. This merger, driven by RBI (Reserve Bank of India) regulations and strategic benefits, consolidates operations under a single entity, enhancing service and shareholder value. CFO (Chief Financial Officer) Upma Goel will resign by September 30.",
    url: "https://economictimes.indiatimes.com/markets/stocks/news/trading-in-piramal-enterprises-shares-suspends-from-september-23-following-merger-with-piramal-finance/articleshow/124010903.cms",
    source: "EconomicTimes",
    published_at: "2025-09-20T05:44:00Z",
    date_extracted: false,
    time_ago: "2 days ago",
    categories: ["Stocks", "Economy"],
    impact_score: 10,
    impact_label: "Exceptional Impact",
    sentiment_score: 0,
    sentiment_label: "neutral",
    market_mood: {
      negative: 0,
      neutral: 100,
      positive: 0,
    },
    sentiment_source: "gpt",
    authors: ["EconomicTimes"],
    engagement: {
      likes: 0,
      comments: 1,
    },
    tag: "neutral",
    title_by_level: {
      beginner: "Trading in Piramal Enterprises Shares Suspended Due to Merger",
      expert:
        "Piramal Enterprises Suspends Trading Amid Strategic Merger With Piramal Finance, Effective September 23",
      intermediate:
        "Piramal Enterprises Suspends Trading Following Merger With Piramal Finance",
      novice: "Piramal Enterprises Shares Suspended From Trading",
    },
    summary_by_level: {
      beginner:
        "• The National Stock Exchange has suspended trading in Piramal Enterprises shares starting September 23. \n• This suspension follows the approved merger with Piramal Finance, aimed at compliance with RBI (Reserve Bank of India) regulations. \n• Investors should note that shareholders will receive shares in the new merged entity.",
      expert:
        "• Trading in Piramal Enterprises shares will be suspended from September 23 following the NCLT-approved merger with Piramal Finance. \n• This strategic amalgamation addresses RBI (Reserve Bank of India) regulations prohibiting multiple NBFC (Non-Banking Financial Company)-ICCs within the same group, enhancing compliance and operational synergy. \n• The merger is anticipated to improve profitability and shareholder value by consolidating financial services under a single entity.",
      intermediate:
        "• The NSE (National Stock Exchange) has announced the suspension of Piramal Enterprises shares due to its merger with Piramal Finance, effective September 23. \n• This merger was approved by the NCLT to comply with RBI (Reserve Bank of India) regulations regarding NBFCs. \n• The consolidation is expected to enhance operational efficiency and shareholder value through a unified platform.",
      novice:
        "• Trading in Piramal Enterprises shares will stop from September 23. \n• This is because of a merger with Piramal Finance. \n• It's like two companies becoming one to serve customers better.",
    },
    reading_level: "Multi-Level",
    experience_levels: ["novice", "beginner", "intermediate", "expert"],
  },
  {
    id: "68ccf9c831d114aaa6a2c8ec",
    title:
      "GST (Goods and Services Tax) cuts, Fed rate action spark market optimism:  Alok Agarwal",
    summary:
      "SynopsisAlok Agarwal sees brighter prospects for Indian equities, citing tax reforms, GST (Goods and Services Tax) cuts, and global easing as growth drivers. While trade talks with the US remain a hurdle, cooling valuations, resilient earnings, and emerging sectoral opportunities point to renewed investor confidence and potential FII (Foreign Institutional Investor) inflows after earlier outflows.",
    url: "https://economictimes.indiatimes.com/markets/stocks/news/gst-cuts-fed-rate-action-spark-market-optimism-alok-agarwal/articleshow/123991730.cms",
    source: "EconomicTimes",
    published_at: "2025-09-19T06:21:00Z",
    date_extracted: false,
    time_ago: "3 days ago",
    categories: ["Stocks", "Economy"],
    impact_score: 9.796,
    impact_label: "Exceptional Impact",
    sentiment_score: 0.75,
    sentiment_label: "bullish",
    market_mood: {
      negative: 0,
      neutral: 25,
      positive: 75,
    },
    sentiment_source: "gpt",
    authors: ["EconomicTimes"],
    engagement: {
      likes: 0,
      comments: 0,
    },
    tag: "bullish",
    title_by_level: {
      beginner:
        "GST (Goods and Services Tax) Reforms and Fed Rate Cuts Spark Optimism in Indian Markets",
      expert:
        "GST (Goods and Services Tax) Reforms and Federal Reserve Rate Cuts Indicate Strategic Recovery for Indian Equity Markets",
      intermediate:
        "GST (Goods and Services Tax) Rate Cuts and Fed Easing Signal Positive Shift for Indian Equities",
      novice:
        "GST (Goods and Services Tax) Cuts and Fed Rate Action Boost Market Outlook",
    },
    summary_by_level: {
      beginner:
        "• The recent GST (Goods and Services Tax) reforms and a 25 basis point Fed rate cut have uplifted market sentiment. \n• These changes are expected to boost consumption and attract foreign investments. \n• For average investors, this could mean better returns on their investments.",
      expert:
        "• The recent GST (Goods and Services Tax) 2.0 reforms and a 25 basis point cut by the Federal Reserve have created a favorable environment for Indian equities, with a notable 10% earnings growth in the Nifty 500. \n• These developments are underpinned by fiscal measures and a potential trade deal with the US, which could significantly enhance market liquidity and investor sentiment. \n• Strategic shifts towards emerging sectors such as consumer discretionary and industrials may redefine investment strategies, especially as India's valuation premium narrows.",
      intermediate:
        "• The combination of GST (Goods and Services Tax) cuts and Fed rate reductions has led to a positive outlook for Indian equities, with Nifty 500 earnings growing by 10%. \n• This optimism is driven by improved consumption and potential foreign institutional investor (FII (Foreign Institutional Investor)) inflows. \n• Specific sectors like consumer discretionary and industrials may outperform traditional heavyweights in the coming months.",
      novice:
        "• Recent GST (Goods and Services Tax) cuts and Fed rate actions have improved market outlook. \n• This is important as it may lead to better investment opportunities. \n• Think of it like a sale where prices drop, encouraging more buyers.",
    },
    reading_level: "Multi-Level",
    experience_levels: ["novice", "beginner", "intermediate", "expert"],
  },
];

const newsDataById = {
  authors: ["EconomicTimes"],
  categories: ["Stocks", "Economy"],
  content: "",
  date_extracted: false,
  engagement: {
    comments: 1,
    likes: 0,
  },
  experience_levels: ["novice", "beginner", "intermediate", "expert"],
  id: "68ce5800cc337f3620ea8f93",
  impact_label: "Exceptional Impact",
  impact_score: 10,
  market_mood: {
    negative: 0,
    neutral: 100,
    positive: 0,
  },
  published_at: "2025-09-20T05:44:00Z",
  reading_level: "Multi-Level",
  sentiment_label: "neutral",
  sentiment_score: 0,
  sentiment_source: "gpt",
  source: "EconomicTimes",
  summary:
    "The NSE (National Stock Exchange) will suspend trading of Piramal Enterprises Ltd (PEL) shares effective September 23, 2025, due to its amalgamation with Piramal Finance Ltd (PFL), a move sanctioned by the NCLT. This merger, driven by RBI (Reserve Bank of India) regulations and strategic benefits, consolidates operations under a single entity, enhancing service and shareholder value. CFO Upma Goel will resign by September 30.",
  summary_by_level: {
    novice:
      "• Trading in Piramal Enterprises shares will stop from September 23.\n• This is because of a merger with Piramal Finance.\n• It's like two companies becoming one to serve customers better.",
    beginner:
      "• The National Stock Exchange has suspended trading in Piramal Enterprises shares starting September 23.\n• This suspension follows the approved merger with Piramal Finance, aimed at compliance with RBI (Reserve Bank of India) regulations.\n• Investors should note that shareholders will receive shares in the new merged entity.",
    intermediate:
      "• The NSE (National Stock Exchange) has announced the suspension of Piramal Enterprises shares due to its merger with Piramal Finance, effective September 23.\n• This merger was approved by the NCLT to comply with RBI (Reserve Bank of India) regulations regarding NBFCs.\n• The consolidation is expected to enhance operational efficiency and shareholder value through a unified platform.",
    expert:
      "• Trading in Piramal Enterprises shares will be suspended from September 23 following the NCLT-approved merger with Piramal Finance.\n• This strategic amalgamation addresses RBI (Reserve Bank of India) regulations prohibiting multiple NBFC (Non-Banking Financial Company)-ICCs within the same group, enhancing compliance and operational synergy.\n• The merger is anticipated to improve profitability and shareholder value by consolidating financial services under a single entity.",
  },
  tag: "neutral",
  time_ago: "3 days ago",
  title:
    "Trading in Piramal Enterprises shares suspends from September 23 following merger with Piramal Finance",
  title_by_level: {
    novice: "Piramal Enterprises Shares Suspended From Trading",
    beginner: "Trading in Piramal Enterprises Shares Suspended Due to Merger",
    intermediate:
      "Piramal Enterprises Suspends Trading Following Merger With Piramal Finance",
    expert:
      "Piramal Enterprises Suspends Trading Amid Strategic Merger With Piramal Finance, Effective September 23",
  },
  url: "https://economictimes.indiatimes.com/markets/stocks/news/trading-in-piramal-enterprises-shares-suspends-from-september-23-following-merger-with-piramal-finance/articleshow/124010903.cms",
};
const profile = {
  created_at: "2025-07-31T12:24:03.247Z",
  device_token: "",
  device_type: "",
  email: "rajput.prateek28@gmail.com",
  id: "688b6063744fe82c289f5561",
  interests: ["Startups", "Mutual Funds", "Crypto", "Economy"],
  name: "New User",
  notification__settings: {
    enable_market_summaries: false,
    enable_news_alerts: false,
    enable_price_alerts: false,
  },
  onboarding_completed: true,
  phone: "",
  preferred_index: "",
};

const newsDataById2 = {
  authors: ["MoneyControl"],
  categories: ["Stocks", "Startups"],
  content: "",
  date_extracted: false,
  engagement: { comments: 2, likes: 1 },
  id: "68d117b6f1d9c670410cce86",
  impact_label: "Exceptional Impact",
  impact_score: 9.5,
  market_mood: { negative: 0, neutral: 15, positive: 85 },
  published_at: "2025-09-22T08:22:18Z",
  sentiment_label: "bullish",
  sentiment_score: 0.85,
  sentiment_source: "gpt",
  source: "MoneyControl",
  summary:
    "Phonepe's adjusted EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization) (excluding ESOP costs) more than doubled to Rs 1,477 crore from the previous year",
  tag: "bullish",
  time_ago: "22 hours ago",
  title:
    "IPO (Initial Public Offering)-bound PhonePe's FY25 revenue rises 40%, adjusted PAT (Profit After Tax) up 220%",
  url: "https://www.moneycontrol.com/news/business/startup/ipo-bound-phonepe-s-fy25-revenue-rises-40-adjusted-pat-up-220-13566221.html",
};

const savedNews = [
  {
    bookmark_status: "pin",
    news: {
      id: "68ccf9c831d114aaa6a2c8ec",
      title:
        "GST (Goods and Services Tax) Reforms and Federal Reserve Rate Cuts Indicate Strategic Recovery for Indian Equity Markets",
      summary:
        "• The recent GST (Goods and Services Tax) 2.0 reforms and a 25 basis point cut by the Federal Reserve have created a favorable environment for Indian equities, with a notable 10% earnings growth in the Nifty 500. \n• These developments are underpinned by fiscal measures and a potential trade deal with the US, which could significantly enhance market liquidity and investor sentiment. \n• Strategic shifts towards emerging sectors such as consumer discretionary and industrials may redefine investment strategies, especially as India's valuation premium narrows.",
      url: "https://economictimes.indiatimes.com/markets/stocks/news/gst-cuts-fed-rate-action-spark-market-optimism-alok-agarwal/articleshow/123991730.cms",
      source: "EconomicTimes",
      published_at: "2025-09-19T06:21:00Z",
      date_extracted: false,
      time_ago: "4 days ago",
      categories: ["Stocks", "Economy"],
      impact_score: 9.796,
      impact_label: "Exceptional Impact",
      sentiment_score: 0.75,
      sentiment_label: "bullish",
      market_mood: {
        negative: 0,
        neutral: 25,
        positive: 75,
      },
      sentiment_source: "gpt",
      authors: ["EconomicTimes"],
      engagement: {
        likes: 0,
        comments: 0,
      },
      tag: "bullish",
      title_by_level: {
        beginner:
          "GST (Goods and Services Tax) Reforms and Fed Rate Cuts Spark Optimism in Indian Markets",
        expert:
          "GST (Goods and Services Tax) Reforms and Federal Reserve Rate Cuts Indicate Strategic Recovery for Indian Equity Markets",
        intermediate:
          "GST (Goods and Services Tax) Rate Cuts and Fed Easing Signal Positive Shift for Indian Equities",
        novice:
          "GST (Goods and Services Tax) Cuts and Fed Rate Action Boost Market Outlook",
      },
      summary_by_level: {
        beginner:
          "• The recent GST (Goods and Services Tax) reforms and a 25 basis point Fed rate cut have uplifted market sentiment. \n• These changes are expected to boost consumption and attract foreign investments. \n• For average investors, this could mean better returns on their investments.",
        expert:
          "• The recent GST (Goods and Services Tax) 2.0 reforms and a 25 basis point cut by the Federal Reserve have created a favorable environment for Indian equities, with a notable 10% earnings growth in the Nifty 500. \n• These developments are underpinned by fiscal measures and a potential trade deal with the US, which could significantly enhance market liquidity and investor sentiment. \n• Strategic shifts towards emerging sectors such as consumer discretionary and industrials may redefine investment strategies, especially as India's valuation premium narrows.",
        intermediate:
          "• The combination of GST (Goods and Services Tax) cuts and Fed rate reductions has led to a positive outlook for Indian equities, with Nifty 500 earnings growing by 10%. \n• This optimism is driven by improved consumption and potential foreign institutional investor (FII (Foreign Institutional Investor)) inflows. \n• Specific sectors like consumer discretionary and industrials may outperform traditional heavyweights in the coming months.",
        novice:
          "• Recent GST (Goods and Services Tax) cuts and Fed rate actions have improved market outlook. \n• This is important as it may lead to better investment opportunities. \n• Think of it like a sale where prices drop, encouraging more buyers.",
      },
      reading_level: "Multi-Level",
      experience_levels: ["novice", "beginner", "intermediate", "expert"],
    },
  },
  {
    bookmark_status: "pin",
    news: {
      id: "68ce5800cc337f3620ea8f93",
      title:
        "Piramal Enterprises Suspends Trading Amid Strategic Merger With Piramal Finance, Effective September 23",
      summary:
        "• Trading in Piramal Enterprises shares will be suspended from September 23 following the NCLT-approved merger with Piramal Finance. \n• This strategic amalgamation addresses RBI (Reserve Bank of India) regulations prohibiting multiple NBFC (Non-Banking Financial Company)-ICCs within the same group, enhancing compliance and operational synergy. \n• The merger is anticipated to improve profitability and shareholder value by consolidating financial services under a single entity.",
      url: "https://economictimes.indiatimes.com/markets/stocks/news/trading-in-piramal-enterprises-shares-suspends-from-september-23-following-merger-with-piramal-finance/articleshow/124010903.cms",
      source: "EconomicTimes",
      published_at: "2025-09-20T05:44:00Z",
      date_extracted: false,
      time_ago: "3 days ago",
      categories: ["Stocks", "Economy"],
      impact_score: 10,
      impact_label: "Exceptional Impact",
      sentiment_score: 0,
      sentiment_label: "neutral",
      market_mood: {
        negative: 0,
        neutral: 100,
        positive: 0,
      },
      sentiment_source: "gpt",
      authors: ["EconomicTimes"],
      engagement: {
        likes: 0,
        comments: 1,
      },
      tag: "neutral",
      title_by_level: {
        beginner:
          "Trading in Piramal Enterprises Shares Suspended Due to Merger",
        expert:
          "Piramal Enterprises Suspends Trading Amid Strategic Merger With Piramal Finance, Effective September 23",
        intermediate:
          "Piramal Enterprises Suspends Trading Following Merger With Piramal Finance",
        novice: "Piramal Enterprises Shares Suspended From Trading",
      },
      summary_by_level: {
        beginner:
          "• The National Stock Exchange has suspended trading in Piramal Enterprises shares starting September 23. \n• This suspension follows the approved merger with Piramal Finance, aimed at compliance with RBI (Reserve Bank of India) regulations. \n• Investors should note that shareholders will receive shares in the new merged entity.",
        expert:
          "• Trading in Piramal Enterprises shares will be suspended from September 23 following the NCLT-approved merger with Piramal Finance. \n• This strategic amalgamation addresses RBI (Reserve Bank of India) regulations prohibiting multiple NBFC (Non-Banking Financial Company)-ICCs within the same group, enhancing compliance and operational synergy. \n• The merger is anticipated to improve profitability and shareholder value by consolidating financial services under a single entity.",
        intermediate:
          "• The NSE (National Stock Exchange) has announced the suspension of Piramal Enterprises shares due to its merger with Piramal Finance, effective September 23. \n• This merger was approved by the NCLT to comply with RBI (Reserve Bank of India) regulations regarding NBFCs. \n• The consolidation is expected to enhance operational efficiency and shareholder value through a unified platform.",
        novice:
          "• Trading in Piramal Enterprises shares will stop from September 23. \n• This is because of a merger with Piramal Finance. \n• It's like two companies becoming one to serve customers better.",
      },
      reading_level: "Multi-Level",
      experience_levels: ["novice", "beginner", "intermediate", "expert"],
    },
  },
];
const commentData = {
  comments: [
    {
      comment: "Good news",
      commented_at: "2025-10-03T09:56:03Z",
      id: "68df9db33bbc2e4a49974879",
      likes: 0,
      name: "New User",
      news_id: "68df7ad53a460d15387d7ba3",
      unlike_count: 0,
      user_has_liked: false,
      user_has_unliked: false,
      user_id: "68a5b9df7b444632e8cbdef1",
    },
  ],
  pagination: {
    has_next: false,
    has_previous: false,
    page: 1,
    page_size: 20,
    total: 1,
    total_pages: 1,
  },
};
