# -*- coding: utf-8 -*-

from django.conf.urls import patterns, url
from main.views import *

MANAGER_BASE_URL = "manager/"
urlpatterns = patterns('main.views',
                       url(r'^$', index),
                       url(r'^posts$', Post.read),
)