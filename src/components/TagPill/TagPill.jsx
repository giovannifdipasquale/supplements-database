import React from 'react'

function TagPill({ tag }) {
    return (

        <div
            key={tag}
            className="bg-zinc-500 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
        >
            {tag}
        </div>
    )
}

export default TagPill