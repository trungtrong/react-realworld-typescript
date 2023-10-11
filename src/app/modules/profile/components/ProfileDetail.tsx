import { useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import UserAPI from "../../../core/services/user.service";
import { UserStorage } from "../../../core/interactions/user.storage";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import CustomImage from "../../../shared/components/CustomImage";
import Maybe from "../../../shared/components/Maybe";
import EditProfileButton from "./EditProfileButton";
import FollowUserButton from "./FollowUserButton";
import { UserProfileModel } from "../../../shared/models";
import ProfileTab from "./ProfileTab";
import ArticleList from "../../articles/components/ArticleList";

export default function ProfileDetail() {
    // TODO: Let's optimize this. It is called multiple time during navigating and Initialized
    // TODO: learn useSWR and useSWRMutation
    // 1 - Get Router Info
    const params = useParams();
    const username: string = params.username as string;
    // 2 -
    // const { trigger, isMutating } = useSWRMutation('/api/user', sendRequest, /* options */)

    //
    // if (profileError) return <ErrorMessage message="Can't load profile" />;
    // //
    // const { profile } = fetchedProfile || initialProfile || {};
    // // 3 - 
    // const isLoggedIn = checkLogin(currentUser);
    const [isProfileError, setIsProfileError] = useState(false);
    const [profile, setProfile] = useState(new UserProfileModel());
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = UserStorage.getUserInfo();
    const isLoggedIn = UserStorage.isLoggedIn();
    const isUser = currentUser && username === currentUser?.username;

    useEffect(() => {
        getUserProfileInfo();
    }, []);

    const getUserProfileInfo = useCallback(async () => {
        try {
            //
            const { data, status } = await UserAPI.getUserProfile(username);
            setIsProfileError(status !== 200);
            setProfile(data.profile)
            //
            if (data?.user && isUser) {
                UserStorage.storeUserInfo({ user: data.profile })
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }, []);

    //
    const handleFollow = async () => {
        // mutate(
        //   `${SERVER_BASE_URL}/profiles/${pid}`,
        //   { profile: { ...profile, following: true } },
        //   false
        // );
        UserAPI.follow(String(username));
        // trigger({ ...profile, following: true }, {
        //     optimisticData: (profile: any) => ({ ...profile, following: true }),
        //     rollbackOnError: true
        // });
      };
    
      const handleUnfollow = async () => {
        // mutate(
        //   `${SERVER_BASE_URL}/profiles/${pid}`,
        //   { profile: { ...profile, following: false } },
        //   true
        // );
        UserAPI.unFollow(String(username));
        // trigger({ ...profile, following: false }, {
        //     optimisticData: (profile: any) => ({ ...profile, following: true  }),
        //     rollbackOnError: true
        // });      
    };

    return !isProfileError ? (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <CustomImage
                                src={profile.image}
                                alt="User's profile image"
                                className="user-img"
                            />
                            <h4>{username}</h4>
                            <p>{profile.bio}</p>

                            <EditProfileButton isUser={isUser} />

                            <Maybe test={isLoggedIn}>
                                <FollowUserButton
                                    isUser={isUser}
                                    username={username}
                                    following={profile.following}
                                    follow={handleFollow}
                                    unFollow={handleUnfollow}
                                    />
                            </Maybe>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                    <div className="articles-toggle">
                        <ProfileTab profile={profile} />
                    </div>
                    <ArticleList />
                </div>
                </div>
            </div>
        </div>
    ) : (<ErrorMessage message="Can't load profile" />)
}