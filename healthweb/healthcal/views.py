# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from utils import get_weight_in_pounds, get_height_in_inches



class BMICalculatorAPI(APIView):

	def post(self, request, *args, **kwargs):
		weight = float(request.data['weight'])
		height = float(request.data['height'])/100
		bmi = (weight/height)/height
		bmi = str(round(bmi, 1))
		return Response(data={'bmi':bmi}, status=status.HTTP_200_OK)


class BMRCalculatorAPI(APIView):
	# this is the formula for BMR. the units are converted accordingly after they are received from client
	# Women: BMR = 655 + ( 4.35 x weight in pounds ) + ( 4.7 x height in inches ) - ( 4.7 x age in years )
	# Men: BMR = 66 + ( 6.23 x weight in pounds ) + ( 12.7 x height in inches ) - ( 6.8 x age in years )

	activity_factor = {'sedentary': 1.2, 
					   'lightly active' : 1.375,
					   'moderately active': 1.55,
					   'very active': 1.725,
					   'extra active': 1.9
					  }

	def post(self, request, *args, **kwargs):
		print(request.data)
		weight = get_weight_in_pounds(request.data['height'])
		height = get_height_in_inches(request.data['weight'])
		age = float(request.data['age'])
		gender = request.data['gender']
		if gender == 'male':
			bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age)
		else:
			bmr = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age)
		total_calories_required = int(bmr * self.activity_factor[request.data['activity']])
		total_calories_required = str(round(total_calories_required, 1))
		return Response(data={'total_calories_required': total_calories_required}, status=status.HTTP_200_OK)