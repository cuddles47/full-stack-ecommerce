import { TAddProductFormValues, TProductListItem } from "@/shared/types/product";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllProducts = async (): Promise<{ res?: TProductListItem[]; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/products`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed fetching products');
    const data: TProductListItem[] = await response.json();
    return { res: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const addProduct = async (
  formValues: TAddProductFormValues
): Promise<{ res?: any; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    });
    if (!response.ok) throw new Error('Failed adding product');
    const data = await response.json();
    return { res: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};