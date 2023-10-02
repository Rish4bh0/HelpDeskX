import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

function TicketItem({ ticket }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Access the users array from the Redux state
  const users = useSelector((state) => state.auth.users);

  // Find the user object with the same ID as the ticket's assignedTo ID
  const assignedUser = users.find((user) => user._id === ticket.assignedTo);

  // Extract the name of the assigned user (if found)
  const assignedToName = assignedUser ? assignedUser.name : "Unassigned";

  // Access the issueTypes array from the Redux state (assuming you have it there)
  const issueTypes = useSelector((state) => state.issueTypes.issueTypes);

  // Find the issueType object with the same ID as the ticket's issueType ID
  const ticketIssueType = issueTypes.find((issueType) => issueType._id === ticket.issueType);

  // Extract the name of the issueType (if found)
  const issueTypeName = ticketIssueType ? ticketIssueType.name : "Unknown Issue Type";

  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US", options)}</div>
      <div>{ticket.product}</div>
      <div>{assignedToName}</div>
      <div className={`priority priority-${ticket.priority}`}>{ticket.priority}</div>
      <div>{issueTypeName}</div> {/* Display the issue type's name */}
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <div className="icon-buttons">
        <IconButton component={Link} to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
          <VisibilityIcon />
        </IconButton>
        <IconButton component={Link} to={`/ticket/${ticket._id}/update`} className="btn btn-reverse btn-sm">
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TicketItem;
