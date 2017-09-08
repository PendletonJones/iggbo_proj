import React from 'react';
import ReactDOM from 'react-dom';
import PickSection from './PickSection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PickSection />, div);
});
