import React, { useEffect } from 'react'
import Table from 'src/components/Table/Table'
import supplements from "public/supplements.json"

function Home() {
  return (
    <div>
      <h1 className="md:text-6xl text-4xl bg-eee font-bold text-center text-dark p-10">
        <i className="bi bi-database-fill px-4 text-zinc-600 text-shadow-teal"></i>
        <span className="text-shadow-teal text-plum">Supplements DB</span>
      </h1>
      <Table supplements={supplements} />
    </div >
  )
}

export default Home