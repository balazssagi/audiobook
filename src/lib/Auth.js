
const CLIENT_ID =
  '01b8666f08ab1a5cbcbefebd3006e555ce7f9f71d8b20b1cd956ceea8434818d'
const REDIRECT_URL = 'https://localhost:3000/'
const STORAGE_KEY = 'token'

export default class Auth {

  static oAuthUrl = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=content_management_manage`

  static saveAccessToken() {
    const token = window.location.href.match(/#(?:access_token)=([\S\s]*?)&/)
    if (token) {
      localStorage.setItem(STORAGE_KEY, token[1])
    }
  }

  static get token() {
    return localStorage.getItem(STORAGE_KEY)
  }

  static get isAuthenticated() {
    return localStorage.getItem(STORAGE_KEY)
  }
}
