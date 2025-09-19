import axios from "axios"

export async function fetchAuth(setIsAuthenticated) {
    const token = localStorage.getItem('jwtToken')
    console.log('authenticating...')
    if(token) {
        try {
            const response = await axios.get('/api/auth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("authentication status: " + response.status)
            if(response.status === 200) {
                setIsAuthenticated(true)
            }
        } catch (err) {
            setIsAuthenticated(false)
            localStorage.clear()
            console.error("You're logged out. Please login again.")
        }
    } else {
        console.log('not authenticated')
    }
}