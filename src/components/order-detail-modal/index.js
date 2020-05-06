import React, { useState, useEffect, useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import { Button, Form, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import { Container, Content, ButtonWrapper } from './style';
import Context from '../mock-data-provider/context';

function OrderDetailModal({ open, onClose, item, orderId }) {
  const { products = [], createOrderDetail, editOrderDetail } = useContext(Context);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orderItem, setOrderItem] = useState(item);
  const [qty, setQty] = useState(item?.quantity || 1);
  const [price, setPrice] = useState(item?.price || '');

  useEffect(() => {
    if (item && !orderItem) {
      setOrderItem(item);
      setQty(item.quantity);
      setPrice(item.price);
    }
  }, [item, orderItem, setOrderItem])

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (e?.stopPropogation) e.stopPropogation();

    if (item) {
      editOrderDetail(item.id, orderItem, qty, price);
    } else createOrderDetail(orderId, orderItem, qty, price);
    setOrderItem('');
    if (onClose) onClose();
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
            <FormGroup>
              <Label for="product">Product</Label>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                  {orderItem?.itemDescription || orderItem?.name || 'Select product'}
                </DropdownToggle>
                <DropdownMenu>
                  {products.map(product => {
                    return <DropdownItem key={product.id} onClick={() => {
                      setOrderItem(product);
                      setPrice(product.price)
                    }} >{`${product?.name} - R${product.price}`}</DropdownItem>;
                  })}
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label for="qty">Quantity</Label>
              <Input type="number" name="qty" id="qty" placeholder="1" value={qty} onChange={(e) => setQty(parseInt(e.target.value))} />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input type="text" name="price" id="price" placeholder="R45" value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormGroup>
            <br />
            <ButtonWrapper>
              <Button>{item ? 'Update item' : 'Create order detail'}</Button>
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

export default OrderDetailModal;
