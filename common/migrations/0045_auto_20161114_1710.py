# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-14 17:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0044_auto_20161114_1630'),
    ]

    operations = [
        migrations.AddField(
            model_name='formpage',
            name='menu_order',
            field=models.IntegerField(blank=True, help_text='The order this page should appear in the menu. The lower the number, the more left the page will appear. This is required for all pages where "Show in menus" is checked.', null=True),
        ),
        migrations.AddField(
            model_name='newsindexpage',
            name='menu_order',
            field=models.IntegerField(blank=True, help_text='The order this page should appear in the menu. The lower the number, the more left the page will appear. This is required for all pages where "Show in menus" is checked.', null=True),
        ),
    ]
