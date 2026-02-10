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
    <>
      <h1 className="md:text-6xl text-4xl bg-eee font-bold text-center text-dark p-10">
        <i className="bi bi-layers-fill px-4 text-zinc-600 text-shadow-teal"></i>
        <span className="text-shadow-teal text-plum">My Stack</span>
      </h1>
      <Table supplements={supplementsArr} />
    </>
  )
}

export default MyList