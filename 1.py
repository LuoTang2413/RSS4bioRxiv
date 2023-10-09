def get_url_from_line(line_number):
    # 打开并读取文本文件
    with open('RSS_FEED_URL.txt', 'r') as file:
        lines = file.readlines()

    # 确保行号在有效范围内
    if 0 <= line_number < len(lines):
        url = lines[line_number].strip()
        return url
    else:
        return None

# 选择要读取的行号（例如，0表示第一行，1表示第二行，以此类推）
line_number = 2  # 这里选择第三行作为示例

# 获取并打印选择行的URL
url = get_url_from_line(line_number)
if url:
    print(f'URL at line {line_number}: {url}')
else:
    print(f'Line number {line_number} is out of range.')
