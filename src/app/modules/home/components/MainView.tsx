import { useCallback, useEffect, useState } from "react";
import ArticleList from "../../articles/components/ArticleList";
import TabList from "./TabList";
import { ArticleInteraction } from "../../../core/interactions/article.interactions";

export default function MainView() {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        ArticleInteraction.init();
        ArticleInteraction.articleSubject?.subscribe(() => {
            subscribeArticleSubject();
        });
    },  []);

    const subscribeArticleSubject = useCallback(() => {
        setIsShow(isShow => !isShow);
    }, []);

    useEffect(() => {
        return () => {
            ArticleInteraction.destroy();
        }
    },  []);

    return (
        <div className="col-md-9">
            {isShow ? (<div>Hello</div>) : null}
            
            <div className="feed-toggle">
                <TabList />
            </div>
            <ArticleList />
        </div>
    )
}