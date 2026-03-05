import asyncio
from playwright.async_api import async_playwright

async def validate():
    errors = []
    resources_checked = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        async def handle_response(response):
            url = response.url
            status = response.status
            if any(ext in url for ext in ['.mp4', '.jpg', '.png', '.webp', '.svg']):
                resources_checked.append((url, status))
                if status >= 400:
                    errors.append(f"404 Error: {url}")
        
        page.on("response", handle_response)
        
        def handle_console(msg):
            if msg.type == "error":
                errors.append(f"Console Error: {msg.text}")
        
        page.on("console", handle_console)
        
        try:
            await page.goto("file:///workspace/workvisas-landing/index.html", wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(3000)
            await page.screenshot(path="/workspace/workvisas-landing/validation_final.png", full_page=False)
            
            print("=== Resources Checked ===")
            for url, status in resources_checked:
                status_icon = "OK" if status < 400 else "FAIL"
                print(f"[{status_icon}] {status}: {url.split('/')[-1]}")
            
            print("\n=== Validation Result ===")
            if errors:
                print("ERRORS FOUND:")
                for e in errors:
                    print(f"  - {e}")
            else:
                print("SUCCESS: No errors found!")
                
        except Exception as e:
            print(f"Validation error: {e}")
        finally:
            await browser.close()

asyncio.run(validate())
