import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import { RingLoader } from 'react-spinners'
import BooksList from './BooksList'
import NewCommentArea from './NewCommentArea'
import '../styles/main.css'

function Main({term}) {
  const [booksList, setBooksList] = useState([])
  const [totalBooksList, setTotalBooksList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState('')
  const filterBooks = () => {
    if (term !== '') {
      setBooksList(totalBooksList.filter((book) => 
      book.title.toLowerCase().includes(term.toLowerCase())))
    } else {
      setBooksList(totalBooksList)
    }
  }
  const getBooks = async () => {
    setLoading(true)
    try {
      const data = await fetch('https://epibooks.onrender.com/')
      const response = await data.json()
      setBooksList(response)
      setTotalBooksList(response)
      setLoading(false)
    } catch (error) {
      if (error) {
        setError('Errore nella ricezione dei dati')
      }
    }
  }

  useEffect(() => {
    if (term === '') {
      getBooks()
    } else {
      filterBooks()
    }
  }, [term])
  return (
    <>
      {loading && !error && <RingLoader/>}
      {!loading && !error &&
        <Container className='mt-3 mb-3'>
          <Row>
            <Col sm={6} lg={8} xl={9}>
              <BooksList booksList={booksList} selected={selected} setSelected={setSelected}/>
            </Col>
            <Col sm={6} lg={4} xl={3}>
              {!selected && <div className='commentsContainer'></div>}
              { selected && <NewCommentArea bookId={selected}/>}
            </Col>
          </Row>
        </Container>
      }
      {error && <h2 className='text-danger'>{error}</h2>}
    </>
  );
}

export default Main;