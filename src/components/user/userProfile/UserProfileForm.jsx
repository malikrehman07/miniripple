import React from "react";
import Tabs from "./Tabs";
import ProfileDetails from "./ProfileDetails";
import BillingInformation from "./BillingInformation";
import UpdatePassword from "./UpdatePassword";

function UserProfileForm() {
    return (
        <div className="flex-1 mb-8">
            {/* <Tabs /> */}
            <ProfileDetails />
            <UpdatePassword />
        </div>
    );
}

export default UserProfileForm;
