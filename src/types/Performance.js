import PropTypes from 'prop-types';

const PerformanceType = PropTypes.shape({
  _id: PropTypes.string,
  dateandtime: PropTypes.string,
  // lineup: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  ticketline: PropTypes.string,
  ticketprice: PropTypes.number,
  venue: PropTypes.string,
});

export default PerformanceType;
