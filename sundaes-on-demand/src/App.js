import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetail';
import OrderEntry from './pages/entry/OrderEntry';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
