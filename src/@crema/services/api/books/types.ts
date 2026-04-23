import { BookType } from './bookType';

/**
 * Tương ứng với BookDto.cs trong BE (kế thừa AuditedEntityDto<Guid>)
 */
export interface BookDto {
  id: string;
  name: string;
  type: BookType;
  publishDate: string; // ISO 8601 date string
  price: number;
  // AuditedEntityDto fields
  creationTime: string;
  creatorId?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
}

/**
 * Tương ứng với CreateUpdateBookDto.cs trong BE
 */
export interface CreateUpdateBookDto {
  name: string;
  type: BookType;
  publishDate: string; // ISO 8601 date string
  price: number;
}

/**
 * Generic paged result — khớp với ABP PagedResultDto<T>
 */
export interface PagedResultDto<T> {
  totalCount: number;
  items: T[];
}

/**
 * Query params cho GetList — khớp với ABP PagedAndSortedResultRequestDto
 */
export interface PagedAndSortedRequestDto {
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
}
