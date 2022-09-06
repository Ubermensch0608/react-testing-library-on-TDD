import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Form } from 'react-bootstrap';

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const getScoopsAmountHandler = (e) => {
    const currentAmount = e.target.value;

    updateItemCount({
      itemName: name,
      newItemCount: currentAmount,
    });
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />

      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            onChange={getScoopsAmountHandler}
            defaultValue={0}
            type="number"
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
