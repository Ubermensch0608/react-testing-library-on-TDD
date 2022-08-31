import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || 'An expected error occured. Please try again later';
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
