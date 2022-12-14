import React, { useState, useEffect } from 'react'
import  Axios  from 'axios'
import CartItem from './CartItem'

import { datatype,random, commerce } from 'community-faker'
import { Container, Col, Row } from 'reactstrap'

const apikey = 'INSERT_YOUR_KEY_HERE'

const url = 'https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1'
const localurl =
  'https://jsonware.com/api/v1/json/3cbb41b0-2c5e-4069-95b3-32262b5bcc09?dynamic=true'

const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([])

  // const fetchPhotos = async () =>{
  //     const response = await Axios.get(url,{
  //         header:{
  //             Authorization:apikey
  //         }
  //     });
  // };

  const fetchPhotos = async () => {
    const { data } = await Axios.get(localurl,{});

    const { photos } = data;

    const allProduct = photos.map(photo => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: random.word(),
      productPrice: commerce.price(),
      id: datatype.uuid()
    }))

    setProduct(allProduct);

  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  return (
    <Container fluid>

        <h1 className='text-success text-center'>
            Buy Page
        </h1>
        <Row>
            {product.map(product =>{
                <Col md={4} key={product.id}>
                    <CartItem product={product} addInCart={addInCart}/>
                </Col>
            })}
        </Row>

    </Container>
  )

  
}

export default BuyPage
