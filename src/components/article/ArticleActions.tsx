import CustomLink from "../common/CustomLink";
import Maybe from "../Maybe";
import { UserStorage } from "../../app/core/interactions/user.storage";
import { useParams } from "react-router";

export default function ArticleActions({ article }: any) {
    const currentUser = UserStorage.getUserInfo();
    const isLoggedIn = UserStorage.isLoggedIn();
    //
    const params = useParams();
    const aid = params.aid;
    //
    const canModify = isLoggedIn && currentUser?.username === article?.author?.username;
    //
    const handleDelete = async () => {
        if (!isLoggedIn) return;
        const result = window.confirm("Do you really want to delete it?");
        if (!result) return;

    }
    //
    return (
        <Maybe test={canModify}>
            <span>
                <CustomLink
                    href="/editor/[pid]"
                    as={`/editor/${article.slug}`}
                    className="btn btn-outline-secondary btn-sm"
                    >
                    <i className="ion-edit" /> Edit Article
                </CustomLink>

                <button className="btn btn-outline-danger btn-sm"
                        onClick={handleDelete}
                >
                    <i className="ion-trash-a" /> Delete Article
                </button>
            </span>
        </Maybe>
    )
}