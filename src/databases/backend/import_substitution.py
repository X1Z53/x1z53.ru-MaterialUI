from ftplib import FTP
from dateutil.parser import parse
import openpyxl
from os.path import abspath
from json import dumps

ftp = FTP('89.179.119.189')
ftp.login('admin', 'superroot1')
ftp.cwd('3c3f5e3a-30e2-d801-3036-5e3a30e2d801/debian/root/import_substitution')

file_properties = list(ftp.mlsd())[-1]
filename, file_modify = file_properties[0], str(parse(file_properties[1]['modify']))
file_modify = '.'.join(file_modify.replace('-', ' ').split()[::-1]).replace('.', ' ', 1)
print('Modify date:', file_modify)

ftp.retrbinary('RETR ' + filename, open(filename, 'wb').write)
 
wookbook = openpyxl.load_workbook(filename)
worksheet = wookbook.active
result = {}

for i in range(1, worksheet.max_row):
    name, substitution, *classes = [cell[i].value for cell in worksheet.iter_cols(1, worksheet.max_column) if cell[i].value]
    subsititution = substitution.replace('"', "'")
    classes = [i.replace('"', "'") for i in classes]
    if name in result.keys():
        result[name]['substitution'] = '|'.join(set([*result[name]['substitution'].split('|'), substitution]))
        result[name]['classes'] = '|'.join(set([*result[name]['classes'].split('|'), *classes]))
    else:
        result[name] = {}
        result[name]['substitution'] = substitution
        result[name]['classes'] = '|'.join(classes)

result = dumps(result)
local_file = '/'.join(abspath(__file__).split('/')[:-1]) + '/../import_substitution.json'
open(local_file, 'w').write(result)
