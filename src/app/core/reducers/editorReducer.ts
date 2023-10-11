// TODO: Set type for state and action
const editorReducer = (state: any, action: any) => {
    switch (action.type) {
      case "SET_TITLE":
        return {
          ...state,
          title: action.text
        };
      case "SET_DESCRIPTION":
        return {
          ...state,
          description: action.text
        };
      case "SET_BODY":
        return {
          ...state,
          body: action.text
        };
      case "ADD_TAG":
        state.tagList = state.tagList?.length ? state.tagList : [];
        return {
          ...state,
          tagList: state.tagList?.concat(action.tag)
        };
      case "REMOVE_TAG":
        state.tagList = state.tagList?.length ? state.tagList : []; 
        (state.tagList as string[]).slice(action.tagIndex);
        return {
          ...state,
          tagList: state.tagList
        };
      default:
        throw new Error("Unhandled action");
    }
  };
  
  export default editorReducer;
  