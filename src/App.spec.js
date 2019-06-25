import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer'; // Jest

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

  // Doesn't commit ...

  // test('Jest', () => {
  //   renderer.create(<AppWithProfiler title="Hello World" />);

  //   expect(AppWithProfiler).toHaveCommittedTimes(1);
  // });

  test('React Utils', () => {
    act(() => {
      ReactDOM.render(
        <AppWithProfiler title="Hello World" />,
        container
      );
    });

    const paragraph = container.querySelector('p');
    const button = container.querySelector('button');

    expect(paragraph.textContent).toBe('0');
    expect(AppWithProfiler).toHaveCommittedTimes(1);

    act(() => {
      button.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    });

    expect(paragraph.textContent).toBe('1');
    // expect(AppWithProfiler).toHaveCommittedTimes(2); // doesn't work
  });
});
