## Wiktionary API

There is no appropriate API that exists to extract data from **german** wiktionary.

Currently, it's possible to retrieve the whole html page by calling https://de.wiktionary.org/api/rest_v1/page/html/:word
end-point and then use jQuery or similar technology to extract useful information.

jQuery vs Cheerio: After doing research on this topic, I decided to go with Cheerio as it's more lightweight that jQuery.
Cheerio is also designed for server-side usage with NodeJS, which is exactly what I am looking for as the backend is in Node.

For more info/differences between the two libraries, see:

https://stackshare.io/stackups/cheerio-vs-jquery
https://webscraping.ai/faq/cheerio/what-are-the-differences-between-cheerio-and-jquery

