import feedparser

def parse_biorxiv_rss(rss_url):
    parsed_feed = feedparser.parse(rss_url)
    entries = parsed_feed.entries  # 获取RSS中的条目
    return entries
