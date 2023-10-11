import NavLink from "../common/NavLink";
import CustomLink from "../common/CustomLink";
import { UserStorage } from "../../app/core/interactions/user.storage";
import { useParams } from "react-router";
import Maybe from "../Maybe";

export default function TabList() {
    const isLoggedIn = UserStorage.isLoggedIn();
    //
    const params = useParams();
    const tag = params.tag
    //
    if (!isLoggedIn) {
        return (
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <NavLink href="/" as="/">
                        Global Feed
                    </NavLink>
                </li>

                <Maybe test={!!tag}>
                    <li className="nav-item">
                        <CustomLink
                        href={`/?tag=${tag}`}
                        as={`/?tag=${tag}`}
                        className="nav-link active"
                        >
                        <i className="ion-pound" /> {tag}
                        </CustomLink>
                    </li>
                </Maybe>
            </ul>
        )
    } else {
        return (
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <NavLink href={`/?follow=true`}
                             as={`/?follow=true`}
                             info={'Your Feed'}>
                        Your Feed
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink href="/" as="/">
                    Global Feed
                    </NavLink>
                </li>

                <Maybe test={!!tag}>
                    <li className="nav-item">
                    <CustomLink
                        href={`/?tag=${tag}`}
                        as={`/?tag=${tag}`}
                        className="nav-link active"
                    >
                        <i className="ion-pound" /> {tag}
                    </CustomLink>
                    </li>
                </Maybe>
            </ul>
        )
    }
}