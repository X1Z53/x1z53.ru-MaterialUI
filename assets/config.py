from sqlite3 import connect
from jinja2 import Environment, FileSystemLoader
from os import listdir

info_from_table = lambda table, partitions=[], parametrs=[]: {
    title: {
        section: {
            parametr: value
            for parametr, value in zip(parametrs, values[partition*len(parametrs) : partition*len(parametrs)+len(parametrs)])
        } for section, partition in zip(partitions, range(len(partitions)))
    } for title, *values in table
}

def log_generating (data_for_logging, nesting_level=0, is_last_level=False, continue_levels_count=0, end='\n'):
    print('    ' * continue_levels_count +
          '|   ' * (nesting_level - continue_levels_count) +
          (['|-- ', '`-- '][is_last_level] if nesting_level != -1 else '') +
          data_for_logging,
          end=end)

BASE_TEMPLATE = Environment(loader=FileSystemLoader('')).get_template('assets/template.html')

DATABASE = connect('database.db')

CONTENT = {
    'main_page': {
        'configure': lambda *table: {title: description for title, description in table[0]},

        'cols_in_row': 3
    },
    'collection': {
        'headers': ['Icons', 'Title', 'Version', 'Size', 'link.svg'],
        'parametrs': ['version', 'extension', 'size', 'new_version', 'download'],
        'partitions': ['full', 'installer', 'minimal', 'netinstaller', 'portable', 'universal'],
        
        'path_to_downloaded': 'collection/all',
        'icons_to_negative': []
    },
    'import_substitution': {
        'configure': lambda *table: {title: [analogues, classes] for title, analogues, classes in table[0]},
        'headers': ['Program', 'Analogue', 'Program Classes'],
        'parametrs': ['program', 'analogues', 'classes'],

        'source': 'https://www.informatizator.su/importozameshchayemsya/polny-perechen/'
    },
    'trum_blacklist': {
        'configure': lambda *table: {title: [reason, ban_period] for title, reason, ban_period in table[0]},
        'headers': ['Photo', 'Name', 'Reason for ban', 'Ban period'],
    },
    'preparations': {'configure': lambda: {}}
}

for page in CONTENT.values():
    if not page.get('configure'):
        page['configure'] = info_from_table