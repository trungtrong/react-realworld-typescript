import DatePipe from "../../app/core/pipes/date.pipe";
import CustomImage from "../common/CustomImage";
import CustomLink from "../common/CustomLink";
import ArticleActions from "./ArticleActions";

export default function ArticleMeta({ article }: any) {
    if (!article) return;

    return (
        <div className="article-meta">
            <CustomLink
                href="/profile/[pid]"
                as={`/profile/${encodeURIComponent(article.author?.username)}`}
            >
                <CustomImage src={article.author?.image} alt="author-profile-image" />
            </CustomLink>

            <div className="info">
                <CustomLink
                    href="/profile/[pid]"
                    as={`/profile/${encodeURIComponent(article.author?.username)}`}
                    className="author"
                >
                    {article.author?.username}
                </CustomLink>
                {/* <span className="date">
                    {new Date(article.createdAt).toDateString()}
                </span> */}
                <DatePipe dateString={article.createdAt}></DatePipe>
            </div>

            <ArticleActions article={article} />
        </div>
    )
}