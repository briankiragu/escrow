import { describe, it } from 'vitest';
import { render } from 'solid-testing-library';
import App from '@/App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
