import React, { Component } from 'react'
import Auth from '../../lib/Auth'
import Api from '../../lib/Api'
import { Link } from 'react-router-dom'

class Home extends Component {
  state = {
    books: [],
  }

  async componentWillMount() {
    Auth.saveAccessToken()
    if (Auth.isAuthenticated) {
      Api.initApi()
      const books = await Api.getBooks()
      this.setState({
        books,
      })
    }
  }


  render() {
    const { books } = this.state

    return Auth.isAuthenticated ? (
      <div>
        {books && books.map(book => {
          return (
            <h1 key={book.id}>
              <Link to={`/book/${book.id}`}>
                {book.author} – {book.title}
              </Link>
            </h1>
          )
        })}
      </div>
    ) : (
      <a href={Auth.oAuthUrl}>Login</a>
    )
  }
}

export default Home
