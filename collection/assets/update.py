from requests import get
from bs4 import BeautifulSoup as BS
from glob import glob
from os.path import getsize
from time import strftime, localtime


def update(log_generating, nesting_level, is_last_level, parametrs = []*9):
    name, link, content, word, slice_start, slice_end, split_symbol, download = parametrs
    version = '0'
    download = download or link

    log_generating(name, nesting_level, is_last_level, end=' ')
    try: session = get(link)
    except: return name, version, download

    html = BS(session.text, 'html.parser')
    element_response = html.select(content)

    if element_response:
        text = element_response[0].text.split(split_symbol)
        version = text[word][slice_start:slice_end] if word != None else ' '.join(text[slice_start:slice_end])

    log_generating(f'({version})', -1)
    return name, version, download

def file_size(file):
    size = getsize(file)
    for postfix in ['B', 'KB', 'MB', 'GB']:
        if size < 1024.0:
            size = f'{size:.1f} {postfix}'
            break

        size /= 1024.0

    return size

def scan(path, log_generating, nesting_level):
    '''
    Returning format:
    program_name1 (file): version, extension, size, version, download_link
    program_name2 (folder):
        section_name1 (folder): version, extension, size, version, download_link
        section2 (folder): version, extension, size, version, download_link
    '''

    downloaded = {}
    for file in map(lambda file: file[len(path)+1:].replace('\\', '/'),
                    glob(path+'/*/**/*.*', recursive=True)):
        file, section, folder = file.rsplit('/', 2)[::-1]
        size = file_size(f'{path}/{folder}/{section}/{file}')
        
        try:
            name, extension = file.split(').')
            _, version = name.split(' (', 1)
        except:
            log_generating('!!! Not formated file name: ' + file, nesting_level)
            continue

        if folder not in downloaded.keys(): downloaded[folder] = {}

        downloaded[folder][section] = [version, extension, size, version, '']

    return downloaded

def main(database, content, log_generating, nesting_level):
    log_generating('Directoryes scanning', nesting_level)
    downloaded = scan(content['path_to_downloaded'], log_generating, nesting_level+1)
    keys = dict([i, ''] if '/' not in i else [i.rsplit('/', 1)[1], i.rsplit('/', 1)[0]] for i in downloaded.keys())

    log_generating('Scan tables', nesting_level)
    for table in content['partitions']:
        log_generating(table.capitalize(), nesting_level+1)
        cursor = database.cursor()
        length = len(list(cursor.execute(f'SELECT * FROM {table};')))
        full_list = cursor.execute(f'SELECT * FROM {table};')

        for counter, item in enumerate(full_list):
            name, version, download = update(log_generating, nesting_level+2, counter == length-1, item)
            group = ''

            if name not in keys.keys(): downloaded[name] = {table: ['']*5}
            elif keys[name]: group = keys[name]

            try: downloaded[f"{group}{['/', ''][not group]}{name}"][table][-2:] = version, download
            except KeyError: log_generating('!!! ' + table.capitalize() + ' ' + name + ' not found', nesting_level+2)

    log_generating('Scan complete', nesting_level+1, True)

    log_generating('Filling table', nesting_level)
    log_generating('Start updating: ' + strftime('%H:%M:%S', localtime()), nesting_level)

    table = database.cursor()
    table.execute(f'SELECT * FROM collection;')
    table.execute(f'DELETE FROM collection;')

    for name, parametrs in downloaded.items():
        partitions = [partition.split('/')[0] + '_' + item for partition in parametrs.keys() for item in content['parametrs']]
        parametrs = ', '.join(', '.join('"'+parametr+'"' for parametr in partition_parametrs) for partition_parametrs in parametrs.values())

        request = f'''INSERT INTO collection(title, {", ".join(partitions)}) VALUES("{name}", {parametrs});'''
        table.execute(request)

    database.commit()

    log_generating('Updating has ended: ' + strftime('%H:%M:%S', localtime()), nesting_level, True)
