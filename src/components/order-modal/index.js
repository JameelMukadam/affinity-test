import React, { useState, useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import { useHistory } from "react-router-dom";
import { Button, Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Container, Content, ButtonWrapper } from './style';
import Context from '../mock-data-provider/context';

function OrderModal({ open, onClose }) {
  const { push } = useHistory();
  const { customers = [], createOrder } = useContext(Context);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customer, setCustomer] = useState('');

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (e?.stopPropogation) e.stopPropogation();
    if (createOrder) {
      let orderId = createOrder(customer.id);
      setCustomer('');
      if (onClose) onClose();
      push(`/order/${orderId}`);
    }
  }

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="customer edit modal"
      aria-describedby="modal to edit customer details"
    >
      <Container>
        <Content>
          <h3>Add new order:</h3>
          <br />
          <Form onSubmit={handleSubmit}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
                {customer?.name || 'Select Customer'}
              </DropdownToggle>
              <DropdownMenu>
                {customers.map(cust => {
                  return <DropdownItem key={cust.id} onClick={() => setCustomer(cust)} >{cust?.name}</DropdownItem>;
                })}
              </DropdownMenu>
            </Dropdown>
            <br />
            <ButtonWrapper>
              <Button>Create order</Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <Button type="button" onClick={onClose}>Cancel</Button>
            </ButtonWrapper>
          </Form>
        </Content>
      </Container>
    </Modal >
  )
}

export default OrderModal;
