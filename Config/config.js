const protocol = "http"
const host = "10.62.4.30"
//const host = "192.168.1.14"
const port = "80"

const server = `${protocol}://${host}:${port}`
const register = "/api/users/register"
const login = "/api/users/login"
const activities = "/api/users/activities"

export {server, register, login, activities}