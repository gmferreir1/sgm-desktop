const isLogged = () => {
  const userLogged = localStorage.getItem('dataLogin') ? JSON.parse(localStorage.getItem('dataLogin')) : null

  if (!userLogged || !userLogged.token) {
    return false
  }
  return true
}

const isAdmin = () => {
  const userLogged = localStorage.getItem('dataLogin') ? JSON.parse(localStorage.getItem('dataLogin')) : null

  if (userLogged.admin) {
    return true
  }

  return false
}

const getDataUserLogged = () => {
  return JSON.parse(localStorage.getItem('dataLogin'))
}

export {
  isLogged,
  isAdmin,
  getDataUserLogged
}