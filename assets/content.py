from sqlite3 import connect
from jinja2 import Environment, FileSystemLoader
from .config import TABLE, DATABASE, COLS_IN_ROW, full_list
from math import ceil


def main(path):
    print('>> Start /assets/content.py main function')

    template = Environment(loader=FileSystemLoader(path)).get_template('content_template.html')
    print(f">> Template for {'/' + path + 'content_template.html'} was created")

    table = connect(DATABASE).cursor().execute(f'SELECT * FROM {TABLE};')
    print('>> Database was connected')

    table = full_list(table)
    print('>> Database was configured')

    content = template.render(rows=ceil(len(table)/COLS_IN_ROW), cols_in_row=COLS_IN_ROW, cols=table)
    print('>> Content was rendered')

    with open(path + 'content.html', 'w', encoding="utf-8") as file:
        file.write(content)
    print('>> File wrote')
