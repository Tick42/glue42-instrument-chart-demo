export type SymbolMap = { glue42: string, yf: string};

class Config {
    public DefaultSymbol = "BARC:LN";
    public SymbolsMap : {[key: string]: SymbolMap} = {
      "VOD:LN": { glue42: "VOD:LN", yf: "VOD.L" },
      "BARC:LN": { glue42: "BARC:LN", yf: "BARC.L" },
      "BMW:GR": { glue42: "BMW:GR", yf: "BMW.DE" },
      "AAL:LN": { glue42: "AAL:LN", yf: "AAL.L" },
      "GOOGL:US": { glue42: "GOOGL:US", yf: "GOOG" },
      "MSFT:US": { glue42: "MSFT:US", yf: "MSFT" },
      "TEAM:US": { glue42: "TEAM:US", yf: "TEAM" },
      "CRM:US": { glue42: "CRM:US", yf: "CRM" },
      "JPM:US": { glue42: "JPM:US", yf: "JPM" },
      "FB:US": { glue42: "FB:US", yf: "FB" },
      "AMZN:US": { glue42: "AMZN:US", yf: "AMZN" },
      "AAPL:US": { glue42: "AAPL:US", yf: "AAPL" },
      "BABA:US": { glue42: "BABA:US", yf: "BABA" },
      "TICK:LN": { glue42: "TICK:LN", yf: "TICK" },
      "NTES:US": { glue42: "NTES:US", yf: "NTES" },
      "KHC:US": { glue42: "KHC:US", yf: "KHC" },
      "NFLX:US": { glue42: "NFLX:US", yf: "NFLX" },
      "TSCO:LN": { glue42: "TSCO:LN", yf: "TSCO.L"}
    };

//TODO: CHANGE THE URL:
  public DataUrlBase = 'http://localhost:5005/rest/?instrument=';
  public useChannelsParamName = 'useChannels';
  public sharedContextName = 'instrumentDetails';
};

export default new Config();