import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "./axios";

interface PostVariables<TQueryInputBody, TQueryInputParam> {
  body?: TQueryInputBody;
  params?: TQueryInputParam;
}

interface Props<TQueryOutput, TQueryInputBody, TQueryInputParam> {
  url: string;

  options?: Omit<
    UseMutationOptions<
      TQueryOutput,
      AxiosError,
      PostVariables<TQueryInputBody, TQueryInputParam>
    >,
    "mutationFn"
  >;
}

/**
 * Custom hook to perform GET requests using Axios and React Query.
 * @param queryKey - The unique key for the query, used for caching and refetching.
 * @param url - The endpoint URL for the GET request.
 * @param params - Optional parameters to be sent with the request.
 * @param options - Optional configuration for the query, such as onSuccess, onError, etc.
 * @returns A query object that contains the data, error, and status of the request.
 * @template TQueryOutput - The expected data type of the response.
 * @template TQueryInput - The data type of the input parameters for the request.
 */
const usePost = <
  TQueryOutput = unknown,
  TQueryInputBody = object,
  TQueryInputParam = object,
>({
  url,
  options,
}: Props<TQueryOutput, TQueryInputBody, TQueryInputParam>) => {
  const query = useMutation<
    TQueryOutput,
    AxiosError,
    PostVariables<TQueryInputBody, TQueryInputParam>
  >({
    mutationFn: async ({ body, params }) => {
      const response = await api.post(`${url}`, body, {
        params,
      });
      return response.data;
    },
    ...options,
  });

  return query;
};

export { usePost };
