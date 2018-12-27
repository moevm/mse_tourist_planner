import unittest
from selenium import webdriver
import requests
from common import *
import time
import datetime


class Preferences(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get(USERS_LOGIN_URL)
        self.driver.find_element_by_id("login").send_keys(LOGIN)
        self.driver.find_element_by_id("pass").send_keys(PASSWORD)
        self.driver.find_element_by_css_selector("input[type='submit']").click()

    # Проверка, что предложения по отелям подгружаются
    def test_offers(self):
        driver = self.driver
        driver.get(USERS_PREFERENCE + '/add')
        today = datetime.datetime.today() + datetime.timedelta(days=1)
        print(today.strftime('%m/%d/%Y'))
        tomorrow = today + datetime.timedelta(days=1)
        self.driver.find_element_by_id("start_date").send_keys(today.strftime('%m/%d/%Y'))
        self.driver.find_element_by_id("end_date").send_keys(tomorrow.strftime('%m/%d/%Y'))
        self.driver.find_element_by_id("min_price").send_keys("1000")
        self.driver.find_element_by_id("max_price").send_keys("10000")
        self.driver.find_element_by_id("city").send_keys("Москва")
        self.driver.find_element_by_id("getreq").click()
        time.sleep(2)
        rows = self.driver.find_elements_by_class_name('row')
        self.assertNotEqual(0, len(rows))

    def test_add_preference(self):
        driver = self.driver
        driver.get(USERS_PREFERENCE + '/add')
        today = datetime.datetime.today() + datetime.timedelta(days=1)
        print(today.strftime('%m/%d/%Y'))
        tomorrow = today + datetime.timedelta(days=1)
        self.driver.find_element_by_id("start_date").send_keys(today.strftime('%m/%d/%Y'))
        self.driver.find_element_by_id("end_date").send_keys(tomorrow.strftime('%m/%d/%Y'))
        self.driver.find_element_by_id("min_price").send_keys("1000")
        self.driver.find_element_by_id("max_price").send_keys("10000")
        self.driver.find_element_by_id("city").send_keys("Москва")
        self.driver.find_element_by_id("getreq").click()
        time.sleep(2)
        self.driver.find_elements_by_class_name('btn-primary')[0].click()
        driver.get(USERS_PREFERENCE)
        rows = self.driver.find_elements_by_class_name('row')
        self.assertNotEqual(0, len(rows))

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
