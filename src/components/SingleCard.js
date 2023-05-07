import React from 'react'
import Card from 'react-bootstrap/Card'
import '../styles/myCard.css'
import { useState } from 'react'


const SingleCard = ({asin, title, img, price, category, selected, setSelected}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const selectBook = () => {
    setSelected(asin)
    toggleModal()
  }
  return (
    <Card
      className={`${selected === asin ? 'border border-danger shadow' : null}`}
      key={asin} 
      style={{ width: '18rem' }}
      onClick={selectBook}
      >
      <Card.Img className='object-fit-cover w-100 imageHeight' variant="top" src={img} />
      <Card.Body>
        <Card.Title className='text-truncate'>{title}</Card.Title>
        <Card.Text>
          {category}
        </Card.Text>
        <Card.Text>
          {`${price} $`}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SingleCard