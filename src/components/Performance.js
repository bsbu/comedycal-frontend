import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerformanceType from '../types/Performance';
import '../css/performance.css';

export default class Performance extends Component {
  state = {
    infoOpen: false,
  };

  static propTypes = {
    performance: PerformanceType,
    venueActive: PropTypes.bool,
  };

  render() {
    const { performance, venueActive } = this.props;
    return (
      <div
        className={`performance ${performance.venue
          .toLowerCase()
          .replace(' ', '-')} ${venueActive ? 'active' : ''}`}
      >
        {/* eslint-disable-next-line */}
        <p
          className="performance__title"
          onClick={() => this.setState({ infoOpen: !this.state.infoOpen })}
        >
          {performance.name}
          <span className={`close ${this.state.infoOpen ? 'visible' : ''}`}>
            &times;
          </span>
        </p>
        <div
          className={`performance__info ${this.state.infoOpen ? 'open' : ''}`}
        >
          <p className="performance__cast subtitle">
            {performance.lineup.length > 0 ? 'Cast' : ''}
          </p>
          <ul className="performance__cast">
            {performance.lineup.slice(0, 10).map(actor => (
              <li key={Math.random()}>{actor}</li>
            ))}
          </ul>
          <a
            href={performance.ticketline}
            rel="noopener noreferrer"
            target="_blank"
            className="performance__tickets"
          >
            Tickets ${performance.ticketprice} &rarr;
          </a>
        </div>
        <p className="performance__show-time">
          {moment.utc(performance.dateandtime).format('h:mm')} PM
        </p>
      </div>
    );
  }
}
