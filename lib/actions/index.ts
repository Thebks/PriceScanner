"use server"

import { scrapeAmazonProduct } from "../scraper"

export async function scrapeAndSaveProduct(productUrl:string){
    if(!productUrl) return 
    
    try {
        const scrapedProduct = await scrapeAmazonProduct(productUrl)
    } catch (error: any) {
        throw new Error(`Failed to create/ update Product: ${error.message}`)
    }
} 

