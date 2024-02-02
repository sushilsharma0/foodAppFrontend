import React from 'react'
import Carousel from '../components/Carousel'
import Products from '../components/Products'
import SalesProduct from '../components/SalesProduct'
import Catagory from '../components/Catagory'
import TopFood from '../components/TopFood'
import Information from '../components/Information'


function Home() {
  return (
    <span className='bg-white'>
    <Carousel />
    <Catagory />
    <Information />
    <SalesProduct />
    <Products />
    <TopFood />
    </span>
  )
}

export default Home