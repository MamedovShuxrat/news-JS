import AppLoader from './appLoader';
import { ArticlesResponse, Endpoint, ResponseCallback, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>): void {
        this.getResp<SourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: ResponseCallback<ArticlesResponse>): void {
        const newsContainer: EventTarget | null = e.currentTarget;
        let target: EventTarget | null = e.target;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        while (target instanceof HTMLElement && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');

                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    this.getResp<ArticlesResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
