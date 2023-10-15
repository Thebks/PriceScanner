'use client'

import { scrapeAndSaveProduct } from '@/lib/actions'
import React, { FormEvent, useState } from 'react'



const isValidAmazonURL = (url:string) => {
  try {
    const parsedURL = new URL(url)
    const hostname = parsedURL.hostname

    if(hostname.includes("amazon.com")  || hostname.includes("amazon.") || hostname.endsWith("amazon")){
      return true;
    }
  } catch (error) {
    return false;
    
  }
  return false;
 
}

const Searchbar = () => {

  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonURL(searchPrompt)

    if(!isValidLink) return alert("Enter a valid Amazon link")

    try {
      setIsLoading(true)
      // Here we scrape products
      const product = await scrapeAndSaveProduct(searchPrompt)
      // console.log(product)
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }





  return (
    
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input 
         type="text"
         placeholder="Name if the product" 
         className="searchbar-input"
         value={searchPrompt}
         onChange={(e) => setSearchPrompt(e.target.value)} 
        />
        <button type="submit" className="searchbar-btn" disabled={searchPrompt === ""} >{isLoading ? "Searching..." : "Search"}</button>
    </form>
  )
}

export default Searchbar