# -*- coding: utf-8 -*-

from django.conf.urls import patterns, url
from main.views import *

MANAGER_BASE_URL = ""
urlpatterns = patterns('main.views',
                       url(r'^$', index),
                       url(r'^post-list/$', get_posts),
                       url(r'^post/(?P<pk>\d+)/$', post),
                       url(r'^add-post/$', add_post),
                       url(r'^add-post/upload-image/$', upload_image),
                       url(r'^add-post/create/$', create_post),
                       url(r'^add-post/update/$', update_post),
                       url(r'^add-post/read/$', read_post),
                       url(r'^add-post/tags/$', tags),

                       url(r'^random/$', create_fixture),
)