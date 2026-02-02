import React, { useEffect } from 'react'
import Table from 'src/components/Table/Table'
import supplements from "public/supplements.json"

function Home() {
  return (
    <div>
      <Table supplements={supplements} />
    </div>
  )
}

export default Home