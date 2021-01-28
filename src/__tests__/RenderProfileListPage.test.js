import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RenderProfileListPage from '../pages/ProfileList/RenderProfileListPage';

test('loads a profile list', () => {
  const data = [{ id: '1234', name: 'item' }];
  const { getByText, debug } = render(
    <Router>
      <RenderProfileListPage data={data} />
    </Router>
  );
  const element = getByText(/item/i);
  expect(element.textContent).toBe(data[0].name);
});
