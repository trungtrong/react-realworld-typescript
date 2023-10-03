import Maybe from "../Maybe";
import CustomLink from "../common/CustomLink";

interface EditProfileButtonProps {
    isUser: boolean;
}

export default function EditProfileButton({ isUser }: EditProfileButtonProps) {
    return (
        <Maybe test={ isUser }>
            <CustomLink href="/user/settings"
                        as="/user/settings"
                        className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-gear-a" /> Edit Profile Settings
            </CustomLink>
        </Maybe>
    )
}