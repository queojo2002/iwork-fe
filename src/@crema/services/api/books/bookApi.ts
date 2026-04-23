import abpClient from '../abpClient';
import type {
  BookDto,
  CreateUpdateBookDto,
  PagedResultDto,
  PagedAndSortedRequestDto,
} from './types';

const BASE = '/api/app/book';

/**
 * ABP BookAppService API — ánh xạ tới auto-generated REST endpoints:
 *   GET    /api/app/book          ← GetListAsync
 *   GET    /api/app/book/{id}     ← GetAsync
 *   POST   /api/app/book          ← CreateAsync
 *   PUT    /api/app/book/{id}     ← UpdateAsync
 *   DELETE /api/app/book/{id}     ← DeleteAsync
 */
export const bookApi = {
  getList: (params?: PagedAndSortedRequestDto) =>
    abpClient
      .get<PagedResultDto<BookDto>>(BASE, { params })
      .then((res) => res.data),

  get: (id: string) =>
    abpClient.get<BookDto>(`${BASE}/${id}`).then((res) => res.data),

  create: (data: CreateUpdateBookDto) =>
    abpClient.post<BookDto>(BASE, data).then((res) => res.data),

  update: (id: string, data: CreateUpdateBookDto) =>
    abpClient.put<BookDto>(`${BASE}/${id}`, data).then((res) => res.data),

  delete: (id: string) =>
    abpClient.delete(`${BASE}/${id}`).then((res) => res.data),
};
