import News from './news/news';
import Sources from './sources/sources';
import { Article, ArticlesResponse, NewsSource, SourcesResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Partial<ArticlesResponse>): void {
        const values: Article[] = data.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<SourcesResponse>): void {
        const values: NewsSource[] = data.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
