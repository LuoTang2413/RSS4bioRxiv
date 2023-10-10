// rssParser.js

// ... (previous code)

// Function to fetch and display RSS data
const fetchAndDisplayRss = async (targetElementId) => {
  try {
    const rssData = await fetchAndParseRss();

    // Build HTML to display RSS data
    const rssList = document.getElementById(targetElementId);
    rssData.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
        <p><strong>Author:</strong> ${item.author}</p>
        <p><strong>Date:</strong> ${item.date}</p>
        <p><strong>Summary:</strong> ${item.summary}</p>
      `;
      rssList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching or parsing RSS data:', error);
  }
};

// ... (rest of the code)
