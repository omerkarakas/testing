import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

// runs before every test
beforeEach(() => {
  console.log('Testing started');
});

const clickSubmit = () => {
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitBtnElement);
};

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText(/^password$/i);
  const confirmPasswordInputElement =
    screen.getByLabelText(/^confirm password$/i);

  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

describe('App', () => {
  // runs before every test in this block
  beforeEach(() => {
    render(<App />);
  });

  test('inputs should be initially empty', () => {
    expect(screen.getByRole('textbox').value).toBe('');
    expect(screen.getByLabelText(/^password$/i).value).toBe('');
    expect(screen.getByLabelText(/confirm password/i).value).toBe('');
  });

  test('type an email', () => {
    const emailInputElement = screen.getByRole('textbox', { name: /email/i });
    userEvent.type(emailInputElement, 'omer@gmail.com');
    expect(emailInputElement.value).toBe('omer@gmail.com');
  });

  test('type password', () => {
    const { passwordInputElement } = typeIntoForm({ password: 'omer' });
    expect(passwordInputElement.value).toBe('omer');
  });

  test('type confirm password', () => {
    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: 'omer',
    });
    expect(confirmPasswordInputElement.value).toBe('omer');
  });

  describe('Error Handling', () => {
    // runs before every test in this block
    beforeEach(() => {
      console.log('testing for error');
    });
    test('invalid email error message', () => {
      expect(
        screen.queryByText(/the email you entered is invalid/i)
      ).not.toBeInTheDocument();

      typeIntoForm({ email: 'omergmail.com' });
      clickSubmit();

      expect(
        screen.getByText(/the email you entered is invalid/i)
      ).toBeInTheDocument();
    });

    test('password length is not enough', () => {
      typeIntoForm({ email: 'omer@gmail.com', password: 'omer' });
      clickSubmit();

      expect(
        screen.getByText(
          /the password you entered should contain 5 or more character/i
        )
      ).toBeInTheDocument();
    });

    test('passwords do not match', () => {
      typeIntoForm({
        email: 'omer@gmail.com',
        password: 'omer456',
        confirmPassword: 'omer123',
      });

      clickSubmit();

      expect(
        screen.getByText(/the passwords don't match. try again/i)
      ).toBeInTheDocument();
    });

    test('should validate form if no errors', () => {
      typeIntoForm({
        email: 'omer@gmail.com',
        password: 'omer123',
        confirmPassword: 'omer123',
      });

      clickSubmit();

      expect(screen.queryByTestId('error-element')).not.toBeInTheDocument();
    });
  });
});
