import feedparser
import requests
from bs4 import BeautifulSoup

# RSS地址
rss_url = 'http://connect.biorxiv.org/biorxiv_xml.php?subject=all'

# 解析RSS
feed = feedparser.parse(rss_url)

# 遍历每个条目的动态链接
for entry in feed.entries:
    dynamic_link = entry.link  # 获取动态链接
    
    # 发送HTTP请求获取动态链接的网页内容
    response = requests.get(dynamic_link)
    
    if response.status_code == 200:
        # 使用Beautiful Soup解析HTML内容
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 提取原文标题
        title = soup.find('h1').text.strip()
        print('原文标题:', title)
        
        # 提取作者（示例中假设作者在<span>标签中）
        authors = soup.find_all('span', class_='author-name')
        author_names = [author.text.strip() for author in authors]
        print('作者:', ', '.join(author_names))
        
        # 提取DOI（示例中假设DOI在<meta>标签中的属性中）
        doi_element = soup.find('meta', attrs={'name': 'citation_doi'})
        doi = doi_element.get('content') if doi_element else 'N/A'
        print('DOI:', doi)
        
        # 提取摘要（示例中假设摘要在<div>标签中）
        abstract_element = soup.find('div', class_='abstract')
        abstract = abstract_element.text.strip() if abstract_element else 'N/A'
        print('摘要:', abstract)
        
        # 提取发布时间（示例中假设发布时间在<meta>标签中的属性中）
        pub_date_element = soup.find('meta', attrs={'name': 'citation_publication_date'})
        pub_date = pub_date_element.get('content') if pub_date_element else 'N/A'
        print('发布时间:', pub_date)
        
        print('---')
    else:
        print(f'无法访问动态链接: {dynamic_link}')
