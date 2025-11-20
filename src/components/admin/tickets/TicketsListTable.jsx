"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { selectTicket } from "@/redux/actions/ticketsActions";
import { format } from "date-fns";

const PAGE_LIMIT = 8;

function TicketsListTable({ data, loading }) {
    const dispatch = useDispatch();
    const emptyRows = PAGE_LIMIT - data.length;

    const handleTicketClick = (ticketId) => {
        dispatch(selectTicket(ticketId));
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "open":
                return "text-blue-600";
            case "in progress":
                return "text-yellow-600";
            case "resolved":
                return "text-green-600";
            case "closed":
                return "text-gray-600";
            default:
                return "text-gray-600";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "text-red-600";
            case "medium":
                return "text-yellow-600";
            case "low":
                return "text-green-600";
            default:
                return "text-gray-600";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px] mt-6 mx-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">Loading tickets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex overflow-hidden flex-wrap items-start mt-6 mr-6 ml-6 rounded-md shadow-sm font-['Amble'] bg-neutral-50">
            <TableColumn title="Subject" items={data.map((item) => item.subject)} emptyCount={emptyRows} />
            <TableColumn title="User Name" items={data.map((item) => item.userName)} emptyCount={emptyRows} />
            <TableColumn title="Category" items={data.map((item) => item.category)} emptyCount={emptyRows} />
            <TableColumn title="Priority" items={data.map((item) => ({
                text: item.priority,
                color: getPriorityColor(item.priority),
            }))} isPriority={true} emptyCount={emptyRows} />
            <TableColumn title="Status" items={data.map((item) => ({
                text: item.status,
                color: getStatusColor(item.status),
            }))} isStatus={true} emptyCount={emptyRows} />
            <TableColumn title="Date Submitted" items={data.map((item) => 
                format(new Date(item.createdAt), "MMM dd, yyyy")
            )} width="w-[140px]" emptyCount={emptyRows} />
            <ActionsColumn data={data} rowCount={data.length} emptyCount={emptyRows} onTicketClick={handleTicketClick} />
        </div>
    );
}

function TableColumn({ title, items, width = "flex-1 shrink basis-0", isStatus = false, isPriority = false, emptyCount = 0 }) {
    const baseTextClass = "text-sm tracking-tight leading-none";
    let textClass = baseTextClass + " text-zinc-600";
    
    if (isStatus || isPriority) {
        textClass = baseTextClass + " font-medium";
    }

    return (
        <div className={`${textClass} ${width}`}>
            <div className="flex gap-10 items-center w-full font-bold bg-blue-200">
                <div className="gap-2.5 self-stretch px-6 py-6 my-auto max-md:px-5">
                    {title}
                </div>
            </div>

            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex gap-10 items-center py-2.5 mt-1 w-full whitespace-nowrap bg-white"
                >
                    <div className="gap-2.5 self-stretch px-6 py-5 my-auto max-md:px-5">
                        {isStatus || isPriority ? (
                            <span className={item.color}>{item.text}</span>
                        ) : (
                            <div className="max-w-[200px] truncate" title={item}>
                                {item}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Render empty placeholders */}
            {Array.from({ length: emptyCount }).map((_, index) => (
                <div
                    key={`empty-${index}`}
                    className="flex gap-10 items-center py-[17px] mt-1 w-full whitespace-nowrap bg-white"
                >
                    <div className="gap-2.5 self-stretch px-6 py-5 my-auto max-md:px-5 text-zinc-300"></div>
                </div>
            ))}
        </div>
    );
}

function ActionsColumn({ data, rowCount, emptyCount, onTicketClick }) {
    return (
        <div className="flex relative flex-col flex-1 shrink items-start basis-0 font-['Jost']">
            <div className="flex z-0 gap-10 items-center self-stretch w-full text-sm font-bold tracking-tight leading-none whitespace-nowrap bg-blue-200 rounded-none text-zinc-600">
                <div className="gap-2.5 self-stretch px-6 py-6 my-auto max-md:px-5">
                    Actions
                </div>
            </div>

            {Array.from({ length: rowCount }).map((_, index) => {
                const ticket = data[index];
                const isResolved = ticket?.status === "Resolved" || ticket?.status === "Closed";

                return (
                    <div
                        key={index}
                        className="bg-white pr-6 py-0 mt-1 rounded-none w-full"
                    >
                        <div className="flex flex-1 shrink gap-2.5 items-center self-stretch px-6 py-[19px] my-auto w-full rounded-none basis-0 max-md:px-5">
                            <div className="flex items-start self-stretch my-auto w-9">
                                {isResolved ? (
                                    <div className="bg-gray-200 px-3 py-2 rounded text-sm text-gray-600">
                                        Closed
                                    </div>
                                ) : (
                                    <button 
                                        className="flex gap-2.5 justify-center items-center px-3 py-2 rounded shadow-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                        onClick={() => onTicketClick(ticket._id)}
                                        title="View Details"
                                    >
                                        <span className="text-sm">View</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Render empty placeholders */}
            {Array.from({ length: emptyCount }).map((_, index) => (
                <div
                    key={`empty-${index}`}
                    className="bg-white pr-6 py-0 mt-1 rounded-none w-full"
                >
                    <div className="flex flex-1 shrink gap-2.5 items-center self-stretch px-6 py-[19px] my-auto w-full rounded-none basis-0 max-md:px-5">
                        <div className="flex items-start self-stretch my-auto w-9">
                            <div className="px-3 py-2 rounded text-sm text-zinc-300"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TicketsListTable;
