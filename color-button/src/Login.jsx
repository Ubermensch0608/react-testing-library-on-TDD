import { useReducer } from 'react';

const USER_EMAIL = 'USER_EMAIL';
const USER_PASSWORD = 'USER_PASSWORD';
const USER_RESET = 'USER_RESET';

const initialUserInfo = {
  email: '',
  password: '',
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case USER_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case USER_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case USER_RESET:
      return initialUserInfo;

    default:
      throw new Error(`new error occured at ${action.type}`);
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialUserInfo);

  const submitLoginInfoHandler = (e) => {
    e.preventDefault();

    dispatch({ type: USER_RESET });
  };

  return (
    <form onSubmit={submitLoginInfoHandler}>
      <h1>Login</h1>
      <div>
        <div>
          <label>Email: </label>
          <input
            onChange={(e) =>
              dispatch({ type: USER_EMAIL, payload: e.target.value })
            }
            value={state.email}
            name="email"
            type="email"
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            onChange={(e) =>
              dispatch({ type: USER_PASSWORD, payload: e.target.value })
            }
            value={state.password}
            name="password"
            type="text"
          />
        </div>
      </div>

      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

export default Login;
