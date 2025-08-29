import sys
import os

# Adicionar o diretório da aplicação ao PYTHONPATH
sys.path.insert(0, '/home4/lkhold21/Enjoy-Solucoes')

os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()