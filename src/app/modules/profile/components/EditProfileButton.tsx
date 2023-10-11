import Maybe from "../../../shared/components/Maybe";
import CustomLink from "../../../shared/components/CustomLink";

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