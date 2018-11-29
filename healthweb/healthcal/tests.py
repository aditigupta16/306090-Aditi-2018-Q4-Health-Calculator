# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status



class TestBMIAPI(APITestCase):


	def test_bmi_calculation(self):
		data = {}
		data['height'] = '165'
		data['weight'] = '140'
		data['gender'] = 'F'

		response = self.client.post('/api/bmi-calculator/', data=data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestBMRAPI(APITestCase):


	def test_bmr_calculation(self):
		data = {}
		data['height'] = '165'
		data['weight'] = '140'
		data['gender'] = 'F'
		data['activity'] = 'sedentary'
		data['age'] = 22
		response = self.client.post('/api/bmr-calculator/', data=data)
		import ipdb;ipdb.set_trace()
		self.assertEqual(response.status_code, status.HTTP_200_OK)
