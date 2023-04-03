def main(database, content, log_generating, nesting_level, argv):
    log_generating('Choose page(s) for update', nesting_level)

    updatable_pages = list(content.keys())
    argv = argv[1:]
    if not len(argv):
        for counter, page in enumerate(updatable_pages):
            page = page or 'Main page'
            log_generating(str(counter) + ': ' + page.capitalize().replace('_', ' '), nesting_level+1)
        log_generating('*: Full update', nesting_level+1)
        log_generating('/: Cancel', nesting_level+1)

    log_generating('Page for update: ', nesting_level+1, True, end='')
    if len(argv):
        choise = argv[0]
        log_generating(choise, nesting_level-1)
    else:
        choise = input()

    if choise == '/': exit()

    try:
        pages_for_update = [updatable_pages[int(choise)]]
    except ValueError:
        pages_for_update = updatable_pages

    log_generating(', '.join(map(lambda a: a.capitalize().replace('_', ' '), pages_for_update)) + ' updating', nesting_level)

    for page in pages_for_update:
        log_generating(page.capitalize().replace('_', ' ') + ': content update', 1, page==pages_for_update[-1])
        try:
            exec('from ' + (page + '.' if page != 'main_page' else '') + 'assets.update import main as update')
            exec('update(database, content[page], log_generating, nesting_level+1)')
        except ModuleNotFoundError:
            log_generating(page.capitalize().replace('_', ' ') + " update module hasn't found")