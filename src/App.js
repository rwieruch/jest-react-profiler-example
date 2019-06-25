import React from 'react';
import PropTypes from 'prop-types';

const App = ({ title }) => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>{title}</h1>

      <p>{count}</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
};

export default App;
