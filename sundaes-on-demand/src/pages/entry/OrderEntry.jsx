import { useOrderDetails } from '../../contexts/OrderDetail';

import Options from './Options';

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toopings" />

      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
};

export default OrderEntry;
