import { TBrand } from "@/shared/types/brands";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllBrands = async (): Promise<{ res?: TBrand[]; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/brands`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed fetching brands');
    const data: TBrand[] = await response.json();
    return { res: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const addBrand = async (name: string): Promise<{ res?: TBrand; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/brands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed adding brand');
    const data: TBrand = await response.json();
    return { res: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const updateBrand = async (brand: TBrand): Promise<{ res?: TBrand; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/brands/${brand.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(brand),
    });
    if (!response.ok) throw new Error('Failed updating brand');
    const data: TBrand = await response.json();
    return { res: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const deleteBrand = async (id: string): Promise<{ res?: any; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/brands/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed deleting brand');
    return { res: true };
  } catch (error) {
    return { error: (error as Error).message };
  }
};