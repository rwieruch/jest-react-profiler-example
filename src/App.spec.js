import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('App', () => {
  test('renders App', () => {
    const component = renderer.create(<App title="Hello World" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
