import React, { useState, useEffect, useMemo, useCallback } from 'react';
import faker from 'faker';
import MockDataContext from './context';
import { getMockData } from '../../mock';

function MockDataProvider({ children }) {
  const [fetchData, setFetchData] = useState(true);
  const [mockData, setMockData] = useState(null);

  useEffect(() => {
    if (fetchData) {
      setFetchData(false);
      setMockData(getMockData());
    }
  }, [fetchData, setMockData])

  const refetchData = useCallback(() => {
    setFetchData(true);
  }, [setFetchData])

  const updateCustomer = useCallback((id, name) => {
    const { customers = [] } = mockData || {};
    if (customers.length > 0) {
      const customerIndex = customers.findIndex(cust => cust.id === id);
      if (customerIndex >= 0) {
        let tmpCust = customers[customerIndex];
        tmpCust.name = name;
        customers.splice(customerIndex, 1, tmpCust)
        const tmpMockData = {
          ...mockData,
          customers
        }
        setMockData(tmpMockData);
      }
    }
  }, [mockData, setMockData])

  const deleteCustomer = useCallback((id) => {
    const { customers = [], orders = [], orderDetails = [] } = mockData || {};
    if (customers.length > 0) {
      const customerIndex = customers.findIndex(cust => cust.id === id);
      if (customerIndex >= 0) {
        customers.splice(customerIndex, 1)
        const tmporders = orders.filter(order => order.customerId !== id);
        const tmpOrderIds = tmporders.map(order => order.id);
        const tmpMockData = {
          ...mockData,
          customers,
          orders: tmporders,
          orderDetails: orderDetails.filter(odetail => tmpOrderIds.includes(odetail.orderId))
        }
        setMockData(tmpMockData);
      }
    }
  }, [mockData, setMockData])

  const createOrder = useCallback((id) => {
    if (!id) return null;
    const { orders = [] } = mockData || {};
    const newOrder = {
      id: faker.random.uuid(),
      customerId: id,
      orderDate: new Date()
    }
    const tmpOrders = [newOrder, ...orders];
    const tmpMockData = {
      ...mockData,
      orders: tmpOrders
    }
    setMockData(tmpMockData);
    console.log('mockData: ', tmpMockData)
    return newOrder.id;
  }, [mockData, setMockData])

  const deleteOrder = useCallback((id) => {
    const { orders = [], orderDetails = [] } = mockData || {};
    if (orders.length > 0) {
      const orderIndex = orders.findIndex(order => order.id === id);
      if (orderIndex >= 0) {
        orders.splice(orderIndex, 1)
        const tmpOrderIds = orders.map(order => order.id);
        const tmpMockData = {
          ...mockData,
          orders: orders,
          orderDetails: orderDetails.filter(odetail => tmpOrderIds.includes(odetail.orderId))
        }
        setMockData(tmpMockData);
      }
    }
  }, [mockData, setMockData])

  const createOrderDetail = useCallback((orderId, item, qty, price) => {
    const { orderDetails = [] } = mockData || {};
    const newItem = {
      id: faker.random.uuid(),
      orderId: orderId,
      quantity: qty,
      price: price,
      itemDescription: item.name
    };
    const tmpOrderDetails = [...orderDetails, newItem];
    setMockData({
      ...mockData,
      orderDetails: tmpOrderDetails
    })
  }, [mockData, setMockData])

  const editOrderDetail = useCallback((itemId, item, qty, price) => {
    const { orderDetails = [] } = mockData || {};
    const itemIndex = orderDetails.findIndex(oitem => oitem.id === itemId);
    if (itemIndex >= 0) {
      const updatedItem = {
        ...orderDetails[itemIndex],
        quantity: qty,
        price: price
      }
      orderDetails.splice(itemIndex, 1, updatedItem)
      setMockData({
        ...mockData,
        orderDetails: orderDetails
      })
    }
  }, [mockData, setMockData])

  const deleteOrderDetail = useCallback((id) => {
    const { orderDetails = [] } = mockData || {};
    if (orderDetails.length > 0) {
      const orderDetailIndex = orderDetails.findIndex(order => order.id === id);
      if (orderDetailIndex >= 0) {
        orderDetails.splice(orderDetailIndex, 1)
        const tmpMockData = {
          ...mockData,
          orderDetails: orderDetails
        }
        setMockData(tmpMockData);
      }
    }
  }, [mockData, setMockData])

  const contextValue = useMemo(() => {
    return {
      refetchData,
      updateCustomer,
      deleteCustomer,
      createOrder,
      deleteOrder,
      createOrderDetail,
      editOrderDetail,
      deleteOrderDetail,
      ...mockData
    }
  }, [refetchData, updateCustomer, deleteCustomer, createOrder, deleteOrder, createOrderDetail, editOrderDetail, deleteOrderDetail, mockData])

  return (
    <MockDataContext.Provider value={contextValue}>
      {children}
    </MockDataContext.Provider>
  )
}

export default MockDataProvider;
