# Generated by Django 4.2.1 on 2023-05-15 00:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_casingimages'),
    ]

    operations = [
        migrations.CreateModel(
            name='PerformanceScrape',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('output', models.ImageField(null=True, upload_to='scrape-images/')),
            ],
        ),
    ]