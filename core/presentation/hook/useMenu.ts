import { useState, useCallback } from 'react';
import type { ApiResponse } from '@hnndes-ou/forms-easy-sdk';
import { createModelClient } from '../../../core/infrastructure/reopsitory/modelRepository';
import { Menu } from '@/core/domain/entity/menu';

export interface MenuListResponse {
  items: Menu[];
  meta?: {
    totalItems?: number;
    page?: number;
    totalPages?: number;
    itemsPerPage?: number;
  };
}

export interface GetAllParams {
  page?: number;
  limit?: number;
  search?: string;
  filter?: Record<string, any>;
  sort?: { field: string; direction: 'asc' | 'desc' };
}

export const createManageMenusUsecase = (apiKey: string) => {
  const client = createModelClient(apiKey, 'Menu');

  const getAll = async (params?: GetAllParams): Promise<ApiResponse<MenuListResponse>> => {
    if (!client) throw new Error('API key is missing');
    let q = client.query();
    if (params?.limit) q = q.limit(params.limit);
    if (params?.page) q = q.page(params.page);
    if (params?.search) q = q.where('title', { $regex: params.search, $options: 'i' });
    if (params?.filter?.category) q = q.where('category', params.filter.category);
    if (params?.sort?.field) q = q.sortBy(params.sort.field, params.sort.direction);
    const res: any = await q.get();
    return res;
  };

  const getById = async (id: string): Promise<ApiResponse<Menu>> => {
    if (!client) throw new Error('API key is missing');
    const res: any = await client.getById(id);
    return res;
  };

  return { getAll, getById };
};

export type ManageMenusUsecase = ReturnType<typeof createManageMenusUsecase>;

export const useMenu = (apiKey: string) => {
  const [data, setData] = useState<MenuListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async (params?: GetAllParams) => {
    setLoading(true);
    setError(null);
    try {
      const usecase = createManageMenusUsecase(apiKey);
      const res: ApiResponse<MenuListResponse> = await usecase.getAll(params);
      setData(res.data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  return { data, loading, error, fetchItems };
};
