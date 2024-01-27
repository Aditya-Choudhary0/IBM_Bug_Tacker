import { useRouter } from 'next/router'
import axios from 'axios'
import { Google } from 'google-auth-library'

function GoogleLogin() {
  const router = useRouter()

  const handleGoogleLogin = async () => {
    try {
      const oauth2Client = new Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })

      const response = await oauth2Client.getRequestHeaders({
        url: '/api/auth/google',
        method: 'GET',
    })

    const { access_token } = response.data
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const { name, email, picture } = userInfoResponse.data

    const response = await axios.post('/api/auth/google', {
      name,
      email,
      avatar: picture,
    })

    if (response.data.success) {
      router.push('/tracker')
    }
  } catch (error) {
    console.error(error)
  }
}

return (
  <button onClick={handleGoogleLogin}>
    Login with Google
  </button>
)
}

export default GoogleLogin