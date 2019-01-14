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
		weight = get_weight_in_pounds(request.data['weight'])
		height = get_height_in_inches(request.data['height'])
		age = float(request.data['age'])
		gender = request.data['gender']
		if gender == 'male':
			bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age)
		else:
			bmr = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age)
		total_calories_required = int(bmr * self.activity_factor[request.data['activity']])
		total_calories_required = str(round(total_calories_required, 1))
		return Response(data={'total_calories_required': total_calories_required}, status=status.HTTP_200_OK)


class WeightTargetAPI(APIView):
	#API that returns the calories user should consume in a day to achieve the desired weight loss

    activity_factor = {'sedentary': 1.2, 
                       'lightly active' : 1.375,
                       'moderately active': 1.55,
                       'very active': 1.725,
                       'extra active': 1.9
                      }	

    def post(self, request, *args, **kwargs):
    	import ipdb;ipdb.set_trace()
        weight = get_weight_in_pounds(request.data['weight'])
        target_weight = get_weight_in_pounds(request.data['target'])
        height = get_height_in_inches(request.data['height'])
        days = float(request.data['days'])
        age = float(request.data['age'])
        gender = request.data['gender']
        if gender == 'male':
            bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age)
        else:
            bmr = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age)
        total_calories_required = int(bmr * self.activity_factor[request.data['activity']])
        # total_calories_required = int(round(total_calories_required, 1))        
        calories_required_to_lose_per_day = (3500*2*(weight-target_weight))/days
        calories_required_to_consume = total_calories_required - calories_required_to_lose_per_day
        calories_required_to_consume = int(round(calories_required_to_consume, 1))
        return Response(data={'calories_required_to_consume: calories_required_to_consume'}, status=status.HTTP_200_OK)
