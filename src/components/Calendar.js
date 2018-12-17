import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Week from './Week';
import PerformanceType from '../types/Performance';
import '../css/calendar.css';

export default class Calendar extends Component {
  static propTypes = {
    month: PropTypes.string,
    performances: PropTypes.arrayOf(PerformanceType),
    activeVenues: PropTypes.objectOf(PropTypes.bool),
  };

  constructor(props) {
    super(props);
    this.state = {
      weeks: this.getWeeks(),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.month !== this.props.month) {
      // eslint-disable-next-line
      this.setState({ weeks: this.getWeeks() });
    }
  }

  getWeeks = () => {
    const firstSunday = moment
      .utc()
      .month(this.props.month)
      .startOf('month')
      .startOf('week');
    const weeks = [firstSunday];
    let currentSunday = firstSunday.clone().add(1, 'weeks');
    while (
      currentSunday.isSameOrBefore(
        moment.utc().month(this.props.month),
        'month'
      )
    ) {
      weeks.push(currentSunday);
      currentSunday = currentSunday.clone().add(1, 'weeks');
    }

    return weeks;
  };

  renderWeek = startOfWeek => {
    const performancesOfTheWeek = this.props.performances.filter(
      performance =>
        moment(performance.dateandtime).isSameOrAfter(startOfWeek) &&
        moment(performance.dateandtime).isBefore(
          startOfWeek.clone().add(1, 'weeks')
        )
    );
    return (
      <Week
        key={startOfWeek}
        startOfWeek={startOfWeek}
        performances={performancesOfTheWeek}
        activeVenues={this.props.activeVenues}
      />
    );
  };

  render() {
    return (
      <div className="calendar">
        {this.state.weeks.map(startOfWeek => this.renderWeek(startOfWeek))}
      </div>
    );
  }
}
