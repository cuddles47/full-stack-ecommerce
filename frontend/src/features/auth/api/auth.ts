import { ILoginRequest, ILoginResponse, IUser } from "../types";

type TResponse<T> = {
  data?: T;
  error?: string;
};

export const login = async (credentials: ILoginRequest): Promise<TResponse<ILoginResponse>> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Login failed' };
    }

    return { data };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
};

export const logout = async (): Promise<TResponse<void>> => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Logout failed' };
    }

    return { data: undefined };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
};

export const getMe = async (): Promise<TResponse<IUser>> => {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Failed to get user information' };
    }

    return { data };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<TResponse<void>> => {
  try {
    const response = await fetch('/api/auth/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Failed to change password' };
    }

    return { data: undefined };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
};

export const updateProfile = async (profileData: Partial<IUser>): Promise<TResponse<IUser>> => {
  try {
    const response = await fetch('/api/auth/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Failed to update profile' };
    }

    return { data };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
};

export const changeAvatar = async (avatarFile: File): Promise<TResponse<{ avatarUrl: string }>> => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const response = await fetch('/api/auth/change-avatar', {
      method: 'PUT',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Failed to change avatar' };
    }

    return { data };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
};