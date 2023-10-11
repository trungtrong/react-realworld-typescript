import DatePipe from "../../../core/pipes/date.pipe";
import CustomImage from "../../../shared/components/CustomImage";
import CustomLink from "../../../shared/components/CustomLink";
import ArticleActions from "./ArticleActions";

interface ArticleMetaProps {
    article: any;
}
  
const ArticleMeta: React.FC<ArticleMetaProps> = ({ article }: any) => {
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

export default ArticleMeta;