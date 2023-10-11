import Pagination from "../common/Pagination";
import { useParams } from "react-router";
import useViewPort from "../../app/core/hooks/useViewPort";
import { DEFAULT_LIMIT, SERVER_BASE_URL } from "../../app/utils/constant";
import { useCallback, useEffect, useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import Maybe from "../Maybe";
import ArticlePreview from "./ArticlePreview";
import { BASE_API } from "../../app/core/services/base.service";

export default function ArticleList() {
    const { vw } = useViewPort();
    const params = useParams();
    const { favorite, follow, tag, pid } = params;
    const page = 0;
    const [lastIndex, setLastIndex] = useState(0);
    const [errors, setErrors] = useState(false);
    const [data, setData] = useState(undefined);

    //
    const isProfilePage = window.location.pathname.startsWith(`/profile`);
    let fetchURL = `${SERVER_BASE_URL}/articles?offset=${0 * DEFAULT_LIMIT}`;
    //
    switch (true) {
        case !!tag:
            fetchURL = `${SERVER_BASE_URL}/articles?offset=${
                page * DEFAULT_LIMIT
            }`;
            break;
        case isProfilePage && !!favorite:
            fetchURL = `${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(
                String(pid)
            )}&offset=${page * DEFAULT_LIMIT}`;
            break;
        case isProfilePage && !favorite:
            fetchURL = `${SERVER_BASE_URL}/articles?author=${encodeURIComponent(
                String(pid)
            )}&offset=${page * DEFAULT_LIMIT}`;
            break;
        case !isProfilePage && !!follow:
            fetchURL = `${SERVER_BASE_URL}/articles/feed?offset=${
                page * DEFAULT_LIMIT
            }`;
            break;
        default:
            break;
    }

    const getArticleList = useCallback(async () => {
        try {
            const { data, status } = await BASE_API.get(fetchURL);
            if (status !== 200) {
                setErrors(data.errors.body);
            }
            //
            setData(data);
        } catch(error) {

        } finally {

        }
    }, []);
    useEffect(() => {
        getArticleList();
    }, []);

    if (errors) {
        return (
            <div className="col-md-9">
                <div className="feed-toggle">
                <ul className="nav nav-pills outline-active"></ul>
                </div>
                <ErrorMessage message="Cannot load recent articles..." />
            </div>
        )
    }

    if (!data) return <LoadingSpinner />;
    const { articles, articlesCount } = data as any;
    if (articles && articles.length === 0) {
        return <div className="article-preview">No articles are here... yet.</div>;
    }
    //


    return (
        <>
            {
                articles?.map((article: any) => (
                    <ArticlePreview key={article.slug} article={article} />
                ))
            }

            <Maybe test={articlesCount && articlesCount > 20}>
                <Pagination
                    total={1000}
                    limit={20}
                    pageCount={vw >= 768 ? 10 : 5}
                    currentPage={page}
                    lastIndex={lastIndex}
                    fetchURL={fetchURL}
                />
            </Maybe>
        </>
    )
}