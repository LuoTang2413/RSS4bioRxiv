const axios = require('axios');
const parseString = require('xml2js').parseString;

// bioRxiv RSS Feed URL
const rssFeedUrl = 'http://connect.biorxiv.org/biorxiv_xml.php?subject=all';

// 定期检查更新的间隔（毫秒）
const checkInterval = 3600000; // 1小时

// 订阅更新并处理
function subscribeToUpdates() {
  axios.get(rssFeedUrl)
    .then(response => {
      if (response.status === 200) {
        parseString(response.data, (err, result) => {
          if (!err) {
            // 解析XML数据
            const feedEntries = result.feed.entry;

            // 处理每个条目
            feedEntries.forEach(entry => {
              const title = entry.title[0];
              const link = entry.link[0].$.href;
              const publishedDate = entry.published[0];
              
              // 在这里可以执行自定义操作，例如发送通知或保存到数据库
              console.log(`New bioRxiv update: ${title}`);
              console.log(`Link: ${link}`);
              console.log(`Published Date: ${publishedDate}`);
            });
          }
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// 启动订阅更新
subscribeToUpdates();

// 每隔一段时间重新检查更新
setInterval(subscribeToUpdates, checkInterval);
