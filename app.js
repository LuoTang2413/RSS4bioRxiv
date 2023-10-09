const cheerio = require('cheerio'); // Import Cheerio library

document.addEventListener('DOMContentLoaded', async function() {
    // Define the RSS feed URL for BioRxiv
    const bioRxivFeedURL = 'http://connect.biorxiv.org/biorxiv_xml.php?subject=all';

    // Fetch and parse the RSS feed
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${bioRxivFeedURL}`);
    const data = await response.json();

    // Check if data.items exists and is not empty
    if (data && data.items) {
        const newsList = document.getElementById('newsList');

        // Iterate through the feed items
        for (const item of data.items) {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const title = document.createElement('h2');
            title.textContent = item.title;

            const author = document.createElement('p');
            author.textContent = `Author: ${item.author}`;

            const summary = document.createElement('p');
            summary.textContent = item.description;

            const readOriginalLink = document.createElement('a');
            readOriginalLink.href = item.link; // Set the link to the original article
            readOriginalLink.textContent = 'Read Original'; // Text for the link

            // Fetch the content of the original article's webpage
            const articleResponse = await fetch(item.link);
            const articleHtml = await articleResponse.text();

            // Use Cheerio to parse the article's HTML
            const $ = cheerio.load(articleHtml);

            // Find PDF links within the article's content
            const pdfLinks = [];
            $('a').each((index, element) => {
                const href = $(element).attr('href');
                if (href && href.toLowerCase().endsWith('.pdf')) {
                    pdfLinks.push(href);
                }
            });

            // Create "View PDF" links for each PDF found
            pdfLinks.forEach(pdfLink => {
                const pdfLinkElement = document.createElement('a');
                pdfLinkElement.href = pdfLink;
                pdfLinkElement.textContent = 'View PDF';
                cardContent.appendChild(pdfLinkElement);
            });

            cardContent.appendChild(title);
            cardContent.appendChild(author);
            cardContent.appendChild(summary);
            cardContent.appendChild(readOriginalLink);

            card.appendChild(cardContent);

            newsList.appendChild(card);
        }
    }
});
