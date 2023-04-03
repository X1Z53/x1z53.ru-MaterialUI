from sys import argv
from assets.config import log_generating, DATABASE, CONTENT, BASE_TEMPLATE
from update import main as update
from index import main as index


log_generating('Updating data', -1)
update(DATABASE, CONTENT, log_generating, 0, argv)

log_generating('Updating pages', -1)
index(DATABASE, CONTENT, log_generating, 0, BASE_TEMPLATE)

log_generating('All data has updated', -1)
