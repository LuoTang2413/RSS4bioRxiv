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
        data.items.forEach(async item => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            // Fetch the dynamic original link to get detailed information
            try {
                const response = await fetch(item.link);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const title = doc.querySelector('.article-header h1').textContent;
                const author = doc.querySelector('.author-list').textContent;
                const doi = doc.querySelector('.doi').textContent;
                const summary = doc.querySelector('.abstract-content').textContent;
                const pubDate = doc.querySelector('.pub-date').textContent;

                // Assuming the PDF download link is available as a separate field
                const pdfDownloadLink = doc.querySelector('.pdf-download-link').href;

                // Using template literals to generate HTML
                cardContent.innerHTML = `
                    <h2>${title}</h2>
                    <p>Author(s): ${author}</p>
                    <p>DOI: ${doi}</p>
                    <p>${summary}</p>
                    <p>Published Date: ${pubDate}</p>
                    <a href="${item.link}">Read Original</a>
                    <a href="${pdfDownloadLink}">Download PDF</a>
                `;

                card.appendChild(cardContent);
                newsList.appendChild(card);
            } catch (error) {
                console.error('Error fetching dynamic content:', error);
            }
        });
    }
});
