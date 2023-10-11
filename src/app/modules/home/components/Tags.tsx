import ErrorMessage from "../../../shared/components/ErrorMessage";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import CustomLink from "../../../shared/components/CustomLink";
import { useCallback, useEffect, useState } from "react";
import { ArticleInteraction } from "../../../core/interactions/article.interactions";
import TagsAPI from "../../../core/services/tags";

export default function Tags() {
    // Reset page when clicking on tag to filter Article List by tag
    const [page, setPage] = useState(0);
    const [errors, setErrors] = useState([]);
    const [tags, setTags] = useState([]);
    const handleClick = useCallback(() => setPage(0), []);
    //
    const getTags = useCallback(async () => {
        try {
            const { data, status } = await TagsAPI.getTagList();
            if (status !== 200) {
                setErrors(data.errors.body);
            }
            setTags(data.tags);
        } catch (error) {

        } finally {
        }
    }, []);
    useEffect(() => {
        getTags();
    }, []);
    //
    const onClicked = () => {
        ArticleInteraction?.next();
    }
    //
    if (!tags?.length) {
        return <LoadingSpinner />
    }
    if (errors?.length) return <ErrorMessage message="Cannot load popular tags..." />;
    //
    return (
        <div>
            <button onClick={onClicked}>Clicked</button>
            <div className="tag-list">
                {
                    !!tags?.length
                        ? tags.map((tag: string) => {
                            return (
                                <CustomLink key={tag}
                                            href={`/?tag=${tag}`}
                                            as={`/?tag=${tag}`}
                                            className="tag-default tag-pill">
                                    <span onClick={handleClick}>{tag}</span>
                                </CustomLink>
                            )
                        })
                        : null
                }
            </div>
        </div>
    )
}