# -*- coding: utf-8 -*-

from django.db import models
from django.utils.html import strip_tags


class Category(models.Model):
    name = models.CharField(max_length=150)


class Tag(models.Model):
    name = models.CharField(max_length=150)


class Post(models.Model):
    title = models.CharField(max_length=150)
    text = models.TextField()
    date = models.DateTimeField()
    category = models.ForeignKey(Category)
    tags = models.ManyToManyField(Tag)
    post_image = models.CharField(max_length=300, null=True)
    is_public = models.BooleanField(default=False, blank=True)

    @property
    def cut_text(self):
        index = self.text.find("<cut/>")
        if index != -1:
            return strip_tags(self.text[0:index]).replace(";/&nbsp;", " ")
        else:
            return strip_tags(self.text)[0:300].replace(";/&nbsp;", " ")

    class Meta:
        ordering = ["-date"]



