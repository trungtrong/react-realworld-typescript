import { useState } from "react";

export default function TagInput({ tagList, addTag, removeTag }: { tagList: string[]; addTag: Function; removeTag: Function }) {
    const [tag, setTag] = useState("");
    const changeTagInput = (e: any) => {
        setTag(e.target.value);
    }
    //
    const handleAddTag = () => {
        if (!tag) {
            return;
        }
        addTag(tag);
        setTag("");
    }
    // Install Key enums
    const handleTagInputKeyDown = (e: any) => {
        switch (e.key) {
            case "Enter":
            case 13: // Enter
            case 9: // Tab
            case 188: // Comma
                if (e.key !== 9) {
                    e.preventDefault();
                }
                //
                handleAddTag();
                break;
        }
    }
    //
    const handleRemoveTag = (tagIndex: number) => {
        removeTag(tagIndex);
    }

    return (
        <>
            <fieldset className="form-group">
                <input 
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    value={tag}
                    onChange={changeTagInput}
                    onBlur={handleAddTag}
                    onKeyDown={handleTagInputKeyDown}
                    >
                </input>
                {/* Show Tag List */}
                <div className="tag-list">
                    {
                        !!tagList?.length
                        ? tagList?.map((tag, index) => {
                            return (
                                <span key={index} 
                                      className="tag-default tag-pill">
                                    <i className="ion-close-round"
                                       onClick={() => handleRemoveTag(index)}>
                                    </i>
                                    {tag}
                                </span>
                            )
                        })
                        : null
                    }
                </div>
            </fieldset>
        </>
    )
}