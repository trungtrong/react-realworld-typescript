import NavLink from "../../../shared/components/NavLink";

export default function ProfileTab({ profile }: any) {
    //
    return (
        <ul className="nav nav-pills outline-active">
            <li className="nav-item">
                <NavLink href="/profile/[pid]"
                         as={`/profile/${encodeURIComponent(profile?.username)}`}>
                    <span>My Articles</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink
                    href="/profile/[pid]?favorite=true"
                    as={`/profile/${encodeURIComponent(profile?.username)}?favorite=true`}
                >
                <span>Favorited Articles</span>
                </NavLink>
            </li>
        </ul>
    )
}