// index.js

const fetch = require('node-fetch');

// RSS URL
const rssUrl = 'http://connect.biorxiv.org/biorxiv_xml.php?subject=all';

// Function to fetch and parse RSS data
const fetchAndParseRss = async () => {
  try {
    const response = await fetch(rssUrl);
    const xmlData = await response.text();

    // Parse XML data
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

    // Extract information (e.g., titles, links, dates)
    const items = xmlDoc.querySelectorAll('item');
    const data = Array.from(items).map(item => {
      return {
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        date: item.querySelector('pubDate').textContent
      };
    });

    return data;
  } catch (error) {
    console.error('Error fetching or parsing RSS data:', error);
    throw error;
  }
};

// Endpoint to handle requests
const handler = async (req, res) => {
  try {
    const rssData = await fetchAndParseRss();

    // Build HTML to display RSS data
    const html = `<ul>${rssData.map(item => `<li><a href="${item.link}">${item.title}</a> - ${item.date}</li>`).join('')}</ul>`;

    // Send the HTML response
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = handler;
