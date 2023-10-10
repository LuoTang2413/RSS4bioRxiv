// rssParser.js

// ... (previous code)

// Function to fetch and display RSS data
const fetchAndDisplayRss = async (targetElementId) => {
  try {
    const rssData = await fetchAndParseRss();

    // Build HTML to display RSS data
    const html = `<ul>${rssData.map(item => `<li><a href="${item.link}">${item.title}</a> - ${item.date}</li>`).join('')}</ul>`;

    // Display the HTML content in the specified element
    document.getElementById(targetElementId).innerHTML = html;
  } catch (error) {
    console.error('Error fetching or parsing RSS data:', error);
  }
};

// ... (rest of the code)
