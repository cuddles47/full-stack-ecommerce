export interface IBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imagePath: string;
  bgColor: string;
  active: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export type BannerResponse = {
  success: boolean;
  data: IBanner[];
};

export type TResponse<T> = {
  data?: T;
  error?: string;
};