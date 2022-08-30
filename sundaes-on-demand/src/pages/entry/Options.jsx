import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  // optionType 은 'scoops' 또는 'toppings' 일 것
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => {
        // Todo: handle err response
      });
  }, [optionType]);

  // Todo: replace `null` with ToppingOption when available
  const ItemComponent =
    (optionType === 'scoops' && ScoopOption) ||
    (optionType === 'toppings' && ToppingOption);

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
