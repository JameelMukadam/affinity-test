import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { Container, Content, ButtonWrapper } from './style';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function CustomerModal({ open, onClose, customer, updateCustomer }) {
  const [name, setName] = useState(customer?.name || '');
  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (e?.stopPropogation) e.stopPropogation();
    if (updateCustomer) updateCustomer(customer?.id, name);
    setName('');
    if (onClose) onClose();
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="customer edit modal"
      aria-describedby="modal to edit customer details"
    >
      <Container>
        <Content>
          <h3>Edit Customer:</h3>
          <br />
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input type="text" name="name" id="name" placeholder={`${customer?.name || ''}`} value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <br />
            <ButtonWrapper>
              <Button>Save</Button>
              <Button type="button" onClick={onClose}>Cancel</Button>
            </ButtonWrapper>
          </Form>
        </Content>
      </Container>
    </Modal >
  )
}

export default CustomerModal;
