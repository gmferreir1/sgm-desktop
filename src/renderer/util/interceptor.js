import Bus from '@/util/bus'
http.interceptors.request.use(function (config) {

  const baseUrl = config.baseURL
  const localStorageData = JSON.parse(window.localStorage.getItem('dataLogin'))
  const urlCurrent = url(baseUrl, config.url)

  if (urlCurrent !== '/auth') {
    if (localStorageData && localStorageData.token) {
      config.headers.Authorization = `bearer ${localStorageData.token}`
    }
  }

  return config

}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use((response) => {
  setTimeout(() => Bus.$emit('closeLoading'), 300)

  return response
}, function (error) {

  setTimeout(() => Bus.$emit('closeLoading'), 300)

  const urlCurrent = url(error.response.config.baseURL, error.response.config.url)

  if (error.response.status === 401 && urlCurrent !== '/login/authenticate') {
    window.localStorage.clear()
    window.location.href = '/'
  }

  if (error.response.status === 404) {
    window._notification.error('URL API não encontrada')
  }

  if (error.response.status === 422) {
    const errors = error.response.data.errors
    //errors.map(res => setTimeout(() => window._notification.error(res.msg, 450), 300))
    errors.forEach(error => setTimeout(() => window._notification.error(error.msg, 450), 300))
  }

  if (error.response.status === 400 || error.response.status === 403) {
    const errors = error.response.data
    errors.map(res => setTimeout(() => window._notification.error(res.message, 450), 300))
  }

  //if (error.response.status === 403 || error.response.status === 403) {

    //setTimeout(() => window._notification.error(error.response.data.message, 450), 300)
  //}

  if (error.response.status === 500) {
    window._notification.error('Ocorreu um erro interno no servidor !')
  }

  return Promise.reject(error)
})

const url = (appUrl, urlCurrent) => urlCurrent.split(appUrl)[1]
