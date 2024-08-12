## Wiktionary API

There is no appropriate API that exists to extract data from **german** wiktionary.

Currently, it's possible to retrieve the whole html page by calling https://de.wiktionary.org/api/rest_v1/page/html/:word
end-point and then use jQuery or similar technology to extract useful information.

jQuery vs Cheerio: After doing research on this topic, I decided to go with Cheerio as it's more lightweight that jQuery.
Cheerio is also designed for server-side usage with NodeJS, which is exactly what I am looking for as the backend is in Node.

For more info/differences between the two libraries, see:

https://stackshare.io/stackups/cheerio-vs-jquery
https://webscraping.ai/faq/cheerio/what-are-the-differences-between-cheerio-and-jquery

## DWDS API

### FrequencyData frequency

After investigating the API for word frequency (https://www.dwds.de/d/api#count-export,
https://www.dwds.de/d/worthaeufigkeit),
it turns out that the response I get for a word doesn't account for all its inflected forms.
In other words, the API returns the frequency of a word in the form I requested. For example,
If I query a frequency of a verb "to be" in infinitive (in German "sein"), I will get 791M tokens,
and if I make a query for the same verb in the past tense (in German "war" singular), I will get 
235K tokens.

Since I want to get the frequency of all the possible inflected versions of a word, I actually need to 
look for the lemma of the word and find it's frequency. To do this, I found an API dlexDB which is a lexical
database "based on the reference corpus of the German language of the 20th century compiled by the Digital Dictionary
of the German Language (DWDS) at the Berlin-Brandenburg Academy of Science (BBAW)." This corpus consists of:

"
- fiction approx. 28%
- newspapers approx. 27%
- scientific publications approx. 23%
- functional literature approx. 21%
"
Source: http://www.dlexdb.de/documentation/corpora/

