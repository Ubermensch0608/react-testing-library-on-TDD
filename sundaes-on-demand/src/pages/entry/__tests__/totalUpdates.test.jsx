import {
  findByRole,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

describe('totalUpdates', () => {
  test('각 스쿱의 개수가 변경되면 스쿱의 총 가격이 변경되어야 한다. / 바닐라 스쿱', async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    // 총 가격이 $0.00로 시작되는지 확인한다.
    const scoopsSubtotal = screen.getByText('Scoops total: $', {
      exact: false,
    });

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // 바닐라 스쿱이 1로 업데이트 되고 총 가격이 변하는지 확인한다.
    await waitFor(async () => {
      const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
      });
      user.clear(vanillaInput);
      user.type(vanillaInput, '1');
    });
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // 초코 스쿱이 2로 업데이트 되고 총 가격이 변하는지 확인한다.
    const chocoInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    user.clear(chocoInput);
    user.type(chocoInput, '2');

    expect(chocoInput).toHaveTextContent('6.00');
  });
});
