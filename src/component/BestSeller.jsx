import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItems from './ProductItems'
import Title from './Title'
const BestSeller = () => {
  const {products} =useContext(ShopContext)
  const [bestSeller,setBestSeller] =useState([])
  useEffect(() => {
    const bestProduct = products.filter((item) => {
      return item.bestseller;
    });

    setBestSeller(bestProduct.slice(0, 5));
  
  }, [products]);
  return (
    <div className="my-10">
      <div className='text-center text-3x1 py-8 '>
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          dolorem sed impedit, voluptate ex officiis velit veritatis
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((product, index) => {
          return (
            <ProductItems
              key={index}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BestSeller
