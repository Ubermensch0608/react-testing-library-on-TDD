import React from 'react';

import Options from './Options';

const OrderEntry = () => {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toopings" />
    </div>
  );
};

export default OrderEntry;
