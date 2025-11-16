const { test, expect } = require('@playwright/test');

test.describe('Sauce Demo - Login, Add to Cart, and Logout', () => {
  test('User logs in, adds product to cart, verifies product, and logs out', async ({ page }) => {
    
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);

    const username = 'standard_user';
    const password = 'secret_sauce';
    
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');

    const firstProductName = await page.locator('.inventory_item_name').first().textContent();
    console.log(`Adding product to cart: ${firstProductName}`);
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart.html/);

    const cartProductName = await page.locator('.inventory_item_name').textContent();
    console.log(`Product in cart: ${cartProductName}`);
    
    expect(cartProductName).toBe(firstProductName);
    await expect(page.locator('.inventory_item_name')).toHaveText(firstProductName);

    await expect(page.locator('.cart_quantity')).toHaveText('1');

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    console.log('Test completed successfully!');
  });
});