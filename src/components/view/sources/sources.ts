import './sources.css';
import { SourceSummary } from '../../../types';
import { getElement } from '../../../utils/dom';

class Sources {
    public draw(data: Readonly<SourceSummary[]>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getElement<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item: SourceSummary): void => {
            const sourceClone: DocumentFragment = document.importNode(sourceItemTemp.content, true);

            getElement<HTMLElement>('.source__item-name', sourceClone).textContent = item.name;
            getElement<HTMLElement>('.source__item', sourceClone).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement<HTMLElement>('.sources').append(fragment);
    }
}

export default Sources;
