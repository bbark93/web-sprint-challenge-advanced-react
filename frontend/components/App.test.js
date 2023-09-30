import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import userEvent from '@testing-library/user-event';

import AppFunctional from './AppFunctional';

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})


test('renders without errors', () => {
  render(<AppFunctional/>);
});
