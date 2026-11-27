import { type APIRequestContext, expect } from '@playwright/test';

export const API = 'https://api.practicesoftwaretesting.com';

export async function getFirstProductId(request: APIRequestContext): Promise<string> {
  const response = await request.get(`${API}/products`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.length, 'The API returned no products to test with').toBeGreaterThan(0);
  return body.data[0].id;
}

export async function createCart(request: APIRequestContext) {
  return request.post(`${API}/carts`);
}

export async function addToCart(request: APIRequestContext, cartId: string, productId: string, quantity: number) {
  return request.post(`${API}/carts/${cartId}`, { data: { product_id: productId, quantity } });
}

export async function getCart(request: APIRequestContext, cartId: string) {
  return request.get(`${API}/carts/${cartId}`);
}

export async function deleteCart(request: APIRequestContext, cartId: string) {
  return request.delete(`${API}/carts/${cartId}`);
}