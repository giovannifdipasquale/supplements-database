import React, { useEffect } from 'react'
import Table from 'src/components/Table/Table'
import supplements from "public/supplements.json"

function Home() {
  return (
    <div>
      <h1 className="md:text-6xl text-4xl text-4xl bg-eee font-bold text-center text-dark pt-8 pb-6">
        <span className="text-shadow-teal text-zinc-600"> Full database </span>
      </h1 >
      <Table supplements={supplements} />
    </div >
  )
}

export default Home