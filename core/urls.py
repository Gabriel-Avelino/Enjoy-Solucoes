"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include, url
from django.contrib import admin
from enjoy.views import index, associacao, transparencia, servicos, contato, noticias, sobreNos, noticia

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^associacao/$', associacao, name='associacao'),
    url(r'^sobre-nos/$', sobreNos, name='sobre-nos'),
    url(r'^servicos/$', servicos, name='servicos'),
    url(r'^transparencia/$', transparencia, name='transparencia'),
    url(r'^contato/$', contato, name='contato'),
    url(r'^noticias/$', noticias, name='noticias'),
    url(r'^noticia/(?P<id>\d+)/$', noticia, name='noticia'),
    url(r'^summernote/', include('django_summernote.urls')),
    url(r'^$', index, name='home'),
]

# Configuração para arquivos estáticos e mídia apenas no modo DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
