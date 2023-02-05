from ftplib import FTP
from os.path import abspath
from json import dumps

def ftp_walk(path):
    ftp.cwd(path)
    items = {}
    for program in ftp.nlst():
        if 'svg' in program: continue
        if '.' not in program: name, program_type, version = program, 'Folder', ''
        else: name, program_type, version = program.rsplit('.', 1)[0].rsplit(' ', 2)
        items[name] = {
            'type': program_type,
            'version': version,
            'file': program,
            'size': ftp.size(program) if program_type != 'Folder' else 0
        }
    
    return items

def format_file_size(size):
    for postfix in ['B', 'KB', 'MB', 'GB']:
        if size < 1024:
            size = f'{size:.1f} {postfix}'
            break

        size /= 1024

    return size


ftp = FTP('89.179.119.189')
ftp.login('admin', 'superroot1')

full_list = dumps(ftp_walk('3c3f5e3a-30e2-d801-3036-5e3a30e2d801/debian/root/collection'))
local_file = '/'.join(abspath(__file__).split('/')[:-1]) + '/../collection.json'
open(local_file, 'w').write(full_list)

