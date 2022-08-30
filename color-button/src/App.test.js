import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App, { replaceCamelWithSpaces } from './App';

it('초기값', () => {
  render(<App />);

  // 버튼은 초기에 기능이 동작한 채로 노출되어야 한다.
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  expect(button).toBeEnabled();

  // 체크박스는 초기에 체크되지 않은 상태로 노출되어야 한다.
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('체크 박스 기능', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', {
    name: /Disable button/i,
  });
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  // 체크박스가 체크되었을 때 버튼은 비활성화 되어야 한다.
  userEvent.click(checkbox);
  expect(button).toBeDisabled();

  // 체크박스가 체크되지 않았을 때 버튼은 다시 활성화되어야 한다.
  userEvent.click(checkbox);
  expect(button).toBeEnabled();
});

it('비활성시 회색으로 바뀌는 버튼이 화면에 노출되어야 한다.', () => {
  render(<App />);

  const button = screen.getByRole('button');
  userEvent.click(button);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  // 체크박스에 체크가 되어있을 경우 버튼은 비활성화되어야 한다.(배경색: gray)
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
  expect(button).toHaveStyle({ backgroundColor: 'gray' });

  // 체크박스에 체크가 되어 있지 않을 경우 버튼은 활성화되어야 한다.(배경색: red)
  userEvent.click(checkbox);
  expect(button).toBeEnabled();
  expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  // 버튼을 한 번 눌렀을 때 버튼의 배경색은 blue 로 바뀌어야 한다.
  userEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });

  // 체크박스에 체크가 되어있을 경우 버튼은 비활성화되어야 한다.(배경색: gray)
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
  expect(button).toHaveStyle({ backgroundColor: 'gray' });

  // 체크박스에 체크가 되어있지 않을 경우 버튼은 활성화되어야 한다.(배경색: blue)
  userEvent.click(checkbox);
  expect(button).toBeEnabled();
  expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('카멜 케이스의 대문자 이후에 띄어쓰기가 되어야 한다.', () => {
  test('첫 번째 이후에 대문자가 하나도 없는 경우', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('첫 번째 이후에 대문자가 하나 있는 경우', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('첫 번째 이후에 대문자가 두개 있는 경우', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
