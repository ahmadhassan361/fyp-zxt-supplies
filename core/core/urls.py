"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,re_path
from api.views import *
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
urlpatterns = [
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    path('admin/', admin.site.urls),
    path('api/scrape/', scrapingPerformance),
    path('api/register/', SignupAPIView.as_view(),name='register'),
    path('api/login/', LoginAPIView.as_view(),name='login'),
    path('api/categories/', CategoryListView.as_view(), name='category-list'),
    path('api/products/', ProductListView.as_view(), name='product-list'),
    path('api/get-product/', getProduct, name='product'),
    path('api/processors/', ProcessorsListView.as_view(), name='processors-list'),
    path('api/cooling/', CoolingListView.as_view(), name='processors-list'),
    path('api/casings/', CasingsListView.as_view(), name='processors-list'),
    path('api/ram/', RamListView.as_view(), name='ram-list'),
    path('api/powersupply/', PowerSupplyListView.as_view(), name='powersupply-list'),
    path('api/graphicscard/', GraphicsCardListView.as_view(), name='graphicscard-list'),
    path('api/storagedrive/', StorageDriveListView.as_view(), name='storagedrive-list'),
    path('api/motherboard/', MotherboardListView.as_view(), name='motherboard-list'),
    path('api/games/', GamesListView.as_view(), name='games-list'),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
