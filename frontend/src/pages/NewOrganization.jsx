import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrganization, reset } from "../features/organization/organizationSlice";
import BackButton from "../components/BackButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ViewListIcon from "@mui/icons-material/ViewList";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Spinner from "../components/Spinner";



function OrganizationList() {
  const organizations = useSelector((state) => state.organizations.organizations);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.organizations
  );
  const userRole = useSelector(state => state.auth.user.role);
  const organizationId = useSelector(state => state.auth.user.organization); // Retrieve the user's organization ID from Redux state

  // Filter organizations to include only the organization with the user's organizationId
  const userOrganization = organizations.find(org => org._id === organizationId);


  const dispatch = useDispatch();

  useEffect(() => {
    // Load the initial issue list when the component mounts
    dispatch(getAllOrganization());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      toast.success("Organization added")
      dispatch(getAllOrganization());
    }
  }, [dispatch, isError, isSuccess, message]);


  // Check if the user has one of the allowed roles
  if (!["ADMIN", "SUPERVISOR", "EMPLOYEE", "ORGAGENT"].includes(userRole)) {
    // Handle unauthorized access, e.g., redirect or show an error message
    return (
      <div>
        <h1>Unauthorized Access</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  const columns = [
    { field: "id", headerName: "Organization ID", flex: 1},
    { field: "name", headerName: "Organization name", flex: 1 },
    { field: "email", headerName: "Organization email", flex: 1 },
    { field: "contact", headerName: "Organization contact", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Link to={`/organization/${params.row.id}`}>
          <button className="group">
                      <ModeEditIcon className="text-blue-500 group-hover:text-blue-700 mr-8" />
                    </button>
          </Link>
          <Link to={`/organizations/${params.row.id}`}>
          <button className="group">
                      <VisibilityIcon className="text-gray-500 group-hover:text-gray-700 mr-8" />
                    </button>
          </Link>
        </div>
      ),
    },
  ];

  const rows = userOrganization ? [
    {
      id: userOrganization._id,
      name: userOrganization.name,
      email: userOrganization.email,
      contact: userOrganization.contact,
    }
  ] : [];

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <div>
      <h1 className="text-xl font-extrabold text-14 mb-10">
          {" "}
          <ViewListIcon /> Manage my organization
        </h1>
       <div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
        </div>
        </div>
      
    </>
  );
}

export default OrganizationList;
