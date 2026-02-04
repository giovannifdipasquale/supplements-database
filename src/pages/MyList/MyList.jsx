import React, { useContext } from 'react'
import Table from 'src/components/Table/Table'
import { MySupplementsContext } from 'src/context/MySupplementsContext'
import supplements from 'public/supplements.json'

function MyList() {
  const { mySupplements } = useContext(MySupplementsContext);
  const supplementsArr = mySupplements.map((id) => {
    return supplements.find((supplement) => supplement.id === id);
  });

  return (
    <Table supplements={supplementsArr} />
  )
}

export default MyList