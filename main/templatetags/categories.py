# -*- coding: utf-8 -*-

from django import template
from main import models

register = template.Library()


class CategoriesNode(template.Node):
    def __init__(self, param):
        if param == "all":
            self.categories = models.Category.objects.all()
        elif param == "used":
            used_category_id = models.Post.objects.order_by('category__id').values_list('category__id').distinct()
            self.categories = models.Category.objects.filter(id__in=used_category_id)

    def render(self, context):
        categories_html = ""
        for category in self.categories:
            categories_html += '<option value="%d">%s</option>' % (category.id, category.name)
        return categories_html


def categories_render(parser, token):
    try:
        # split_contents() knows not to split quoted strings.
        tag_name, param = token.split_contents()
    except ValueError:
        raise template.TemplateSyntaxError("%r tag requires a single argument" % token.contents.split()[0])
    if not (param[0] == param[-1] and param[0] in ('"', "'")):
        raise template.TemplateSyntaxError("%r tag's argument should be in quotes" % tag_name)
    return CategoriesNode(param[1:-1])

register.tag('categories', categories_render)