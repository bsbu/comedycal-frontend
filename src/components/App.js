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
      month: moment(),
      performances: [],
      activeVenues: {
        'ucb-franklin': true,
        'ucb-sunset': true,
        'pack-theater': true,
      },
    };
    this.getPerformances(
      this.state.month.format('MMMM'),
      this.state.month.format('YYYY')
    );
  }

  getPerformances = (month, year) => {
    getPerformancesByMonth(month, year)
      .then(res => this.setState({ performances: res.data }))
      .catch(err => console.log(err));
  };

  changeMonth = amount => {
    const month = this.state.month.clone().add(amount, 'months');
    this.setState({ month });
    this.getPerformances(month.format('MMMM'), month.format('YYYY'));
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
                {this.state.month
                  .clone()
                  .subtract(1, 'months')
                  .format('MMMM')}
              </span>
            </button>
            {this.state.month.format('MMMM')}
            <button className="arrow" onClick={() => this.changeMonth(1)}>
              {this.state.month
                .clone()
                .add(1, 'months')
                .format('MMMM')}{' '}
              &gt;
            </button>
          </div>
        </header>
        <Calendar
          performances={this.state.performances}
          month={this.state.month.clone()}
          activeVenues={this.state.activeVenues}
        />
      </div>
    );
  }
}

export default App;
