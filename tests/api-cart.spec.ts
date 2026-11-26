import { test, expect } from '@playwright/test';

const API = 'https://api.practicesoftwaretesting.com';

// Ask for JSON so validation errors come back as JSON (the Accept header from Monday)
test.use({ extraHTTPHeaders: { Accept: 'application/json' } });

let cartId: string | undefined;

// Cleanup: runs after every test, even if a check failed
test.afterEach(async ({ request }) => {
  if (cartId) {
    const response = await request.delete(`${API}/carts/${cartId}`);
    expect(response.status()).toBe(204);
    cartId = undefined;
  }
});

test('create a cart, add a product, and check the cart contents', async ({ request }) => {
  // Get a real product id first, so the test never relies on a stale id
  const products = await request.get(`${API}/products`);
  expect(products.status()).toBe(200);
  const productId = (await products.json()).data[0].id;

  // Create a cart
  const createCart = await request.post(`${API}/carts`);
  expect(createCart.status()).toBe(201);
  cartId = (await createCart.json()).id;

  // Add the product
  const addItem = await request.post(`${API}/carts/${cartId}`, {
    data: { product_id: productId, quantity: 1 },
  });
  expect(addItem.status()).toBe(200);

  // Check the cart contains it
  const getCart = await request.get(`${API}/carts/${cartId}`);
  expect(getCart.status()).toBe(200);
  const cart = await getCart.json();
  expect(cart.id).toBe(cartId);
  expect(cart.cart_items[0].product_id).toBe(productId);
  expect(cart.cart_items[0].quantity).toBe(1);
});

test('requesting a cart that does not exist returns 404', async ({ request }) => {
  const response = await request.get(`${API}/carts/this-cart-does-not-exist`);
  expect(response.status()).toBe(404);
});