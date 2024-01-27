import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

function Register() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    if (avatar) {
      formData.append('avatar', avatar)
    }

    try {
      const response = await axios.post('/api/auth/register', formData)
      if (response.data.success) {
        router.push('/auth')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
      />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register