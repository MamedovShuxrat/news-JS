import './news.css';
import { Article } from '../../../types';
import { getElement } from '../../../utils/dom';

const MAX_NEWS_COUNT: number = 10;

class News {
    public draw(data: Readonly<Article[]>): void {
        const news: Article[] = data.slice(0, MAX_NEWS_COUNT);

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = getElement<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item: Article, idx: number): void => {
            const newsClone: DocumentFragment = document.importNode(newsItemTemp.content, true);

            if (idx % 2 !== 0) {
                getElement<HTMLElement>('.news__item', newsClone).classList.add('alt');
            }

            if (item.urlToImage) {
                getElement<HTMLElement>('.news__meta-photo', newsClone).style.backgroundImage =
                    `url("${item.urlToImage}")`;
            }
            getElement<HTMLElement>('.news__meta-author', newsClone).textContent = item.author || item.source.name;
            getElement<HTMLElement>('.news__meta-date', newsClone).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElement<HTMLElement>('.news__description-title', newsClone).textContent = item.title;
            getElement<HTMLElement>('.news__description-source', newsClone).textContent = item.source.name;
            getElement<HTMLElement>('.news__description-content', newsClone).textContent = item.description ?? '';
            getElement<HTMLAnchorElement>('.news__read-more a', newsClone).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        getElement<HTMLElement>('.news').replaceChildren(fragment);
    }
}

export default News;
