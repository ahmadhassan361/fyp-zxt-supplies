from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class UserDetailsModel(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='user')
    country = models.CharField(max_length=200,null=True,blank=True)
    address = models.CharField(max_length=200,null=True,blank=True)
    apartment = models.CharField(max_length=200,null=True,blank=True)
    city = models.CharField(max_length=200,null=True,blank=True)
    postalCode = models.CharField(max_length=10,null=True,blank=True)
    postalCode = models.CharField(max_length=15,null=True,blank=True)
    emailNewsLetter = models.BooleanField(default=False)
    saveInformation = models.BooleanField(default=False)
    textNewsOffer = models.BooleanField(default=False)

class Category(models.Model):
    name = models.CharField(max_length=200,null=True)
    image = models.ImageField(upload_to='category-images/',null=True)
    def __str__(self):
        return self.name
    
class SubCategory(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='sub_category')
    name = models.CharField(max_length=200,null=True)
    image = models.ImageField(upload_to='sub-category-images/',null=True)
    def __str__(self):
        return self.name +" ("+ str(self.category.name) +")"



class Product(models.Model):
    BRAND_CHOICES = (
        ('hp','hp'),
        ('dell','dell'),
        ('lenovo','lenovo'),
        ('asus','asus'),
        ('msi','msi'),
        ('apple','apple'),
    )
    category = models.ForeignKey(SubCategory,on_delete=models.CASCADE)
    title = models.CharField(max_length=200,null=True)
    subtitle = models.CharField(max_length=500,null=True)
    description = models.TextField(null=True)
    processor = models.CharField(max_length=100,null=True)
    gpu = models.CharField(max_length=100,null=True)
    ram = models.CharField(max_length=100,null=True)
    model = models.CharField(max_length=100,null=True)
    brand = models.CharField(max_length=100,null=True,choices=BRAND_CHOICES)
    image = models.ImageField(upload_to='product-images/',null=True)
    
    def __str__(self):
        return self.title +" ("+ str(self.category.name) +")"
    
class ProductOption(models.Model):
    name = models.CharField(max_length=244,null=True)
    value = models.CharField(max_length=244,null=True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='options')
    def __str__(self):
        return self.name

class Images(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='images')
    image = models.ImageField(upload_to='product-images/',null=True)
    def __str__(self):
        return self.product.title


class Stock(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE,related_name='stock')
    quantity = models.IntegerField(default=0)
    purchase_price = models.IntegerField(default=0)
    sale_price = models.IntegerField(default=0)
    discount = models.IntegerField(default=0)
    enabled = models.BooleanField(default=False)
    def __str__(self):
        return self.product.title +" ("+ str(self.product.category) +")"
    

class Processors(models.Model):
    name = models.CharField(max_length=244,null=True)
    model = models.CharField(max_length=244,null=True)
    price = models.CharField(max_length=244,null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='processor-images/',null=True)

    def __str__(self):
        return self.name
class Ram(models.Model):
    name = models.CharField(max_length=244,null=True)
    model = models.CharField(max_length=244,null=True)
    price = models.CharField(max_length=244,null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='ram-images/',null=True)

    def __str__(self):
        return self.name
class PowerSupply(models.Model):
    name = models.CharField(max_length=244,null=True)
    model = models.CharField(max_length=244,null=True)
    price = models.CharField(max_length=244,null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='powersupply-images/',null=True)

    def __str__(self):
        return self.name
class GraphicsCard(models.Model):
    name = models.CharField(max_length=244,null=True)
    model = models.CharField(max_length=244,null=True)
    price = models.CharField(max_length=244,null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='casing-images/',null=True)

    def __str__(self):
        return self.name
class StorageDrive(models.Model):
    name = models.CharField(max_length=244,null=True)
    model = models.CharField(max_length=244,null=True)
    price = models.CharField(max_length=244,null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='storage-images/',null=True)

    def __str__(self):
        return self.name
    
class Casing(models.Model):
    name = models.CharField(max_length=244,null=True)
    model = models.CharField(max_length=244,null=True)
    price = models.CharField(max_length=244,null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='casing-images/',null=True)

    def __str__(self):
        return self.name
class Cooler(models.Model):
    name = models.CharField(max_length=244,null=True)
    model = models.CharField(max_length=244,null=True)
    price = models.CharField(max_length=244,null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='casing-images/',null=True)

    def __str__(self):
        return self.name
    
class Motherboard(models.Model):
    name = models.CharField(max_length=244,null=True)
    model = models.CharField(max_length=244,null=True)
    price = models.CharField(max_length=244,null=True)
    processor_compatible = models.ManyToManyField(Processors,related_name='processor_compatible')
    ram_compatible = models.ManyToManyField(Ram,related_name='ram_compatible')
    powersupply_compatible = models.ManyToManyField(PowerSupply,related_name='powersupply_compatible')
    gpu_compatible = models.ManyToManyField(GraphicsCard,related_name='gpu_compatible')
    casing_comaptible = models.ManyToManyField(Casing,related_name='casing_comaptible')
    image = models.ImageField(upload_to='motherboard-images/',null=True)
    description = models.TextField(null=True)
    def __str__(self):
        return self.name

class CustomBuild(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    motherboard = models.ForeignKey(Motherboard,on_delete=models.CASCADE)
    processor = models.ForeignKey(Processors,on_delete=models.CASCADE)
    ram = models.ForeignKey(Ram,on_delete=models.CASCADE)
    graphics_card = models.ForeignKey(GraphicsCard,on_delete=models.CASCADE)
    power_Supply = models.ForeignKey(PowerSupply,on_delete=models.CASCADE)
    storage_drive = models.ForeignKey(StorageDrive,on_delete=models.CASCADE)
    casing = models.ForeignKey(Casing,on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user.username
    
class Games(models.Model):
    name = models.CharField(max_length=244,null=True)
    game_debate_name = models.CharField(max_length=244,null=True)
    image = models.ImageField(upload_to='games-images/',null=True) 

class CustomBuildStats(models.Model):
    customBuild = models.ForeignKey(CustomBuild,on_delete=models.CASCADE,related_name='stats')
    game = models.ForeignKey(Games,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='custombuilt-stats-images/',null=True)

class PreBuiltPerformanceStats(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='stats')
    game = models.ForeignKey(Games,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='prebuilt-stats-images/',null=True)

class Cart(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True)

class ProductCartItem(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)

class CustomBuildCartItem(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    customBuild = models.ForeignKey(CustomBuild,on_delete=models.CASCADE)

class CreateOrder(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    price = models.IntegerField(default=0)
    payment_type = models.CharField(max_length=244,null=True)
    status = models.CharField(max_length=244,default='pending')
    isCompleted = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)

class ProductOrderItem(models.Model):
    order = models.ForeignKey(CreateOrder,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)

class CustomBuildOrderItem(models.Model):
    order = models.ForeignKey(CreateOrder,on_delete=models.CASCADE)
    customBuild = models.ForeignKey(CustomBuild,on_delete=models.CASCADE)

class CasingImages(models.Model):
    casing = models.ForeignKey(Casing,on_delete=models.CASCADE,related_name='images')
    image = models.ImageField(upload_to='casing-images/',null=True)
    def __str__(self):
        return self.casing.name


class PerformanceScrape(models.Model):
    game = models.CharField(max_length=244,null=True)
    cpu = models.CharField(max_length=244,null=True)
    gpu = models.CharField(max_length=244,null=True)
    ram = models.CharField(max_length=244,null=True)
    output = models.CharField(max_length=244,null=True)
    