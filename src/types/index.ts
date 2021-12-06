export type RequestData<T> = T | null;

export interface ResponseData<T> {
  code: number;
  message: string;
  success: boolean;
  data: T | null;
}
