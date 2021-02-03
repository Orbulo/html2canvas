import {ElementContainer} from '../element-container';
import {CacheStorage} from '../../core/cache-storage';

export class SVGElementContainer extends ElementContainer {
    svg: string;
    intrinsicWidth: number;
    intrinsicHeight: number;

    constructor(img: SVGSVGElement) {
        super(img);

        // Removing elements with tag "data-serialize-ignore"
        const filteredSvg = img.cloneNode(true) as SVGSVGElement;
        filteredSvg.querySelectorAll('[data-serialize-ignore]').forEach(el => {
            el.remove();
        });

        const s = new XMLSerializer();
        this.svg = `data:image/svg+xml,${encodeURIComponent(s.serializeToString(filteredSvg))}`;
        this.intrinsicWidth = filteredSvg.width.baseVal.value;
        this.intrinsicHeight = filteredSvg.height.baseVal.value;

        CacheStorage.getInstance().addImage(this.svg);
    }
}
