import React, { useEffect } from 'react'
import Table from 'src/components/Table/Table'
import supplements from "public/supplements.json"

function Home() {
  useEffect(() => {
    console.log(typeof supplements)
  }, [])
  return (
    <div>
      <Table supplements={supplements} />
    </div>
  )
}

export default Home