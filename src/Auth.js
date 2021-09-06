class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(email, password, cb, handleOpenSnackBar) {
        const usersStr = localStorage.getItem("users")
        const usersArr = JSON.parse(usersStr)

        const thisUser = usersArr.filter(user  => email === user.email && 
            password === user.password)

        if(thisUser.length > 0) {
            console.log(thisUser)
            this.authenticated = true;
            localStorage.setItem("authenticated", true)
            cb()
        } else{
            handleOpenSnackBar()
        }     
    }

    register(user, cb) {
        const usersStr = localStorage.getItem("users")
        const usersArr = JSON.parse(usersStr)
        let users = null
        usersArr === null ? users = [] : users = usersArr
        users.push(user)

        const usersStrSave = JSON.stringify(users)
        localStorage.setItem("users", usersStrSave)
        this.authenticated = true;
        localStorage.setItem("authenticated", true)
        cb()
    }

    logout(cb) {
        this.authenticated = false;
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        localStorage.setItem("authenticated", false)
        cb()
    }

    isAuthenticated() {
        const authenticated = localStorage.getItem("authenticated")
        return authenticated;
    }
}

export default new Auth()