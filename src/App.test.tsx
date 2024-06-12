import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('My App works as expected', async () => {
  const app = render(<App />);

  // initialize the user we simulate
  const user = userEvent.setup();
  const textareaFrom = app.getByPlaceholderText('Enter text');

  await user.type(textareaFrom, 'Hola mundo');
  const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 5000 });

  expect(result).toBeTruthy();
});
