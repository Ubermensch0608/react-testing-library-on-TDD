import { useReducer } from 'react';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET_COUNT = 'RESET_COUNT';

const countInitial = {
  count: 0,
};

const countReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + action.payload };
    case DECREMENT:
      return { count: state.count - action.payload };
    case RESET_COUNT:
      return countInitial;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(countReducer, countInitial);

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: RESET_COUNT })}>reset</button>
      <button onClick={() => dispatch({ type: DECREMENT, payload: 5 })}>
        -5
      </button>
      <button onClick={() => dispatch({ type: DECREMENT, payload: 1 })}>
        -1
      </button>
      <button onClick={() => dispatch({ type: INCREMENT, payload: 1 })}>
        +1
      </button>
      <button onClick={() => dispatch({ type: INCREMENT, payload: 5 })}>
        +5
      </button>
    </div>
  );
};

export default Counter;
