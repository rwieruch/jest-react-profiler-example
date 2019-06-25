import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils'; // React Test Utils
import renderer from 'react-test-renderer'; // Jest
import { render, fireEvent } from '@testing-library/react'; // React Testing Library

import { withProfiler } from 'jest-react-profiler';

import App from './App';

describe('App', () => {
  test('renders App', () => {
    const component = renderer.create(<App title="Hello World" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Jest', () => {
    const AppWithProfiler = withProfiler(App);

    renderer.create(<AppWithProfiler title="Hello World" />);

    // expect(AppWithProfiler).toHaveCommittedTimes(1); // Doesn't work with Jest Renderer
  });

  test('React Utils', () => {
    const AppWithProfiler = withProfiler(App);

    const container = document.createElement('div');
    document.body.appendChild(container);

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
        new MouseEvent('click', {
          bubbles: true,
        })
      );
    });

    expect(paragraph.textContent).toBe('1');
    // Not intuitive API
    // Source: Verifies that the test profiler component committed a specific number of times **__since__** the last time the matcher was called.
    // My assumption would have been that the commited times would be only incremented with every commit
    expect(AppWithProfiler).toHaveCommittedTimes(1);
  });

  test('React Testing Library', () => {
    const AppWithProfiler = withProfiler(App);

    const { container } = render(
      <AppWithProfiler title="Hello World" />
    );

    const paragraph = container.querySelector('p');
    const button = container.querySelector('button');

    expect(paragraph.textContent).toBe('0');
    expect(AppWithProfiler).toHaveCommittedTimes(1);

    fireEvent.click(button);

    expect(paragraph.textContent).toBe('1');
    // Not intuitive API
    // Source: Verifies that the test profiler component committed a specific number of times **__since__** the last time the matcher was called.
    // My assumption would have been that the commited times would be only incremented with every commit
    expect(AppWithProfiler).toHaveCommittedTimes(1);
  });
});
