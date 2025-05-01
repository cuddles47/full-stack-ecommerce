import { IBanner, TResponse } from '../types';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Lấy danh sách banner đang active từ API
 */
export const getActiveBanners = async (): Promise<TResponse<IBanner[]>> => {
  try {
    const response = await fetch(`${baseUrl}/api/banners/active`);

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch banners' };
    }

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    return { error: (error as Error).message || 'An unexpected error occurred' };
  }
};

/**
 * Lấy thông tin chi tiết của một banner theo ID
 */
export const getBannerById = async (id: string): Promise<TResponse<IBanner>> => {
  try {
    const response = await fetch(`${baseUrl}/api/banners/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch banner' };
    }

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    return { error: (error as Error).message || 'An unexpected error occurred' };
  }
};

// Admin API services (protected routes)
export const getAllBanners = async (): Promise<TResponse<IBanner[]>> => {
  try {
    const response = await fetch(`${baseUrl}/api/banners`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch banners' };
    }

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    return { error: (error as Error).message || 'An unexpected error occurred' };
  }
};

export const createBanner = async (bannerData: Partial<IBanner>): Promise<TResponse<IBanner>> => {
  try {
    const response = await fetch(`${baseUrl}/api/banners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(bannerData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to create banner' };
    }

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    return { error: (error as Error).message || 'An unexpected error occurred' };
  }
};

export const updateBanner = async (id: string, bannerData: Partial<IBanner>): Promise<TResponse<IBanner>> => {
  try {
    const response = await fetch(`${baseUrl}/api/banners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(bannerData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to update banner' };
    }

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    return { error: (error as Error).message || 'An unexpected error occurred' };
  }
};

export const deleteBanner = async (id: string): Promise<TResponse<IBanner>> => {
  try {
    const response = await fetch(`${baseUrl}/api/banners/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to delete banner' };
    }

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    return { error: (error as Error).message || 'An unexpected error occurred' };
  }
};

export const changeBannerStatus = async (id: string, active: boolean): Promise<TResponse<IBanner>> => {
  try {
    const response = await fetch(`${baseUrl}/api/banners/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ active })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to change banner status' };
    }

    const data = await response.json();
    return { data: data.data };
  } catch (error) {
    return { error: (error as Error).message || 'An unexpected error occurred' };
  }
};