"use client"
import Image from 'next/image'
import { Button } from '../../components/Button'
import { Table } from '../../components/Table'
import { Card } from '../../components/Card'
import useFilter from '../../hooks/useFilter';

export default function Home() {
  const tableHeaders = ['Name', 'Age', 'Country', 'Occupation'];
  const initialValues = [
    ['John Doe', 30, 'USA', 'Software Engineer'],
    ['Alither Smith', 25, 'Canada', 'Data Analyst'],
    ['Bob Johnson', 35, 'UK', 'Product Manager'],
    ['Catherine Lee', 30, 'Australia', 'UX Designer']
  ];

  const [tableData, setTableData, filterTableData, sortTableData] = useFilter(tableHeaders, initialValues);

  return (
    <>
      <Button text="Hello" onClick={() => { sortTableData('Age') }} />
      <Table headers={
        tableHeaders
      } data={
        tableData
      }
        itemsPerPageOptions={[3,5,10,20]}
      />
      <Card headerText="Hello" title="Hello World" subtitle="Hello America" text="Testing this card" buttonText='Hello World' onClick={() => { }}>

      </Card>
    </>
  )
}
