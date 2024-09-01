from rest_framework import serializers

class FraudDetectionSerializer(serializers.Serializer):
    features = serializers.ListField(child = serializers.FloatField())