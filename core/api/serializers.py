from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserDetailsSerializer(serializers.ModelSerializer):
    user = UserModelSerializer()
    class Meta:
        model = UserDetailsModel
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    sub_category = SubCategorySerializer(many=True,read_only=True)
    class Meta:
        model = Category
        fields = ('id','name','image','sub_category')


class ProductOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOption
        fields = '__all__'

class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class ProcessorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Processors
        fields = '__all__'

class RamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ram
        fields = '__all__'

class PowerSupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = PowerSupply
        fields = '__all__'

class GraphicsCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = GraphicsCard
        fields = '__all__'

class StorageDriveSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorageDrive
        fields = '__all__'

class MotherboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motherboard
        fields = '__all__'



class ProcessorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Processors
        fields = '__all__'

class CoolerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cooler
        fields = '__all__'

class RamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ram
        fields = '__all__'

class PowerSupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = PowerSupply
        fields = '__all__'

class GraphicsCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = GraphicsCard
        fields = '__all__'

class StorageDriveSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorageDrive
        fields = '__all__'

class CasingImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CasingImages
        fields = '__all__'

class CasingSerializer(serializers.ModelSerializer):
    images = CasingImagesSerializer(many=True)
    class Meta:
        model = Casing
        fields = ('id','name','model','price','description','image','images')

class MotherboardSerializer(serializers.ModelSerializer):
    processor_compatible = ProcessorsSerializer(many=True)
    ram_compatible = RamSerializer(many=True)
    powersupply_compatible = PowerSupplySerializer(many=True)
    gpu_compatible = GraphicsCardSerializer(many=True)
    casing_comaptible = CasingSerializer(many=True)
    class Meta:
        model = Motherboard
        fields = '__all__'

class CustomBuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomBuild
        fields = '__all__'

class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = '__all__'

class CustomBuildStatsSerializer(serializers.ModelSerializer):
    game = GamesSerializer()

    class Meta:
        model = CustomBuildStats
        fields = '__all__'

class PreBuiltPerformanceStatsSerializer(serializers.ModelSerializer):
    game = GamesSerializer()

    class Meta:
        model = PreBuiltPerformanceStats
        fields = '__all__'
        
class ProductSerializer(serializers.ModelSerializer):
    category = SubCategorySerializer(read_only=True)
    options = ProductOptionSerializer(many=True,read_only=True)
    images = ImagesSerializer(many=True,read_only=True)
    stock = StockSerializer(read_only=True)
    stats = PreBuiltPerformanceStatsSerializer(many=True,read_only=True)
    class Meta:
        model = Product
        fields = ('id','category','title','subtitle','description','processor','gpu','ram','model','brand','image','options','images','stock','stats')

