/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from "react";
import CustomLink from "../../../shared/components/CustomLink";
import CustomImage from "../../../shared/components/CustomImage";
import axios from "axios";
import { UserStorage } from "../../../core/interactions/user.storage";
import { useNavigate } from "react-router";
import { SERVER_BASE_URL } from "../../../utils/constant";
import DatePipe from "../../../core/pipes/date.pipe";
import FunctionPipe from "../../../core/pipes/function.pipe";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";


export default function ArticlePreview({ article }: any) {
    if (!article) {
        return null;
    };

    const navigate = useNavigate();
    //
    const [page, setPage] = useState(0);
    const [preview, setPreview] = useState(article);
    const [hover, setHover] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const convertDate = useCallback((createdAt: string) => {
        return new Date(createdAt).toDateString();
    }, []);
    //
    const currentUser = UserStorage.getUserInfo();
    const isLoggedIn = UserStorage.isLoggedIn();
    //
    const handleClickFavorite = async(slug: string) => {
        if (!isLoggedIn) {
            navigate(`/user/login`);
            return;
        }
        //
        setPreview({
            ...preview,
            favorited: !preview.favorited,
            favoritesCount: preview.favorited
              ? preview.favoritesCount - 1
              : preview.favoritesCount + 1,
        });
        //
        try {
            if (preview.favorited) {
                await axios.delete(`${SERVER_BASE_URL}/articles/${slug}/favorite`, {
                    headers: {
                      Authorization: `Token ${currentUser?.token}`,
                    },
                });
            } else {
                await axios.post(
                `${SERVER_BASE_URL}/articles/${slug}/favorite`,
                {},
                {
                    headers: {
                    Authorization: `Token ${currentUser?.token}`,
                    },
                }
                );
            }
        } catch (error) {
            setPreview({
                ...preview,
                favorited: !preview.favorited,
                favoritesCount: preview.favorited
                  ? preview.favoritesCount - 1
                  : preview.favoritesCount + 1,
            });
        } finally {

        }
    }
    //
    return (
        <div className="article-preview" style={{ padding: "1.5rem 0.5rem" }}>
            <div className="article-meta">
                {/* Avatar */}
                <CustomLink
                    href="/profile/[pid]"
                    as={`/profile/${preview.author.username}`}
                    >
                    <CustomImage
                        src={preview.author.image}
                        alt="author's profile image"
                    />
                </CustomLink>

                {/* User Name */}
                <div className="info">
                    <CustomLink
                        href="/profile/[pid]"
                        as={`/profile/${preview.author.username}`}
                        className="author"
                    >
                        <span onClick={() => setPage(0)}>{preview.author.username}</span>
                    </CustomLink>
                    {/* <span className="date">
                        {new Date(preview.createdAt).toDateString()}
                    </span> */}
                    <DatePipe dateString={preview.createdAt}></DatePipe>

                    <FunctionPipe value={preview.createdAt}
                                  handler={convertDate}/>
                </div>

                <div className="pull-xs-right">
                    <button
                        className={
                        preview.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS
                        }
                        onClick={() => handleClickFavorite(preview.slug)}
                    >
                        <i className="ion-heart" /> {preview.favoritesCount}
                    </button>
                </div>
            </div>

            <CustomLink href="/article/[pid]"
                        as={`/article/${preview.slug}`}
                        className="preview-link">
                <h1>{preview.title}</h1>
                <p>{preview.description}</p>
                <span>Read more...</span>
                {/* Tags */}
                <ul className="tag-list" style={{ maxWidth: "100%" }}>
                    {
                        preview.tagList.map((tag: any, index: number) => {
                            return (
                                <CustomLink href={`/?tag=${tag}`} as={`/?tag=${tag}`} key={index}>
                                    <li className="tag-default tag-pill tag-outline"
                                        onClick={(e) => e.stopPropagation()}
                                        onMouseOver={() => {
                                            setHover(true);
                                            setCurrentIndex(index);
                                        }}
                                        onMouseLeave={() => {
                                            setHover(false);
                                            setCurrentIndex(-1);
                                        }}
                                        style={{
                                            borderColor:
                                              hover && currentIndex === index ? "#5cb85c" : "initial",
                                        }}>
                                        <span
                                            style={{
                                            color:
                                                hover && currentIndex === index ? "#5cb85c" : "inherit",
                                            }}
                                            onClick={() => setPage(0)}>
                                            {tag}
                                        </span>
                                    </li>
                                </CustomLink>
                            )
                        })
                    }
                </ul>
            </CustomLink>
        </div>
    )
}   