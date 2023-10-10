import feedparser

# 解析新的RSS源
new_rss_url = 'http://new-rss-source.com/feed.xml'
feed = feedparser.parse(new_rss_url)

# 获取需要的数据（示例中仅获取第一条数据）
if len(feed.entries) > 0:
    entry = feed.entries[0]
    title = entry.title
    author = entry.author
    doi = entry.doi
    abstract = entry.abstract
    pub_date = entry.published

    # 读取现有的index.html内容
    with open('index.html', 'r') as file:
        html_content = file.read()

    # 替换HTML内容中的相应标记，将新的数据插入
    html_content = html_content.replace('{{Title}}', title)
    html_content = html_content.replace('{{Author}}', author)
    html_content = html_content.replace('{{DOI}}', doi)
    html_content = html_content.replace('{{Abstract}}', abstract)
    html_content = html_content.replace('{{PubDate}}', pub_date)

    # 保存更新后的index.html
    with open('index.html', 'w') as file:
        file.write(html_content)
else:
    print('没有找到新的RSS数据。')
