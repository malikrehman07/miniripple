import React from "react";
import MainForm from "./MainForm";
import UserDetails from "./UserDetails";

function UserManagementForm() {
    return (
        <div className="flex-1">
            <MainForm />
            <UserDetails />
        </div>
    );
}

export default UserManagementForm;
