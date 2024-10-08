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

### Frequency data

After investigating the API for word frequency (https://www.dwds.de/d/api#count-export,
https://www.dwds.de/d/worthaeufigkeit, https://www.dwds.de/d/api#:~:text=Worth%C3%A4ufigkeit%20(Frequenzbarometer),-Die%20Datenbasis%20f%C3%BCr&text=Um%20an%20die%20Daten%20f%C3%BCr,%2Ffrequency%2F%3Fq%3DHaus.), 
I will need to pass the word's lemma as a URL parameter. This lemma I can fetch from an API dlexDB which is a lexical
database "based on the reference corpus of the German language of the 20th century compiled by the Digital Dictionary
of the German Language (DWDS) at the Berlin-Brandenburg Academy of Science (BBAW)."

Once I have the lemma, I can get the frequency data (number of tokens matching the lemma found in multitude of corpora 
and the corresponding frequency level).

###  Progression curve data

Initially I wanted to include this graph into my app to understand how the usage tendency for a given word
has been going from the past up until now (source: DWDS).

![img.png](dwds-progression-curve.png)

However, DWDS API doesn't provide the data (values for x and y axis) to build the graph.
I did find links on DWDS website for the raw data that they use on their end.
That raw data is collected from various corpora (23 corpora), meaning that if I want to plot the same graph as 
DWDS, I would have to make separate requests to these corpora APIs. Once the data is collected,
I would have to process the data and follow the formulas for the window, smoothing coefficient, confidence, etc.
provided on DWDS website (https://www.dwds.de/d/plot#erweitert) to make the graph look the same.

I don't find this to be a nice solution, as it would make the app maintenance more complex,
given that I have to interrogate so many sources.

Therefore, to keep things simple, I won't plot the graph on the app and will rely on the lemma frequency data.