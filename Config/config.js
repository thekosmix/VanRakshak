const protocol = "http"
const host = "10.50.12.136"
//const host = "192.168.1.14"
const port = "80"

const server = `${protocol}://${host}:${port}`
const userApis = {
    register: "/api/users/register",
    login: "/api/users/login",
    activities: "/api/users/activities"
}

export {server, userApis}