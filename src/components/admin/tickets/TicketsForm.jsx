import React from "react";
import MainForm from "./MainForm";
import TicketDetails from "./TicketDetails";

function TicketsForm() {
    return (
        <div className="flex-1">
            <MainForm />
            <TicketDetails />
        </div>
    );
}

export default TicketsForm;
