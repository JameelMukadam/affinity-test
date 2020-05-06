import React, { useState, useContext, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Button } from "reactstrap";
import Table from '../../components/table'
import CustomerModal from '../../components/customer-modal'
import Context from '../../components/mock-data-provider/context';

function renderItem(customer, index) {
  return (
    <tr key={customer.id}>
      <td className="text-center">{index}</td>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td className="td-number text-right">
        {customer.actions}
      </td>
    </tr>
  )
}

function CustomerLayout({ ...props }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const { customers = [], refetchData, updateCustomer, deleteCustomer } = useContext(Context);
  const { push } = useHistory();

  const onEdit = useCallback((customer) => () => {
    setCurrentCustomer(customer);
    setShowEditModal(true);
  }, [setCurrentCustomer, setShowEditModal]);

  const onDelete = useCallback((customerId) => () => {
    deleteCustomer(customerId);
  }, [deleteCustomer]);

  const handleClose = useCallback(() => {
    setCurrentCustomer(null);
    setShowEditModal(false);
  }, [setCurrentCustomer, setShowEditModal]);

  const mappedData = customers.map(item => {
    return {
      id: item.id,
      name: item.name,
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
  });

  return (
    <Container>
      <br />
      <Button color="primary" onClick={() => push('/')}>Go back</Button>
      &nbsp;
      &nbsp;
      <Button color="primary" onClick={refetchData}>Reset Data</Button>
      &nbsp;
      &nbsp;
      <Button color="primary" onClick={() => push('/orders')}>Go to orders</Button>
      <br />
      <br />
      <Row>
        <Table title="Customers" items={mappedData} columns={['#', 'ID', 'Customer Name']} renderItem={renderItem} />
      </Row>
      <br />
      <CustomerModal open={showEditModal} customer={currentCustomer} onClose={handleClose} updateCustomer={updateCustomer} deleteCustomer={deleteCustomer} />
    </Container>
  )
}

export default CustomerLayout;
