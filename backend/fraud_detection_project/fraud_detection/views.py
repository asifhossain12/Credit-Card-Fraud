from django.shortcuts import render

# Create your views here.
import joblib
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FraudDetectionSerializer

model = joblib.load('model/credit_card.joblib')

class PredictFraud(APIView):
    def post(self, request):
        serializer =FraudDetectionSerializer(data=request.data)
        if serializer.is_valid():
            features = serializer.validated_data['features']
            prediction = model.predict([features])

            if prediction[0] == 1:
                result = 'Fraud Transaction'
            else:
                result = 'Normal Transaction'            
            return Response({'prediction': result}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



