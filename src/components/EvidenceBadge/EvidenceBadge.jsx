import React from 'react'

function EvidenceBadge({ evidenceLevel }) {
    const evidenceLevels = {
        "A": {
            textColor: "text-green-600",
            bgColor: "bg-green-400",
            width: "w-full"
        },
        "B": {
            textColor: "text-yellow-600",
            bgColor: "bg-yellow-400",
            width: "w-3/4"
        },
        "C": {
            textColor: "text-orange-600",
            bgColor: "bg-orange-400",
            width: "w-2/4"
        },
        "D": {
            textColor: "text-slate-500",
            bgColor: "bg-slate-300",
            width: "w-1/4"
        }
    }

    const level = evidenceLevels[evidenceLevel] || evidenceLevels["D"];

    return (
        <div className={`w-30 flex flex-col justify-center`}>
            <p className={`block text-sm font-semibold text-center ${level.textColor}`}>
                {evidenceLevel}
            </p>
            <div className={`flex justify-center h-2.5 w-full overflow-hidden rounded-full font-sans text-xs font-medium`}>
                <div
                    className={`flex items-center justify-center ${level.width} h-full overflow-hidden text-white break-all ${level.bgColor} rounded-full`}>
                </div>
            </div>
        </div >
    )
}

export default EvidenceBadge