from django.conf.urls import url, include
from healthweb.healthcal import views

urlpatterns = [
    url(r'^bmi-calculator/$', views.BMICalculatorAPI.as_view()),
    url(r'^bmr-calculator/$', views.BMRCalculatorAPI.as_view()),
    url(r'^weight-target-calculator/$', views.WeightTargetAPI.as_view()),
    url(r'meals/$', views.MealsAPI.as_view()),
    ]
