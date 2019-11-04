import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'tick42-bootstrap/dist/t42bootstrap.bundle.css';
import Config, { SymbolMap } from './config';
import { DisplayEntry, DefaultDisplayEntry } from './lib/displayEntry';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Glue, {Glue42} from 'tick42-glue';
import InstrumentChart from './components/demo-chart';

declare global {
  interface Window {
    glue: Glue42.Glue;
  }
}

type ExchangeSourceOption = { value: string, label: string };

class App extends Component<{}, {title: string, security: DisplayEntry, data: any, midPrice: number}> {
  private glue!: Glue42.Glue;
  private glue42ContextSubscription! : Promise<() => void>;
  private useChannels: boolean;

  constructor(props: any) {
    super(props);
    this.state = { title: this.getTitlePerRic(Config.SymbolsMap[Config.DefaultSymbol]), security: DefaultDisplayEntry, data: [], midPrice: 0};
    this.glue42Initialized = this.glue42Initialized.bind(this);
    this.glue42ChannelUpdated = this.glue42ChannelUpdated.bind(this);
    this.glue42ContextUpdated = this.glue42ContextUpdated.bind(this);
    this.useChannels = this.getQueryStringVal(window.location.href, Config.useChannelsParamName) === 'true';
//    Glue({ channels: useChannels }).then(this.glue42Initialized);
  }

  glue42Initialized(glue: Glue42.Glue) {
    this.glue = glue;
    window.glue = glue;
    if (this.glue.channels) {
      this.glue.channels.subscribe(this.glue42ChannelUpdated);
    } else if (this.glue.contexts) {
      this.glue42ContextSubscription = this.glue.contexts.subscribe(Config.sharedContextName, this.glue42ContextUpdated);
    }
  }

  glue42ChannelUpdated(data: any, channelInfo: any) {
    let newRic: SymbolMap;
    let title = this.getTitlePerRic(null);
    
    if (data && data.partyPortfolio) {
      newRic = Config.SymbolsMap[data.partyPortfolio.ric];
      title = this.getTitlePerRic(newRic);
    } else {
      newRic = Config.SymbolsMap[Config.DefaultSymbol];
    }
    if (newRic.glue42 !== this.state.security.ric) {
      this.reInitDisplay(title, newRic);
    }

    return () => { };
  }

  glue42ContextUpdated(context: any) {
    if (context && context.ticker) {
      const newRic = Config.SymbolsMap[context.ticker];
      if (newRic && (newRic.glue42 !== this.state.security.ric)) {
        const title = this.getTitlePerRic(newRic);
        this.reInitDisplay(title, newRic);
      }
    }
  }

  getTitlePerRic(ric:SymbolMap | null) {
    if (!ric || !ric.glue42) {
      return 'Instrument Chart';
    }
    return `${ric.glue42}`;
  }

  reInitDisplay(title: string, newRic: SymbolMap) {
    const newSecurity = {
      ric: newRic.glue42,
      bidsize: 0,
      bid: 0,
      asksize: 0,
      ask: 0
    } as DisplayEntry;
    this.setState({title: title, security: newSecurity, midPrice: 0 });

    const historyRic = Config.SymbolsMap[newRic.glue42].yf;
    const historicDataUrl = `${Config.DataUrlBase}${historyRic}`;
    console.log(`Fetching historical data for ${historyRic}...`);
    fetch(historicDataUrl).then((result) => {
      return result.json();
    }).then((data) => {
			const mdata = data.records.map((entry:any) => {
				const {date, ...rest} = entry;
				const dateAsObj = new Date(parseInt(`${date}000`));
				return {date: dateAsObj, ...rest};
			})
			this.setState({data: mdata});
    })

  }

  componentDidMount() {

    fetch('http://localhost:22060/username').then((response) => {
      return response.text();
    }).then((username => {
      Glue({appManager: false, auth:{username, password: 'password'}, gateway: { protocolVersion: 3, ws: 'ws://localhost:8385', }, channels: this.useChannels, windows: false }).then(this.glue42Initialized);
    const historicDataUrl = `${Config.DataUrlBase}${Config.SymbolsMap[Config.DefaultSymbol].yf}`;
    fetch(historicDataUrl).then((result) => {
      return result.json();
    }).then((data) => {
			const mdata = data.records.map((entry:any) => {
				const {date, ...rest} = entry;
				const dateAsObj = new Date(parseInt(`${date}000`));
				return {date: dateAsObj, ...rest};
			})
			this.setState({data: mdata});
    })
    }))
  }

  getQueryStringVal(url: string, paramName: string) : string | null {
    const urlParts = url.split('?');
    if (urlParts.length <= 1) {
      return null;
    }
    const qs = urlParts[1];
    const qsParts = qs.split(`&`);
    const myPart = qsParts.find(p => p.startsWith(`${paramName}=`));
    if (!myPart) {
      return null;
    }
    const val = myPart.split('=');
    return val[1];
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light justify-content-center mb-4">
          <img src={logo} height="50" className="d-inline-block align-top mr-3" alt="Instrument Chart Logo" />
          <span className="display-1">{this.state.title}</span>
        </nav>
          <Container className="instrument-chart-container">
            <Row>
              <Col>
                { (this.state.data && this.state.data.length > 0) ? <InstrumentChart type="hybrid" data={this.state.data} midPrice={this.state.midPrice} symbol={this.state.security.ric} /> : "Loading..." }
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

export default App; 
