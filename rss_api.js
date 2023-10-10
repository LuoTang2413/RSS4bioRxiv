// 以下是一个基本的JavaScript示例，用于在网页上显示解析后的RSS信息

const rssUrl = "YOUR_BIORXIV_RSS_URL";

fetch(`/api/parse-rss?url=${rssUrl}`)
  .then(response => response.json())
  .then(data => {
    // 在网页上展示RSS信息
    const rssContainer = document.getElementById("rss-container");
    data.entries.forEach(entry => {
      const entryDiv = document.createElement("div");
      entryDiv.innerHTML = `<a href="${entry.link}">${entry.title}</a>`;
      rssContainer.appendChild(entryDiv);
    });
  })
  .catch(error => {
    console.error("Error fetching and displaying RSS data:", error);
  });
