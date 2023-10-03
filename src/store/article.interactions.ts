import { Subject } from "rxjs"

const initialState = {
    data: [] as any[],
    newDataCount: 0
}
// Global
const ArticleInteraction: {
    articleSubject: Subject<any> | null,
    init: Function,
    subscribe: Function,
    next: Function,
    destroy: Function,
} = {
    articleSubject: null,
    init: () => {
        ArticleInteraction.articleSubject = new Subject();
    },
    subscribe: (setState: any) => {
        if (!ArticleInteraction.articleSubject || ArticleInteraction.articleSubject.closed) {
            ArticleInteraction.init();
        }
        //
        return ArticleInteraction.articleSubject?.subscribe(setState);
    },
    next: (value: any) => {
        ArticleInteraction.articleSubject?.next(value);
    },
    destroy: () => {
        ArticleInteraction.articleSubject?.complete();
    }
}

export { ArticleInteraction };