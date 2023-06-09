from django.contrib import admin
from .models import *
admin.site.site_header = "ZXT Supplies"
admin.site.site_title = "ZXT Admin Portal"
admin.site.index_title = "Welcome to ZXT Supplies"
# Register your models here.
admin.site.register(UserDetailsModel)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product)
admin.site.register(ProductOption)
admin.site.register(Images)
admin.site.register(Stock)
admin.site.register(Processors)
admin.site.register(Ram)
admin.site.register(GraphicsCard)
admin.site.register(PowerSupply)
admin.site.register(StorageDrive)
admin.site.register(Casing)
admin.site.register(CasingImages)
admin.site.register(Motherboard)
admin.site.register(CustomBuild)
admin.site.register(Games)
admin.site.register(CustomBuildStats)
admin.site.register(PreBuiltPerformanceStats)
admin.site.register(Cart)
admin.site.register(ProductCartItem)
admin.site.register(CreateOrder)
admin.site.register(Cooler)
admin.site.register(ProductOrderItem)
admin.site.register(CustomBuildOrderItem)
admin.site.register(PerformanceScrape)