import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { withProfiler } from 'jest-react-profiler';

import App from './App';

const AppWithProfiler = withProfiler(App);

describe('App', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('renders App', () => {
    const component = renderer.create(<App title="Hello World" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // test('performance with Jest', () => {
  //   renderer.create(<AppWithProfiler title="Hello World" />);

  //   expect(AppWithProfiler).toHaveCommittedTimes(1);
  // });

  test('performance with React Utils', () => {
    ReactDOM.render(
      <AppWithProfiler title="Hello World" />,
      container
    );

    expect(AppWithProfiler).toHaveCommittedTimes(1);
  });
});
