# -*- coding: utf-8 -*-

from django.conf.urls import patterns, url
from main.views import *

MANAGER_BASE_URL = ""
urlpatterns = patterns('main.views',
                       url(r'^$', index),
                       url(r'^post-list/$', get_posts),
                       url(r'^post/(?P<pk>\d+)/$', post),
                       url(r'^random/$', create_fixture),
)