import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

describe('SummaryForm', () => {
  const renderSummaryForm = () => render(<SummaryForm />);

  test('체크박스는 최초에 체크되어있지 않은 상태로 노출 되어야 한다.', () => {
    renderSummaryForm();

    const checkbox = screen.getByRole('checkbox', {
      name: /i agree to/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole('button', {
      name: /confirm order/i,
    });
    expect(confirmButton).toBeDisabled();
  });

  test('체크박스가 체크되어 있지 않은 상태에서는 버튼이 활성화 되어있지 않아야 한다.', () => {
    renderSummaryForm();

    const checkbox = screen.getByRole('checkbox', {
      name: /i agree to/i,
    });
    const confirmButton = screen.getByRole('button', {
      name: /confirm order/i,
    });

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });

  test('체크박스가 체크 되어있을 때 버튼은 활성화 상태로 노출되어야 한다.', () => {
    renderSummaryForm();

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole('button', {
      name: /confirm order/i,
    });

    fireEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();

    fireEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });
});

describe('Popover', () => {
  test('팝오버는 마우스를 올렸을 때 노출되어야 한다.', async () => {
    render(<SummaryForm />);

    // 최초에 팝오버는 노출되지 않아야 한다.
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // 마우스를 올렸을 때 팝오버는 노출되어야 한다.
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    fireEvent.mouseOver(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // 마우스를 떨어뜨렸을 때 팝오버는 사라져야 한다.
    fireEvent.mouseLeave(termsAndConditions);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
