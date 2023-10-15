import axios from "axios";
import * as cheerio from 'cheerio'
import { extractPrice } from "../utils";

export async function scrapeAmazonProduct( url:string){
    if(!url) return;

    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_be983ad5-zone-unblocker:zv1x2fgfgo12 -k https://lumtest.com/myip.json

    // Bright data proxy congiguraiton
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (1000000 * Math.random()) | 0;  // `| 0` is bitwise OR operation to round the number to its nearest integer.  

    const options = {
        auth:{
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized:false
    }

    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data)

        // Extract the Product Title
        const title = $('#productTitle').text().trim();

        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('a-button-selected a.color-base'),
            // $('.a-price.a-text-price'),
            $('.a-price.a-text-price.a-size-medium.apexPriceToPay')
        );

        console.log({title, currentPrice});
        // console.log(response.data)
    } catch (error:any) {
        throw new Error(`Failed to scrap the product: ${error.message}`)
    }
}

