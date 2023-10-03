export default function FollowUserButton({
    isUser,
    following,
    username,
    follow,
    unFollow
}: any) {
    if (isUser) {
        return null;
    }
    //
    const handleClick = (e: any) => {
        e.preventDefault();
        if (following) {
            unFollow(username);
        } else {
            follow(username);
        }
    }

    return (
        <button 
            className={`btn btn-sm action-btn ${
                following ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={handleClick}
        >
            <i className="ion-plus-round" />
            &nbsp;
            {following ? "Unfollow" : "Follow"} {username}
        </button>
    )
}