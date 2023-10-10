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

            const title = document.createElement('h2');
            title.textContent = item.title;

            const author = document.createElement('p');
            author.textContent = `Author(s): ${item.creator}`;

            const doi = document.createElement('p');
            doi.textContent = `DOI: ${item.identifier}`;

            const summary = document.createElement('p');
            summary.textContent = item.description;

            const pubDate = document.createElement('p');
            pubDate.textContent = `Published Date: ${item.date}`;

            const readOriginalLink = document.createElement('a');
            readOriginalLink.href = item.link; // Set the link to the original article
            readOriginalLink.textContent = 'Read Original'; // Text for the link

            // Construct the PDF download link based on the original link (assuming it's a common pattern)
            const pdfDownloadLink = `${item.link.replace('/cgi/content/short/', '/content/')}.full.pdf`;

            const pdfLink = document.createElement('a');
            pdfLink.href = pdfDownloadLink;
            pdfLink.textContent = 'Download PDF';

            cardContent.appendChild(title);
            cardContent.appendChild(author);
            cardContent.appendChild(doi);
            cardContent.appendChild(summary);
            cardContent.appendChild(pubDate);
            cardContent.appendChild(readOriginalLink);
            cardContent.appendChild(pdfLink); // Add the PDF download link

            card.appendChild(cardContent);

            newsList.appendChild(card);
        });
    }
});
