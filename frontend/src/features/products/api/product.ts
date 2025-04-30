import { TAddProductFormValues, TProductListItem, TProductPageInfo } from "../types";

type TResponse<T> = {
  res?: T;
  error?: string;
};

export const getAllProducts = async (): Promise<TResponse<TProductListItem[]>> => {
  try {
    const response = await fetch(`/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok) return { error: result.message };
    return { res: result };
  } catch (error) {
    return { error: "Failed to fetch products" };
  }
};

export const getOneProduct = async (productId: string): Promise<TResponse<TProductPageInfo>> => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok) return { error: result.message };
    return { res: result };
  } catch (error) {
    return { error: "Failed to fetch product" };
  }
};

export const addProduct = async (product: TAddProductFormValues): Promise<TResponse<{ id: string }>> => {
  try {
    const response = await fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const result = await response.json();
    if (!response.ok) return { error: result.message };
    return { res: result };
  } catch (error) {
    return { error: "Failed to add product" };
  }
};

export const updateProduct = async (
  productId: string,
  product: Partial<TAddProductFormValues>
): Promise<TResponse<{ id: string }>> => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const result = await response.json();
    if (!response.ok) return { error: result.message };
    return { res: result };
  } catch (error) {
    return { error: "Failed to update product" };
  }
};

export const deleteProduct = async (productId: string): Promise<TResponse<{ id: string }>> => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok) return { error: result.message };
    return { res: result };
  } catch (error) {
    return { error: "Failed to delete product" };
  }
};