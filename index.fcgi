#!/usr/bin/scl enable rh-python35 -- /venv/bin/python 
import os, sys 

from flup.server.fcgi import WSGIServer 
from django.core.wsgi import get_wsgi_application 

sys.path.insert(0, "/home2/enjoy07/public_html/Enjoy-Solucoes/core") 
os.environ['DJANGO_SETTINGS_MODULE'] = "core.settings" 

WSGIServer(get_wsgi_application()).run()