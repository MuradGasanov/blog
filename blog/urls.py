# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.http import HttpResponseRedirect

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'blog.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', lambda x: HttpResponseRedirect('/blog/')),
    url(r'^blog/', include('main.urls')),
)
