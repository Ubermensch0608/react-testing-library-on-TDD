import { render, screen } from '@testing-library/react';
import Options from '../Options';

describe('Options', () => {
  test('각 스쿱의 이미지는 화면에 노출되어야 한다.', async () => {
    render(<Options optionType="scoops" />);

    // 이미지 찾기
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // 이미지의 alt 텍스트 단언
    const altText = scoopImages.map((image) => image.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  test('각 토핑의 이미지는 화면에 노출되어야 한다.', async () => {
    render(<Options optionType="toppings" />);

    // 이미지 찾기
    const toppingImages = await screen.findAllByRole('img', {
      name: /topping$/i,
    });
    expect(toppingImages).toHaveLength(3);

    // 이미지의 alt text 단언
    const altText = toppingImages.map((image) => image.alt);
    expect(altText).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ]);
  });
});
