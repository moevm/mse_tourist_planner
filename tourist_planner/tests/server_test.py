import unittest
import requests
from selenium import webdriver


class BasicTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_server(self):
        driver = self.driver
        driver.get("http://localhost:8080")
        rec = requests.get("http://localhost:8080")
        self.assertAlmostEqual(200, rec.status_code)

    def tearDown(self):
        self.driver.close()


class UseTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_user(self):
        driver = self.driver
        driver.get("http://localhost:8080/users/register/")
        driver.find_element_by_id("nickname").send_keys("test")
        driver.find_element_by_id("login").send_keys("test@gmail.com")
        driver.find_element_by_id("pass").send_keys("12345")
        driver.find_element_by_id("passc").send_keys("12345")
        driver.find_element_by_id("regbtn").click()
        curent_url = driver.current_url
        rec = requests.get(curent_url)
        if curent_url == "http://localhost:8080/users/register/":
            driver.get("http://localhost:8080/users/login/")
            driver.find_element_by_id("login").send_keys("test@gmail.com")
            driver.find_element_by_id("pass").send_keys("12345")
            driver.find_element_by_id("sign_up_btn").click()
            curent_url = driver.current_url
        self.assertAlmostEqual(200, rec.status_code)
        self.assertEqual("http://localhost:8080/users/me/", curent_url)
        driver.find_element_by_id("logoutbtn").click()
        driver.find_element_by_id("profilebtn").click()
        curent_url = driver.current_url
        self.assertEqual("http://localhost:8080/users/login/?next=%2Fusers%2Fme%2F", curent_url)

    def tearDown(self):
        self.driver.close()


class PrefTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_user(self):
        driver = self.driver
        driver.get("http://localhost:8080/preference/")
        self.assertEqual("http://localhost:8080/users/login/?next=%2Fpreference%2F", driver.current_url)
        driver.get("http://localhost:8080/users/login/")
        driver.find_element_by_id("login").send_keys("test1@gmail.com")
        driver.find_element_by_id("pass").send_keys("12345")
        driver.find_element_by_id("sign_up_btn").click()
        driver.get("http://localhost:8080/preference/")
        current_url = driver.current_url
        self.assertEqual("http://localhost:8080/preference/", current_url)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()