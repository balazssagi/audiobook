import React, { Component } from 'react'
import Api from '../../lib/Api'

class Home extends Component {
  state = {
    book: null,
    files: [],
    activeFileIndex: 0,
  }

  audioElement = null

  async componentDidMount() {
    Api.initApi()
    const book = await Api.getBook(this.props.match.params.id)
    const files = await Api.getFiles(book)
    this.setState({
      book,
      files: files.sort((a, b) => a.title.localeCompare(b.title)),
      activeFileIndex: book.currentFileId,
    }, () => {
      this.audioElement.currentTime = book.currentTime
      this.audioElement.addEventListener('ended', () => {
        this.setState(state => ({
          activeFileIndex: Math.min(state.activeFileIndex + 1, state.files.length - 1)
        }))
      })
      this.timer = setInterval(() => {
        Api.updateBook(this.state.book, this.state.activeFileIndex, this.audioElement.currentTime)
      }, 10000)
    })
  }

  componentWillUnmount() {
    Api.updateBook(this.state.book, this.state.activeFileIndex, this.audioElement.currentTime)
    clearInterval(this.timer)
  }

  timer = null

  setActiveFile = index => {
    this.setState({
      activeFileIndex: index,
    })
  }

  render() {
    const { book, files, activeFileIndex } = this.state

    return (
      <div>
        {book && (
          <div>
            <h1>
              {book.author} – {book.title}
            </h1>
            <ul>
              {files.map((file, i) => (
                <li
                  onClick={() => {
                    this.setActiveFile(i)
                  }}
                  style={{
                    color: i === activeFileIndex ? 'blue' : 'black'
                  }}
                >
                  {file.title}
                </li>
              ))}
            </ul>
            <audio
              style={{
                width: '100%'
              }}
              ref={audioElement => {
                this.audioElement = audioElement
              }}
              controls
              autoPlay
              src={files[activeFileIndex].url}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Home
