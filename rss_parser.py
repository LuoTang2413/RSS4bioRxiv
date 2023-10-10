import feedparser

# 解析RSS源
rss_url = "http://connect.biorxiv.org/biorxiv_xml.php?subject=all"
feed = feedparser.parse(rss_url)

# 创建一个列表，用于存储RSS条目
rss_entries = []

# 遍历RSS数据并将它们添加到列表中
for entry in feed.entries:
    title = entry.title
    author = entry.author
    doi = entry.doi
    abstract = entry.abstract
    pub_date = entry.published

    rss_entries.append({
        "title": title,
        "author": author,
        "doi": doi,
        "abstract": abstract,
        "pub_date": pub_date
    })

# 以HTML格式生成RSS内容
html_content = "<html><head><title>RSS Feed</title></head><body>"
for entry in rss_entries:
    html_content += f"<h2>{entry['title']}</h2>"
    html_content += f"<p>Author: {entry['author']}</p>"
    html_content += f"<p>DOI: {entry['doi']}</p>"
    html_content += f"<p>Abstract: {entry['abstract']}</p>"
    html_content += f"<p>Published Date: {entry['pub_date']}</p>"
html_content += "</body></html>"

# 保存HTML内容到index.html
with open('index.html', 'w', encoding='utf-8') as file:
    file.write(html_content)
