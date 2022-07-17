import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

test('inputs should be initially empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText(/^password$/i);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('type an email', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  userEvent.type(emailInputElement, 'omer@gmail.com');
  expect(emailInputElement.value).toBe('omer@gmail.com');
});

test('type password', () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText(/^password$/i);

  userEvent.type(passwordInputElement, 'omer');
  expect(passwordInputElement.value).toBe('omer');
});

test('type confirm password', () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/^confirm password$/i);

  userEvent.type(confirmPasswordInputElement, 'omer');
  expect(confirmPasswordInputElement.value).toBe('omer');
});
