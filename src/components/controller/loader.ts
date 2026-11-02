import {
    ApiResponse,
    Endpoint,
    HttpMethod,
    HttpStatus,
    RequestConfig,
    RequestOptions,
    ResponseCallback,
} from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<RequestOptions>;

    public constructor(baseLink: string, options: Readonly<RequestOptions>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T extends ApiResponse>(
        { endpoint, options = {} }: RequestConfig,
        callback: ResponseCallback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: Endpoint): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        const query: URLSearchParams = new URLSearchParams();

        Object.entries(urlOptions).forEach(([key, value]: [string, string | undefined]): void => {
            if (value !== undefined) {
                query.append(key, value);
            }
        });

        return `${this.baseLink}${endpoint}?${query.toString()}`;
    }

    private load<T extends ApiResponse>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: ResponseCallback<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response): Response => this.errorHandler(res))
            .then((res: Response): Promise<T> => res.json() as Promise<T>)
            .then((data: T): void => callback(data))
            .catch((err: unknown): void => {
                console.error(err);
            });
    }
}

export default Loader;
