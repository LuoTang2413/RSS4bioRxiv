// rssParser.js

// ... (previous code)

// Modify the fetchAndParseRss function to include additional information
const fetchAndParseRss = async () => {
  try {
    const response = await fetch(rssUrl);
    const xmlData = await response.text();

    // Parse XML data
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

    // Extract information including title, link, date, summary, and author
    const items = xmlDoc.querySelectorAll('item');
    const data = Array.from(items).map(item => {
      return {
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        date: item.querySelector('pubDate').textContent,
        summary: item.querySelector('description').textContent,
        author: item.querySelector('dc\\:creator').textContent  // Use the appropriate tag for author
      };
    });

    return data;
  } catch (error) {
    console.error('Error fetching or parsing RSS data:', error);
    throw error;
  }
};

// ... (rest of the code)
