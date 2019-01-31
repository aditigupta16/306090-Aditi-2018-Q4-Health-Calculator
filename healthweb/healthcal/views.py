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

class MealsAPI(APIView):

	def get(self, request, *args, **kwargs):
		meals =[
		{'name': 'Oats Idli',
		 'description': 'Experience the goodness of feather-light idlis made of oats.'
		                 'Idli is a popular South Indian treat that you can relish in '
		                 'any course of your meal',
		 'calories': '30 Calories/idli'},
		{'name': 'Moong Dal Cheela',
		 'description': 'nutrition packed Indian pancakes. '
		                 'Whip up a batter made of stocked with moong dal, paneer and veggies inside.',
		 'calories': '36 Calories/cheela'},
		{'name': 'Poha',
		 'description': 'An easy to make dose of your much needed morning nutrition, heaped with subtle ' 
		                 'flavours. Pressed rice is cooked with some of your favourite veggies, spiced up '
		                 'and seasoned to perfection.',
		  'calories': '206/serving'},
		{'name': 'Moong Daal Khichdi',
		 'description': 'Healthy combination of green moong dal and rice. This is one of the most nutritious rice recipes, '
		 				'which is easy in preparation and tastes great.',
		 'calories': '176 Calories/serving'
		},
		{'name': 'Ragi Dosa',
		 'description': 'Ragi is beneficial for weight watchers. It is high in fiber and has'
		 			    'mono saturated fat',
		 'calories': '85 Calories/dosa'
		},
		{'name': 'Buttermilk',
		 'description': 'low in fat and helps in digestion. It is rich in potassium, calcium,'
		                'phosphorus and Vitamin B12.',
		 'calories': '32 Calories/glass'
		},
		{'name': 'Sprouts Salad',
		 'description': 'high in fibre and make a healthy snack for weight watchers. Just adding'
		 			    ' a few drops of lime and salt makes it tasty along with healthy.',
		 'calories': '95 Calories/100 grams'
		},
		{'name': 'Dhokla',
		 'description': 'Prepared from fermented ground flour dhokla is a top favourite'
		 			    'Gujarati dish. The fermented ground flour is steamed to prepare dhokla.',
		 'calories': '25 Calories/piece'
		},
		{'name': 'Dalia',
		 'description': 'very light and healthy option for breakfast. It is an excellent '
		 				'source of fiber that helps to maintain healthy digestive system.',
		 'calories': '300 Calories/serving'
		},
		]

		return Response(data=meals, status=status.HTTP_200_OK)



