import feedparser
from jinja2 import Environment, FileSystemLoader

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

    # 使用Jinja2模板引擎来动态生成HTML内容
    env = Environment(loader=FileSystemLoader('.'))
    template = env.get_template('template.html')
    rendered_html = template.render(
        Title=title,
        Author=author,
        DOI=doi,
        Abstract=abstract,
        PubDate=pub_date
    )

    # 保存更新后的index.html
    with open('index.html', 'w') as file:
        file.write(rendered_html)
else:
    print('没有找到新的RSS数据。')
