import React, { useState, useContext, useCallback } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Button } from "reactstrap";
import Table from '../../components/table'
import Context from '../../components/mock-data-provider/context';
import OrderDetailModal from '../../components/order-detail-modal';


function renderItem(item, index) {
  return (
    <tr key={item.id}>
      <td className="text-center">{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.orderId}</td>
      <td>{item.description}</td>
      <td>{item.quantity}</td>
      <td>R{item.price}</td>
      <td className="td-number text-right">
        {item.actions}
      </td>
    </tr>
  )
}

function OrderDetailsLayout({ ...props }) {
  const { id } = useParams();
  const { orderDetails = [], refetchData, deleteOrderDetail } = useContext(Context);
  const { push } = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const onEdit = useCallback((orderDetail) => () => {
    setCurrentItem(orderDetail);
    setShowModal(true);
  }, []);

  const onDelete = useCallback((id) => () => { deleteOrderDetail(id) }, [deleteOrderDetail]);

  const filteredOrderDetails = orderDetails.filter(orderItem => {
    return orderItem.orderId === id;
  });

  const mappedData = filteredOrderDetails.map(item => {
    return {
      id: item.id,
      orderId: item.orderId,
      quantity: item.quantity,
      price: item.price,
      description: item.itemDescription,
      actions: (
        // we've added some custom button actions
        <div className="actions-right">
          {/* use this button to add a edit kind of action */}

          <Button
            onClick={onEdit(item)}
            color="warning"
            size="sm"
            className="btn-icon edit"
          >
            <i className="fa fa-edit" />
          </Button>{" "}
          <br />
          <br />
          {/* use this button to remove the data row */}
          <Button
            onClick={onDelete(item.id)}
            color="danger"
            size="sm"
            className="btn-icon remove"
          >
            <i className="fa fa-times" />
          </Button>{" "}
        </div>
      )
    };
  })

  return (
    <Container>
      <br />
      <Button color="primary" onClick={() => push('/orders')}>Go back to orders</Button>
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
      <Button color="secondary" onClick={() => {
        setCurrentItem(null);
        setShowModal(true);
      }}><i class="fas fa-plus"></i> Add new item</Button>
      <br />
      <br />
      <Row>
        <Table title="Order Details" items={mappedData} columns={['#', 'ID', 'Order ID', 'Item Description', 'Qty', 'Price']} renderItem={renderItem} />
      </Row>
      <br />
      <OrderDetailModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentItem(null);
        }}
        item={currentItem}
        orderId={id}
      />
    </Container>
  )
}

export default OrderDetailsLayout;
