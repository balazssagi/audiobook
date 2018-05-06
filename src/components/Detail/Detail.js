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
    const book = await Api.getBook(this.props.match.params.id)
    const files = await Api.getFiles(book)
    this.setState({
      book,
      files,
      activeFileIndex: book.currentFileId,
    }, () => {
      this.audioElement.currentTime = book.currentTime
    })
  }

  componentWillUnmount() {
    console.log(this.audioElement.currentTime)
    Api.updateBook(this.state.book, this.state.activeFileIndex, this.audioElement.currentTime)
  }

  timer = null

  componentDidMount() {
    timer = setInterval(() => {
      Api.updateBook(this.state.book, this.state.activeFileIndex, this.audioElement.currentTime)
    }, 10000)
  }

  setActiveFile = index => {
    this.setState({
      activeFileIndex: index,
    })
  }

  render() {
    const { book, files, activeFileIndex } = this.state

    return (
      <div>
        {JSON.stringify(this.state)}
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
                >
                  {file.title}
                </li>
              ))}
            </ul>
            <audio
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
