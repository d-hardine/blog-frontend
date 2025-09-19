import axios from "axios"

export async function fetchAuth(setIsAuthenticated, setUsernameGlobal) {
    const token = localStorage.getItem('jwtToken')
    if(token) {
        try {
            const response = await axios.get('/api/auth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("reload authentication status: " + response.status)
            if(response.status === 200) {
                setIsAuthenticated(true)
                setUsernameGlobal(localStorage.getItem('username'))
            }
        } catch (err) {
            setIsAuthenticated(false)
            setUsernameGlobal('')
            localStorage.clear()
            console.error("You're logged out. Please login again.")
        }
    }
}