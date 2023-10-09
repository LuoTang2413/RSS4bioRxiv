// 定义订阅源的URL
const rssFeedUrl = "http://connect.biorxiv.org/biorxiv_xml.php?subject=all";

// 获取订阅源的数据
fetch(rssFeedUrl)
  .then((response) => response.text())
  .then((xmlData) => {
    // 解析XML数据
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");

    // 提取文章标题和链接
    const items = xmlDoc.querySelectorAll("item");
    const subscriptionList = document.getElementById("subscription-list");

    items.forEach((item) => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      // 创建列表项并添加到页面中
      const listItem = document.createElement("li");
      const linkElement = document.createElement("a");
      linkElement.href = link;
      linkElement.textContent = title;
      listItem.appendChild(linkElement);
      subscriptionList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("获取订阅数据时出错：", error);
  });
