import React, { Component } from 'react';
import moment from 'moment';
import { getPerformancesByMonth } from '../api';
import Calendar from './Calendar';
import VenueFilter from './VenueFilter';

import '../css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment().format('MMMM'),
      performances: [],
      activeVenues: {
        'ucb-franklin': true,
        'ucb-sunset': true,
        'pack-theater': true,
      },
    };
    this.getPerformances(this.state.month);
  }

  getPerformances = month => {
    getPerformancesByMonth(month)
      .then(res => this.setState({ performances: res.data }))
      .catch(err => console.log(err));
  };

  changeMonth = amount => {
    const month = moment()
      .month(this.state.month)
      .add(amount, 'months')
      .format('MMMM');
    this.setState({ month });
  };

  toggleActiveVenue = venueName => {
    const { activeVenues } = this.state;
    activeVenues[venueName] = !activeVenues[venueName];
    this.setState({ activeVenues });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>
            <span>The </span>
            <br />
            Comedy <br />
            Calendar
          </h1>
          <div className="venue-filters">
            <h3>Venues</h3>
            <VenueFilter
              active={this.state.activeVenues['ucb-franklin']}
              venueName="ucb-franklin"
              toggleActive={this.toggleActiveVenue}
            >
              UCB Franklin
            </VenueFilter>
            <VenueFilter
              active={this.state.activeVenues['ucb-sunset']}
              venueName="ucb-sunset"
              toggleActive={this.toggleActiveVenue}
            >
              UCB Sunset
            </VenueFilter>
            <VenueFilter
              active={this.state.activeVenues['pack-theater']}
              venueName="pack-theater"
              toggleActive={this.toggleActiveVenue}
            >
              Pack Theater
            </VenueFilter>
          </div>
          <div className="month-picker">
            <button className="arrow" onClick={() => this.changeMonth(-1)}>
              <span className="arrow__icon">&lt;</span>{' '}
              <span className="prev-month">
                {moment()
                  .month(this.state.month)
                  .subtract(1, 'months')
                  .format('MMMM')}
              </span>
            </button>
            {moment()
              .month(this.state.month)
              .format('MMMM')}
            <button className="arrow" onClick={() => this.changeMonth(1)}>
              {moment()
                .month(this.state.month)
                .add(1, 'months')
                .format('MMMM')}{' '}
              &gt;
            </button>
          </div>
        </header>
        <Calendar
          performances={this.state.performances}
          month={this.state.month}
          activeVenues={this.state.activeVenues}
        />
      </div>
    );
  }
}

export default App;
