import { render, screen } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const expectedText = /Loading/i;

    render(<LoadingScreen />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
