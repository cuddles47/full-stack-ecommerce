import { TTrafficListItem } from "@/shared/types/trafficView";
import { TRAFFIC_LIST_PAGE_SIZE } from "@/shared/constants/admin/trafficView";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getTrafficReport = async (
  offset: number
): Promise<{ res?: { list: TTrafficListItem[]; totalCount: number }; error?: string }> => {
  try {
    const page = offset / TRAFFIC_LIST_PAGE_SIZE + 1;
    const response = await fetch(
      `${baseUrl}/access-history?page=${page}&limit=${TRAFFIC_LIST_PAGE_SIZE}`,
      { cache: 'no-store' }
    );
    if (!response.ok) throw new Error('Failed fetching traffic report');
    const data = await response.json();
    const list: TTrafficListItem[] = data.data;
    const totalCount: number = data.total;
    return { res: { list, totalCount } };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const deleteTraffic = async (
  id: string
): Promise<{ res?: boolean; error?: string }> => {
  try {
    const response = await fetch(`${baseUrl}/access-history/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed deleting traffic record');
    return { res: true };
  } catch (error) {
    return { error: (error as Error).message };
  }
};