import unittest
import requests
from selenium import webdriver
import time


class BasicTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_server(self):
        driver = self.driver
        driver.get("http://localhost:8000")
        rec = requests.get("http://localhost:8000")
        self.assertAlmostEqual(200, rec.status_code)

    def tearDown(self):
        self.driver.close()


class UseTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_user(self):
        driver = self.driver
        driver.get("http://localhost:8000/users/login")
        driver.find_element_by_id("login").send_keys("test12@gmail.com")
        driver.find_element_by_id("pass").send_keys("12345")
        driver.find_element_by_id("sign_up_btn").click()
        curent_url = driver.current_url
        rec = requests.get("http://localhost:8000/users/me/")
        self.assertAlmostEqual(200, rec.status_code)
        self.assertEqual("http://localhost:8000/users/me/", curent_url)
        """"
        curent_url = driver.current_url
        self.assertEqual("http://localhost:8080/users/login/?next=%2Fusers%2Fme%2F", curent_url)
        """

    def tearDown(self):
        self.driver.close()


class PrefTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_user(self):
        driver = self.driver
        driver.get("http://localhost:8000/preference")
        self.assertEqual("http://localhost:8000/users/login", driver.current_url)
        driver.get("http://localhost:8000/users/login")
        driver.find_element_by_id("login").send_keys("test12@gmail.com")
        driver.find_element_by_id("pass").send_keys("12345")
        driver.find_element_by_id("sign_up_btn").click()
        driver.get("http://localhost:8000/preference")
        current_url = driver.current_url
        self.assertEqual("http://localhost:8000/preference/", current_url)

    def tearDown(self):
        self.driver.close()


class CooperativeTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_cooperative(self):
        driver = self.driver
        driver.get("http://localhost:8000/preference")
        self.assertEqual("http://localhost:8000/users/login", driver.current_url)
        driver.get("http://localhost:8000/users/login")
        driver.find_element_by_id("login").send_keys("test12@gmail.com")
        driver.find_element_by_id("pass").send_keys("12345")
        driver.get("http://localhost:8000/preference/")
        name = driver.find_element_by_class_name("text-center").text
        self.assertNotEqual("", name)
        driver.find_elements_by_class_name('btn-primary')[0].click()
        driver.get("http://localhost:8000/preference/free")
        name = driver.find_element_by_class_name("text-center").text
        self.assertNotEqual("", name)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()