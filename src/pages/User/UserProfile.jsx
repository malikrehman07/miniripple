import React, { useEffect } from "react";
import UserProfileForm from "@/components/user/userProfile/UserProfileForm";

function UserProfile() {
    useEffect(() => {
        console.log("🟢 UserProfile mounted");
        return () => {
            console.log("🔴 UserProfile unmounted");
        };
    }, []);

    return <UserProfileForm />;
}

export default UserProfile;
