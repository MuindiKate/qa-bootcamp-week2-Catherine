import { test, expect } from '@playwright/test';
import { API, getFirstProductId, createCart, addToCart, getCart, deleteCart } from '../helpers/cart-api';

test.use({ extraHTTPHeaders: { Accept: 'application/json' } });

let cartId: string | undefined;

// Cleanup runs even if a check fails, so no cart is left behind
test.afterEach(async ({ request }) => {
  if (cartId) {
    const response = await deleteCart(request, cartId);
    expect(response.status()).toBe(204);
    cartId = undefined;
  }
});

test('C4 Add to a cart', async ({ request }) => {
  const productId = await getFirstProductId(request);

  const created = await createCart(request);
  expect(created.status()).toBe(201);
  cartId = (await created.json()).id as string;

  const added = await addToCart(request, cartId, productId, 1);
  expect(added.status()).toBe(200);

  const cartResponse = await getCart(request, cartId);
  expect(cartResponse.status()).toBe(200);
  const cart = await cartResponse.json();
  expect(cart.cart_items).toHaveLength(1);
  expect(cart.cart_items[0].product_id).toBe(productId);
  expect(cart.cart_items[0].quantity).toBe(1);
});

test('C5 Unknown cart (extra check)', async ({ request }) => {
  const response = await request.get(`${API}/carts/this-cart-does-not-exist`);
  expect(response.status()).toBe(404);
});