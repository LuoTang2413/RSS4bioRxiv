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
        data.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            // Fetch the dynamic original link to get detailed information
            fetch(item.link)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    const title = doc.querySelector('.article-header h1').textContent;
                    const author = doc.querySelector('.author-list').textContent;
                    const doi = doc.querySelector('.doi').textContent;
                    const summary = doc.querySelector('.abstract-content').textContent;
                    const pubDate = doc.querySelector('.pub-date').textContent;

                    // Assuming the PDF download link is available as a separate field
                    const pdfDownloadLink = doc.querySelector('.pdf-download-link').href;

                    const titleElement = document.createElement('h2');
                    titleElement.textContent = title;

                    const authorElement = document.createElement('p');
                    authorElement.textContent = `Author(s): ${author}`;

                    const doiElement = document.createElement('p');
                    doiElement.textContent = `DOI: ${doi}`;

                    const summaryElement = document.createElement('p');
                    summaryElement.textContent = summary;

                    const pubDateElement = document.createElement('p');
                    pubDateElement.textContent = `Published Date: ${pubDate}`;

                    const readOriginalLink = document.createElement('a');
                    readOriginalLink.href = item.link; // Set the link to the original article
                    readOriginalLink.textContent = 'Read Original'; // Text for the link

                    const pdfLink = document.createElement('a');
                    pdfLink.href = pdfDownloadLink;
                    pdfLink.textContent = 'Download PDF';

                    cardContent.appendChild(titleElement);
                    cardContent.appendChild(authorElement);
                    cardContent.appendChild(doiElement);
                    cardContent.appendChild(summaryElement);
                    cardContent.appendChild(pubDateElement);
                    cardContent.appendChild(readOriginalLink);
                    cardContent.appendChild(pdfLink); // Add the PDF download link

                    card.appendChild(cardContent);

                    newsList.appendChild(card);
                })
                .catch(error => {
                    console.error('Error fetching dynamic content:', error);
                });
        });
    }
});
