import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Col
} from "reactstrap";

function CustomTable({ title, items = [], columns = [], renderItem }) {
  const [data, setData] = useState(items)

  useEffect(() => {
    setData(items)
  }, [setData, items])

  return (
    <Col md="12">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive striped>
            <thead className="text-primary">
              <tr>
                {columns.map(column => {
                  return (
                    <th key={column}>{column}</th>
                  )
                })}
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => renderItem(item, index))
              }
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CustomTable;
