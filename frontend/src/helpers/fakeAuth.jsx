const fakeAuth = {
    authenticate(cb) {
        localStorage.setItem('token','fakeToken')
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        localStorage.removeItem('token')
        setTimeout(cb, 100) // fake async
    }
  }
  
export default fakeAuth