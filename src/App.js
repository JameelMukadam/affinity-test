import React from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Jumbotron, Button } from 'reactstrap';

function App() {
  const { push } = useHistory();
  return (
    <div>
      <Container>
        <br />
        <br />
        <Row>
          <Jumbotron>
            <h1 className="display-3">Welcome to the customer order app</h1>
            <p className="lead">This is a technical assessment in React & javascript.</p>
            <hr className="my-2" />
            <p>It is written in <b>JavaScript</b>. Data is mocked using <b>Faker</b>. Tests are written in <b>cypress</b>. Styling is using <b>reactstrap (bootstrap) & Material-UI</b>. Data has been mocked according to the SQL in Step 1 of the assessment.</p>
            <p><b>To run the tests:</b></p>
            <p>- npm run cypress</p>
            <br />
            <p className="lead">
              <Button color="primary" onClick={() => push('/customers')}>Customer Screen</Button>
              &nbsp;
              &nbsp;
              <Button color="primary" onClick={() => push('/orders')}>Orders Screen</Button>
            </p>
          </Jumbotron>
        </Row>
      </Container>
    </div>
  );
}

export default App;
