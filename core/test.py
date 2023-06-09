import base64
from io import BytesIO
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
import time
from PIL import Image
# Set up the webdriver (Chrome in this example)
from selenium.webdriver.chrome.options import Options

def scrape():
    # Set up options for headless browsing
    chrome_options = Options()
    # chrome_options.add_argument('--headless')
    # chrome_options.add_argument('--no-sandbox')
    # chrome_options.add_argument('--disable-dev-shm-usage')

    # Set up the webdriver (Chrome in this example)
    driver = webdriver.Chrome(options=chrome_options)
    # Navigate to the Game Debate page for Call of Duty Warzone
    driver.get('https://www.game-debate.com/games/index.php?g_id=37021&game=Call+of+Duty+Warzone')

    # Fill out the first form with the processor and GPU
    processor_input = driver.find_element(by=By.XPATH,value='//input[@id="ciri--processor-tomselected"]')

    processor_input.send_keys('i7 6820hq')
    processor_input.send_keys(Keys.ARROW_DOWN)
    time.sleep(5)

    # Send the Enter key to select the first option in the dropdown
    processor_input.send_keys(Keys.ENTER)
    time.sleep(3)


    # Fill out the first form with the processor and GPU
    gpu_dropdown = driver.find_element(by=By.XPATH,value='//input[@id="ciri--graphics-card-tomselected"]')

    gpu_dropdown.send_keys('gtx 1060')

    gpu_dropdown.send_keys(Keys.ARROW_DOWN)
    time.sleep(3)

    # # Send the Enter key to select the first option in the dropdown
    gpu_dropdown.send_keys(Keys.ENTER)
    time.sleep(3)

    # Click the "Next" button to go to the second form
    check_submit_button = driver.find_element(By.XPATH, "//button[@name='checkSubmit']")
    check_submit_button.click()


    # # Wait for the second form to load and fill out the RAM
    wait = WebDriverWait(driver, 10)
    ram_dropdown = wait.until(EC.presence_of_element_located((By.NAME, 'ram')))
    # ram_dropdown = driver.find_element(By.XPATH, '//select[@name="requirements[ram][]"]')
    Select(ram_dropdown).select_by_visible_text('32 GB')
    time.sleep(1)
    check_submit_button = driver.find_element(By.XPATH, "//button[@name='checkSubmit']")
    check_submit_button.click()
    # Select(ram_dropdown).select_by_visible_text('16GB')
    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_element_located((By.ID, 'systemRequirementsPerformance')))

    # Find the canvas element and extract its data
    canvas = driver.find_element(By.ID, 'systemRequirementsPerformance')
    chart_data = canvas.get_attribute('data-chart-data')

    # Parse the chart data as JSON
    chart_json = json.loads(chart_data)
    print(chart_json)

    chart_width = canvas.size['width']
    chart_height = canvas.size['height']
    chart_screenshot = canvas.screenshot_as_png

    # Open the screenshot as an image with Pillow
    chart_image = Image.open(BytesIO(chart_screenshot))

    # Resize the image to desired dimensions
    # chart_image = chart_image.resize((chart_width, chart_height))

    # Save the image to a file
    chart_image.save('chart.png')
    driver.quit()

    # Do something with the graph_url (e.g. download the image, display it in a GUI, etc.)

scrape()
