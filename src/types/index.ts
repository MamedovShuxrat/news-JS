export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    Get = 'GET',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: string;
    sources: NewsSource[];
}

export interface ArticlesResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export type ApiResponse = SourcesResponse | ArticlesResponse;

export type QueryParamName = 'apiKey' | 'sources';
export type QueryParams = Record<QueryParamName, string>;
export type RequestOptions = Partial<QueryParams>;

export type SourceSummary = Pick<NewsSource, 'id' | 'name'>;

export type ResponseCallback<T extends ApiResponse> = (data: T) => void;

export interface RequestConfig {
    endpoint: Endpoint;
    options?: RequestOptions;
}
