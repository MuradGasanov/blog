# -*- coding: utf-8 -*-

from django import template
from main import models

register = template.Library()


class CategoriesNode(template.Node):
    def __init__(self):
        self.categories = models.Category.objects.all()

    def render(self, context):
        categories_html = ""
        for category in self.categories:
            categories_html += '<option value="%d">%s</option>' % (category.id, category.name)
        return categories_html


def categories_render(parser, token):
    return CategoriesNode()

register.tag('categories', categories_render)