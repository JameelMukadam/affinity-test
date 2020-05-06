import React, { useState, useContext, useCallback, useMemo } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Button } from "reactstrap";
import moment from 'moment';
import Table from '../../components/table'
import Context from '../../components/mock-data-provider/context';
import OrderModal from '../../components/order-modal';


function renderItem(order, index) {
  return (
    <tr key={order.id}>
      <td className="text-center">{index + 1}</td>
      <td>{order.id}</td>
      <td>{order.customerID}</td>
      <td>{order.customerName}</td>
      <td>{moment(order.date).format('D/M/YYYY')}</td>
      <td className="td-number text-right">
        {order.actions}
      </td>
    </tr>
  )
}

function getCustomerName(customerList = [], id) {
  return customerList?.find(customer => customer.id === id) || '-';
}

function OrdersLayout({ ...props }) {
  const { orders = [], customers, refetchData, deleteOrder } = useContext(Context);
  const { push } = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onDelete = useCallback((id) => () => { deleteOrder(id) }, [deleteOrder]);

  const mappedData = useMemo(() => {
    return orders.map(item => {
      return {
        id: item.id,
        customerID: item.customerId,
        customerName: getCustomerName(customers, item.customerId)?.name || '-',
        date: item.orderDate,
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            <Button
              onClick={() => push(`/order/${item.id}`)}
              color="info"
              size="sm"
              className="btn-icon remove"
            >
              View
            </Button>
            <br />
            <br />
            <Button
              onClick={onDelete(item.id)}
              color="danger"
              size="sm"
              className="btn-icon remove"
            >
              <i className="fa fa-times" />
            </Button>
          </div>
        )
      };
    })
  }, [orders, customers, onDelete, push]);

  return (
    <Container>
      <br />
      <Button color="primary" onClick={() => push('/')}>Go back</Button>
      &nbsp;
      &nbsp;
      <Button color="primary" onClick={refetchData}>Reset Data</Button>
      &nbsp;
      &nbsp;
      <Button color="primary" onClick={() => push('/customers')}>Go to customers</Button>
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      <Button color="secondary" onClick={() => { setShowModal(true) }}><i class="fas fa-plus"></i> Add new order</Button>
      <br />
      <br />
      <Row>
        <Table title="Orders" items={mappedData} columns={['#', 'ID', 'Customer ID', 'Customer Name', 'Date Ordered']} renderItem={renderItem} />
      </Row>
      <br />
      <OrderModal open={showModal} onClose={() => { setShowModal(false); }} />
    </Container>
  )
}

export default OrdersLayout;
