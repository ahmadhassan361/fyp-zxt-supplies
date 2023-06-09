import base64
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.common.keys import Keys
import os
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
def scrape(game,processor,gpu,ram,dist):
    chrome_options = Options()
    # chrome_options.add_argument('--headless')

    # Set up Selenium webdriver
    driver = webdriver.Chrome(options=chrome_options)

    # Navigate to the website
    driver.get("https://www.game-debate.com/can-I-run?EA")

    # Fill up the form
    game_input = driver.find_element(By.XPATH, '//input[@id="allGamesSelect-tomselected"]')
    game_input.clear()
    game_input.send_keys(game)
    game_input.send_keys(Keys.ARROW_DOWN)
    time.sleep(5)
    game_input.send_keys(Keys.ENTER)
    time.sleep(3)

    processor_input = driver.find_element(By.XPATH, '//input[@id="hsa-cpu-tomselected"]')
    processor_input.clear()
    processor_input.send_keys(processor)
    processor_input.send_keys(Keys.ARROW_DOWN)
    time.sleep(5)
    processor_input.send_keys(Keys.ENTER)
    time.sleep(2)

    gpu_input = driver.find_element(By.XPATH, '//input[@id="hsa-gpu-tomselected"]')
    gpu_input.clear()
    gpu_input.send_keys(gpu)
    gpu_input.send_keys(Keys.ARROW_DOWN)
    time.sleep(5)
    gpu_input.send_keys(Keys.ENTER)
    time.sleep(2)

    gpu_input = driver.find_element(By.XPATH, '//input[@id="hsa-ram-tomselected"]')
    gpu_input.clear()
    gpu_input.send_keys(ram)
    gpu_input.send_keys(Keys.ARROW_DOWN)
    time.sleep(5)
    gpu_input.send_keys(Keys.ENTER)
    time.sleep(2)





    # Click on "Can I Run It"
    submit_button = driver.find_element(By.XPATH, '//button[@id="canIRunItBtn"]')
    driver.execute_script("arguments[0].scrollIntoView();", submit_button)
    time.sleep(2)
    submit_button.click()
    time.sleep(1)
    # Wait for the graph to be visible
    driver.switch_to.window(driver.window_handles[-1])
    # time.sleep(10)
    
    WebDriverWait(driver, 20).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.chartjs-render-monitor')))

    graph = driver.find_element(By.XPATH, '//canvas[@id="systemRequirementsPerformance"]')
    # graph = driver.find_element(By.ID, '[id="systemRequirementsPerformance"]')

    # graph = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, '//canvas[@id="systemRequirementsPerformance"]')))

    # Scroll to the graph
    driver.execute_script("arguments[0].scrollIntoView();", graph)
    time.sleep(2)



    canvas_elem = graph

    # Extract canvas element's contents
    js = "return arguments[0].toDataURL('image/png').substring(21);"
    canvas_base64 = driver.execute_script(js, canvas_elem)

    # Decode from the base64 format, get the image binary data
    canvas_png = base64.b64decode(canvas_base64)

    # Save the canvas image to a file
    # dest_file = os.path.join(os.path.dirname(__file__), 'saved_canvas2.png')
    dest_file = dist
    with open(dest_file, 'wb') as fio:
        fio.write(canvas_png)


    driver.close()
    return True