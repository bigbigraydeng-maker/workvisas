import asyncio
from playwright.async_api import async_playwright
import os

async def validate_page():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        errors = []
        console_errors = []
        failed_resources = []

        # Listen for console errors
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        # Listen for failed requests
        page.on("requestfailed", lambda request: failed_resources.append({
            "url": request.url,
            "failure": request.failure
        }))

        # Listen for responses to check for 404s
        async def check_response(response):
            if response.status >= 400:
                failed_resources.append({
                    "url": response.url,
                    "status": response.status
                })

        page.on("response", check_response)

        # Navigate to the page
        file_path = "file:///workspace/workvisas-landing/index.html"
        await page.goto(file_path, wait_until="networkidle")

        # Wait for animations and content
        await page.wait_for_timeout(2000)

        # Check if key elements exist
        hero = await page.query_selector('.hero')
        video = await page.query_selector('.hero-video')
        industries = await page.query_selector('.industries-section')

        print("=== Validation Results ===")
        print(f"Hero section found: {hero is not None}")
        print(f"Video element found: {video is not None}")
        print(f"Industries section found: {industries is not None}")

        # Check for images
        images = await page.query_selector_all('img')
        print(f"Total images found: {len(images)}")

        if failed_resources:
            print("\n=== Failed Resources ===")
            for resource in failed_resources:
                print(f"  - {resource}")
        else:
            print("\n=== All resources loaded successfully ===")

        if console_errors:
            print("\n=== Console Errors ===")
            for error in console_errors:
                print(f"  - {error}")
        else:
            print("\n=== No console errors ===")

        # Take a screenshot
        await page.screenshot(path="/workspace/workvisas-landing/validation_screenshot.png", full_page=True)
        print("\nScreenshot saved to validation_screenshot.png")

        await browser.close()

        return len(failed_resources) == 0 and len(console_errors) == 0

if __name__ == "__main__":
    result = asyncio.run(validate_page())
    print(f"\n=== Validation {'PASSED' if result else 'FAILED'} ===")
