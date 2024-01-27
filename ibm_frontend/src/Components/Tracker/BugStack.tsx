import { useState } from 'react'
import BugCard from './BugCard'


interface BugStackProps {
  bugs: {
    id: string
    title: string
    description: string
    source: string
    severity: string
    raised_by: {
      id: string
      name: string
      avatar: string
    }
    created_at: Date
    updated_at: Date
  }[]
  severity: string
}

function BugStack({ bugs, severity }: BugStackProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(false)

    const bugId = e.dataTransfer.getData('bugId')
    const bug = bugs.find((b) => b.id === bugId)
    if (!bug) {
      return
    }

    try {
      const response = await axios.put(`/api/bugs/${bug.id}`, {
        severity,
      })

      if (response.data.success) {
        router.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`bg-${severity}-500 p-4 rounded-md`}
    >
      <h2 className="text-white">{severity}</h2>
      {bugs.map((bug) => (
        <BugCard key={bug.id} bug={bug} />
      ))}
    </div>
  )
}

export default BugStack