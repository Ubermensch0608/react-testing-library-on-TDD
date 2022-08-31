## React Testing Library on TDD

### Mock Service Worker

```
yarn add msw
```

- create handler
- create test server

- 비동기를 다룰 시 findBy 사용
  - DOM 변경 이벤트
  - data fetching

test

- only
  해당 테스트만 실행
- skip
  해당 테스트를 건너뛰고 실행

### Wait For

- 비동기 테스트는 보통 findBy\* 선에서 해결할 수 있다.
- 하지만, 비동기 처리에 오래걸릴 경우 종종 테스트에 통과하지 못할 수 있다.
- 그럴 때는 waitFor을 이용하여 비동기를 이중 처리한다.
  ```
  test('비동기 테스트', async()=> {
    ...
    await waitFor(async()=> {
        const dom = await screen.findAllByRole('alert')
        expect(dom).toHaveLength(2)
    })
  })
  ```
