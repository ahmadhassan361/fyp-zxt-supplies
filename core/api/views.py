from django.shortcuts import render
from .scrape import scrape
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import *
from .models import *
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

@api_view(['POST'])
def scrapingPerformance(request):
    game = request.POST.get('game')
    processor = request.POST.get('cpu')
    gpu = request.POST.get('gpu')
    ram = request.POST.get('ram')
    print(game,processor,gpu,ram)
    check = PerformanceScrape.objects.filter(game=game,cpu=processor,gpu=gpu,ram=ram)
    list_obj = [x for x in check if x.output != None]
    print(check.values())
    if(len(list_obj) > 0):
        return Response({'status':True,'output':list_obj[0].output})
    obj = PerformanceScrape(game=game,cpu=processor,gpu=gpu,ram=ram)
    obj.save()
    dist = os.path.join(settings.BASE_DIR,'media','scrape-img', f'saved_image{obj.id}.png')
    print(dist)

    res = scrape(game,processor,gpu,ram,dist)
    print(res)
    if os.path.exists(dist):
        image = f'/media/scrape-img/saved_image{obj.id}.png'
        obj.output = image
        obj.save()
        return Response({'status':True,'output':image})
    return Response({'status':False})

class SignupAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        print(username,password,email)
        if username and password and email:
            try:
                user = User.objects.create_user(username=username, password=password, email=email)
                userDetail = UserDetailsModel.objects.create(user=user)
                serializedUser = UserDetailsSerializer(userDetail)
                token = Token.objects.create(user=user)
                return Response({'token': token.key,'user_details':serializedUser.data})
            except:
                return Response({'error': 'Failed to create user.'}, status=400)
        else:
            return Response({'error': 'Username, password, and email are required.'}, status=400)

class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username,password)

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                serializedUser = UserDetailsSerializer(UserDetailsModel.objects.get(user=user))
                return Response({'token': token.key,'user_details':serializedUser.data})
            else:
                return Response({'error': 'Invalid credentials.'}, status=400)
        else:
            return Response({'error': 'Username and password are required.'}, status=400)




class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(ListAPIView):
    queryset = Product.objects.select_related().all()
    serializer_class = ProductSerializer
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'subtitle']

@api_view(['GET'])
def getProduct(request):
    id = request.GET.get('id',None)
    if id is not None:
        pr = Product.objects.select_related().get(id=id)
        serialized_pr = ProductSerializer(pr,many=False)
        return Response(serialized_pr.data)

class ProcessorsListView(ListAPIView):
    queryset = Processors.objects.all()
    serializer_class = ProcessorsSerializer
class CoolingListView(ListAPIView):
    queryset = Cooler.objects.all()
    serializer_class = CoolerSerializer
class CasingsListView(ListAPIView):
    queryset = Casing.objects.all()
    serializer_class = CasingSerializer

class RamListView(ListAPIView):
    queryset = Ram.objects.all()
    serializer_class = RamSerializer

class PowerSupplyListView(ListAPIView):
    queryset = PowerSupply.objects.all()
    serializer_class = PowerSupplySerializer

class GraphicsCardListView(ListAPIView):
    queryset = GraphicsCard.objects.all()
    serializer_class = GraphicsCardSerializer

class StorageDriveListView(ListAPIView):
    queryset = StorageDrive.objects.all()
    serializer_class = StorageDriveSerializer

class MotherboardListView(ListAPIView):
    queryset = Motherboard.objects.select_related().all()
    serializer_class = MotherboardSerializer

class GamesListView(ListAPIView):
    queryset = Games.objects.all()
    serializer_class = GamesSerializer