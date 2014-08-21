# -*- coding: utf-8 -*-

from django.db import models


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
    is_public = models.BooleanField(default=False)


