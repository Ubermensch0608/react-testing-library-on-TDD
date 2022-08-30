import { useState } from 'react';
import './App.css';

export const replaceCamelWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
};

function App() {
  const [backgroundColor, setBackgroundColor] = useState('MidnightBlue');
  const [isChecked, setIsChecked] = useState(false);

  const changeBackgroundHandler = () => {
    setBackgroundColor((prevColor) => {
      if (prevColor === 'MidnightBlue') {
        return 'MediumVioletRed';
      }
      if (prevColor === 'MediumVioletRed') {
        return 'MidnightBlue';
      }
    });
  };

  return (
    <div>
      <button
        disabled={isChecked}
        onClick={changeBackgroundHandler}
        style={{
          backgroundColor: isChecked ? 'gray' : backgroundColor,
          color: 'white',
        }}
      >
        Change to {replaceCamelWithSpaces(backgroundColor)}
      </button>
      <input
        id="my-checkbox"
        type="checkbox"
        checked={isChecked}
        aria-checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label htmlFor="my-checkbox">Disable button</label>
    </div>
  );
}

export default App;
