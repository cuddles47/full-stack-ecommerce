import { TCategory } from "@/shared/types/categories";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllCategories = async (): Promise<{ res?: TCategory[]; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/categories`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed fetching categories');
    const data: TCategory[] = await response.json();
    return { res: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const addCategory = async (
  category: Omit<TCategory, 'id'>
): Promise<{ res?: TCategory; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed adding category');
    const data: TCategory = await response.json();
    return { res: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const updateCategory = async (
  category: TCategory
): Promise<{ res?: TCategory; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/categories/${category.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed updating category');
    const data: TCategory = await response.json();
    return { res: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const deleteCategory = async (
  id: string
): Promise<{ res?: any; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed deleting category');
    return { res: true };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export type TGetAllCategories = TCategory;