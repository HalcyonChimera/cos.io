# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-14 16:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0043_custompage_menu_order'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='linkfields',
            name='link_document',
        ),
        migrations.RemoveField(
            model_name='linkfields',
            name='link_page',
        ),
        migrations.RemoveField(
            model_name='menuitem',
            name='linkfields_ptr',
        ),
        migrations.RemoveField(
            model_name='menumenuitem',
            name='menuitem_ptr',
        ),
        migrations.RemoveField(
            model_name='menumenuitem',
            name='parent',
        ),
        migrations.AlterField(
            model_name='custompage',
            name='menu_order',
            field=models.IntegerField(blank=True, help_text='The order this page should appear in the menu. The lower the number, the more left the page will appear. This is required for all pages where "Show in menus" is checked.', null=True),
        ),
        migrations.DeleteModel(
            name='LinkFields',
        ),
        migrations.DeleteModel(
            name='Menu',
        ),
        migrations.DeleteModel(
            name='MenuItem',
        ),
        migrations.DeleteModel(
            name='MenuMenuItem',
        ),
    ]
