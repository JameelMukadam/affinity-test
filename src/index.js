import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CustomerLayout from './layouts/customers';
import OrdersLayout from './layouts/orders';
import OrderDetailsLayout from './layouts/order-details';
import MockDataProvider from './components/mock-data-provider';

const hist = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={hist}>
      <MockDataProvider>
        <Switch>
          <Route path="/customers" render={props => <CustomerLayout {...props} />} />
          <Route path="/orders" render={props => <OrdersLayout {...props} />} />
          <Route path="/order/:id" render={props => <OrderDetailsLayout {...props} />} />
          <Route path="/" render={props => <App {...props} />} />
          <Redirect to="/" />
        </Switch>
      </MockDataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
