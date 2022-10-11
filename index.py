from jinja2 import Environment, FileSystemLoader


def main(database, content, log_generating, nesting_level, base_template):
    log_generating('Index files configuring:', nesting_level)

    for counter, items in enumerate(content.items()):
        title, page_content = items 
        path = title + '/' if title != 'main_page' else ''
        title = title.capitalize().replace('_', ' ')
        log_generating(title + ': page content updating', nesting_level+1)

        content_template = Environment(loader=FileSystemLoader(path + 'assets')).get_template('content_template.html')
        log_generating('Template: created', nesting_level+2)

        try:
            table = page_content['configure'](database.cursor().execute(f"SELECT * FROM {title.lower().replace(' ', '_')};"), page_content.get('partitions', []), page_content.get('parametrs', []))
            log_generating('Table: received', nesting_level+2)
        except:
            log_generating("Table hasn't found")

        exec('content_render = content_template.render(table=table,' +
                ','.join(str(parametr + '=' + ("'"+value+"'" if isinstance(value, str) else str(value)))
                for parametr, value in page_content.items() if not callable(value)) + ')')
        log_generating('Content: rendered', nesting_level+2)

        eval("open(path + 'assets/content.html', 'w', encoding='utf-8').write(content_render)")
        log_generating('Content: saved', nesting_level+2)

        index = base_template.render(
            content = path + 'assets/content.html',
            title = title,
            path = '/'.join(['..']*(len(path.split('/'))-1)) + '/'
        )
        log_generating(title + ' was rendered', nesting_level+2)

        open(path + 'index.html', 'w', encoding='utf-8').write(index)
        log_generating(title + ' was saved', nesting_level+2, True)

    log_generating('All pages saved', nesting_level+1, True)
