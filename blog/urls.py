# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url
from django.conf.urls.static import static

from django.contrib import admin
from django.http import HttpResponseRedirect
from blog import settings

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'blog.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', lambda x: HttpResponseRedirect('/blog/')),
    url(r'^blog/', include('main.urls')),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
