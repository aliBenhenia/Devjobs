// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button'; // Update the import path based on your project structure

describe('Button Component', () => {
  // Test that the button renders correctly with children
  test('renders children correctly', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  // Test that the provided className is applied
  test('applies the provided className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('custom-class');
  });

  // Test that the button calls onClick when clicked
  test('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button className="custom-class" onClick={onClickMock}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  // Test rendering button with different children (string and JSX)
  test('renders button with string children', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders button with JSX children', () => {
    render(<Button className="custom-class"><strong>Bold Button</strong></Button>);
    expect(screen.getByText('Bold Button')).toBeInTheDocument();
    expect(screen.getByText('Bold Button').tagName).toBe('STRONG');
  });

  // Test button rendering without className and using default styles
  test('renders button with default styles when no className is provided', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('rounded-2xl', 'py-2', 'px-4', 'border-0');
  });

  // Test the button's role and focusability (accessibility)
  test('has the role of button', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveAttribute('role', 'button');
  });

  test('can be focused', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText('Click me');
    button.focus();
    expect(button).toHaveFocus();
  });

  // Test that the button does not fire onClick if not provided
  test('does not call onClick when not provided', () => {
    const onClickMock = jest.fn();
    render(<Button className="custom-class">Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(onClickMock).not.toHaveBeenCalled();
  });

  // Test applying multiple classNames
  test('applies multiple class names', () => {
    render(<Button className="custom-class another-class">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('another-class');
  });

  // Snapshot testing to ensure consistent rendering
  test('Button snapshot', () => {
    const { asFragment } = render(<Button className="custom-class">Click me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
