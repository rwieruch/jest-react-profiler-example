import React from 'react';
import PropTypes from 'prop-types';

const App = ({ title }) => (
  <div>
    <h1>{title}</h1>
  </div>
);

App.propTypes = {
  title: PropTypes.string.isRequired,
};

export default App;
