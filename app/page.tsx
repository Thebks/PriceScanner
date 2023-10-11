import React from 'react'
import Image from "next/image"
import Searchbar from '@/components/Searchbar'
import HeroCarousel from '@/components/HeroCarousel'

const Home = () => {
  return (
    <>
    <section className="px-6 md:px-20 py-24 border-2 border-red-500">
      <div className="flex max-xl:flex-col gap-16">
        <div className="flex flex-col justify-center">
          <p className="small-text">
            Online Shopping Made Easy
            {/* <Image /> */}
            <Image src="/assets/icons/arrow-right.svg" alt="arrow-right" width={16} height={16} /> 
          </p>
          <h1 className="head-text">Experience The Power of  
            <span className="text-primary"> PriceScanner</span>
          </h1>
          <p className="mt-6">Powerful tool for finding best value by comparing the prices of the products</p>

          <Searchbar />
        </div>

          <HeroCarousel />
      </div>
    </section>

    <section className="trnding-section">
      <h2 className="section-text">Trending Products</h2>

      <div className="flex flex-wrap gap-x-8 gap-y-16">
        {["Apple", "Books", "Shoes"].map((items) =>(
          <div>{items}</div>
        ))}
      </div>
    </section>
    </>
  )
}

export default Home