import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

interface BugCardProps {
  bug: {
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
  }
}

function BugCard({ bug }: BugCardProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(bug.title)
  const [editedDescription, setEditedDescription] = useState(bug.description)

  const handleEdit = async () => {
    try {
      const response = await axios.put(`/api/bugs/${bug.id}`, {
        title: editedTitle,
        description: editedDescription,
      })

      if (response.data.success) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/bugs/${bug.id}`)

      if (response.data.success) {
        router.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <h3>{bug.title}</h3>
          <p>{bug.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default BugCard