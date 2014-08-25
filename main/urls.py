# -*- coding: utf-8 -*-

from django.conf.urls import patterns, url
from main.views import *

MANAGER_BASE_URL = ""
urlpatterns = patterns('main.views',
                       url(r'^$', index),
                       url(r'^post-list/$', get_posts),
                       url(r'^post/(?P<pk>\d+)/$', post),
                       url(r'^post-edit/$', edit_post),
                       url(r'^post-edit/upload-image/$', upload_image),
                       url(r'^post-edit/create/$', create_post),
                       url(r'^random/$', create_fixture),
)