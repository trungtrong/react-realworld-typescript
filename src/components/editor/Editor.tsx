import { useReducer, useState } from "react";
import TagInput from "../../components/editor/TagInput";
import editorReducer from "../../reducers/editorReducer";
import { useNavigate, useParams } from "react-router";
import ListErrors from "../ListErrors";
import ArticleAPI from "../../services/article";

const NEW_EDITOR_ID = 'new';

export default function ArticleEditor() {
    const navigate = useNavigate();
    //
    const initialState = {
        title: '',
        description: '',
        body: '',
        tagList: '',
    };
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [posting, dispatch] = useReducer(editorReducer, initialState);
    //
    const params = useParams();
    const editorId: string = params.id as string;
    //
    const handleTitle = (e: any) => dispatch({ type: "SET_TITLE", text: e.target.value });
    const handleDescription = (e: any) =>
        dispatch({ type: "SET_DESCRIPTION", text: e.target.value });
    const handleBody = (e: any) =>
        dispatch({ type: "SET_BODY", text: e.target.value });
    const addTag = (tag: any) => dispatch({ type: "ADD_TAG", tag: tag });
    const removeTag = (tagIndex: number) => dispatch({ type: "REMOVE_TAG", tagIndex: tagIndex });
    //
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        //
        try {
            const { data, status } = editorId === NEW_EDITOR_ID 
                ? await ArticleAPI.addNew(posting)
                : await ArticleAPI.update(posting, editorId);
            if (!!data?.errors) {
                setErrors(!!data?.errors?.length ? data.errors :  []);
                return;
            }
            navigate(`/`);
        } catch {

        } finally {
            setLoading(false);
        }
    }
    //
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <ListErrors errors={errors} />

                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Article Title"
                                    value={posting.title}
                                    onChange={handleTitle}
                                />
                                </fieldset>

                                <fieldset className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="What's this article about?"
                                    value={posting.description}
                                    onChange={handleDescription}
                                />
                                </fieldset>

                                <fieldset className="form-group">
                                <textarea
                                    className="form-control"
                                    rows={8}
                                    placeholder="Write your article (in markdown)"
                                    value={posting.body}
                                    onChange={handleBody}
                                />
                                </fieldset>

                                <TagInput
                                    tagList={posting.tagList}
                                    addTag={addTag}
                                    removeTag={removeTag}
                                />

                                <button
                                className="btn btn-lg pull-xs-right btn-primary"
                                type="button"
                                disabled={isLoading}
                                onClick={handleSubmit}
                                >
                                Update Article
                                </button>
                            </fieldset>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}