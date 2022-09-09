import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import OrderEntry from '../OrderEntry';

describe('totalUpdates', () => {
  // test('각 스쿱의 개수가 변경되면 스쿱의 총 가격이 변경되어야 한다. / 바닐라 스쿱', async () => {
  //   const user = userEvent.setup();
  //   render(<Options optionType="scoops" />);

  //   // 총 가격이 $0.00로 시작되는지 확인한다.
  //   const scoopsSubtotal = screen.getByText('Scoops total: $', {
  //     exact: false,
  //   });

  //   expect(scoopsSubtotal).toHaveTextContent('0.00');

  //   // 바닐라 스쿱이 1로 업데이트 되고 총 가격이 변하는지 확인한다.

  //   const vanillaInput = await screen.findByRole('spinbutton', {
  //     name: 'Vanilla',
  //   });
  //   user.clear(vanillaInput);
  //   user.type(vanillaInput, '1');
  //   expect(scoopsSubtotal).toHaveTextContent('2.00');

  //   // 초코 스쿱이 2로 업데이트 되고 총 가격이 변하는지 확인한다.
  //   const chocoInput = await screen.findByRole('spinbutton', {
  //     name: 'Chocolate',
  //   });
  //   user.clear(chocoInput);
  //   user.type(chocoInput, '2');

  //   expect(chocoInput).toHaveTextContent('6.00');
  // });

  test('토핑의 상태에 따라 가격 합계가 변경되어야 한다.', async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);

    // 총 가격이 0.00으로 시작되어야 한다.
    const toppingsSubtotal = screen.getByText('Toppings total: $', {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // M&Ms 토핑이 추가 되었을 때 총 가격은 1.50이어야 한다.
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    fireEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    // Hot fudge와 Peanut butter cups가 추가 되었을 때 총 가격은 3.00이어야 한다.
    const hotFudgeCheckbox = screen.getByRole('checkbox', {
      name: 'Hot fudge',
    });

    fireEvent.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    // 체크 박스를 모두 해제 했을 때 총 가격은 0.00이 되어야 한다.
    fireEvent.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');
  });
});

describe('grand total', () => {
  test('가격 총 계는 스쿱이 먼저 추가 될 때 올바르게 반영 되어야 한다.', async () => {
    render(<OrderEntry />);
    const total = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // 가격 총 계의 초기값은 0.00이어야 한다.
    expect(total).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    fireEvent.change(vanillaInput, '2');
    expect(total).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    fireEvent.click(cherriesCheckbox);
    expect(total).toHaveTextContent('5.50');
  });

  test('가격 총 계는 토핑이 먼저 추가 될 때 올바르게 반영 되어야 한다.', async () => {
    render(<OrderEntry />);

    const total = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    render(<Options optionType="toppings" />);

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    fireEvent.click(cherriesCheckbox);
    expect(total).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    fireEvent.change(vanillaInput, '2');
    expect(total).toHaveTextContent('5.50');
  });

  test('가격 총 계는 옵션이 삭제될 때 올바르게 반영되어야 한다.', async () => {
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findAllByRole('checkbox', {
      name: 'Cherries',
    });
    fireEvent.click(cherriesCheckbox);

    const vanillaInput = await screen.findAllByRole('spinbutton', {
      name: 'Vanilla',
    });
    fireEvent.change(vanillaInput, '2');
    fireEvent.change(vanillaInput, '1');

    const total = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(total).toHaveTextContent('3.50');
  });
});
