import { render } from '@testing-library/react';
import App from '../src/components/App/App.jsx';

test('renders App component without crashing', () => {
  render(<App />);
});
