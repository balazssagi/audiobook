import { createClient } from 'contentful-management'
import Auth from './Auth'

const enUS = 'en-US'

let client

function normalizeBook(book) {
  return {
    id: book.sys.id,
    author: book.fields.author[enUS],
    title: book.fields.title[enUS],
    currentTime: book.fields.currentTime[enUS],
    currentFileId: book.fields.currentFileId[enUS],
    files: book.fields.files ? book.fields.files[enUS].map(file => {
      return {
        id: file.sys.id,
      }
    }) : [],
  }
}

function normalizeFile(file) {
  return {
    title: file.fields.title[enUS],
    url: file.fields.file[enUS].url,
  }
}

export default class Api {

  static initApi() {
    if(!client) {
      client = createClient({
        accessToken: Auth.token,
      })
    }
  }

  static getBooks() {
    return client
      .getSpace('lxkoveundpb9')
      .then(space => space.getEnvironment('master'))
      .then(environment => environment.getEntries({content_type: 'book'}))
      .then(response => response.items.map(normalizeBook))
      .catch(console.error)
  }

  static getBook(id) {
    return client
      .getSpace('lxkoveundpb9')
      .then(space => space.getEnvironment('master'))
      .then(environment => environment.getEntry(id))
      .then(response => normalizeBook(response))
      .catch(console.error)
  }

  static getFiles(book) {
    return client
      .getSpace('lxkoveundpb9')
      .then(space => space.getEnvironment('master'))
      .then(environment =>
        environment.getAssets({
          'sys.id[in]': book.files.map(file => file.id).join(','),
        })
      )
      .then(response => response.items.map(normalizeFile))
      .catch(console.error)
  }

  static updateBook(book, currentFileId, currentTime) {
    client
      .getSpace('lxkoveundpb9')
      .then(space => space.getEntry(book.id))
      .then(entry => {
        entry.fields.currentFileId = {'en-US': currentFileId}
        entry.fields.currentTime = {'en-US': Math.round(currentTime)}
        return entry.update()
      })
      .then(entry => console.log(`Entry ${entry.sys.id} updated.`))
      .catch(console.error)
  }
}
