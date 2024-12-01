import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  const organizerRoutes = [
    { path: "/dashboard/organizerProfile", label: "Organizer Profile" },
    { path: "/dashboard/addCamp", label: "Add A Camp" },
    { path: "/dashboard/manageCamps", label: "Manage Camps" },
    {
      path: "/dashboard/manageRegisteredCamps",
      label: "Manage Registered Camps",
    },
    { path: "/dashboard/manageUsers", label: "Manage Users" },
  ];

  const participantsRoutes = [
    { path: "/dashboard/analytics", label: "Analytics" },
    { path: "/dashboard/participantProfile", label: "Participant Profile" },
    { path: "/dashboard/registeredCamps", label: "Registered Camps" },
    { path: "/dashboard/paymentHistory", label: "Payment History" },
  ];

  return (
    <div className="w-full min-h-screen">

      <div className="flex w-full">
        {/* Dashboard - left panel */}
        <div className="bg-slate-100 fixed top-16 min-h-screen w-[30%] lg:w-[17%] p-4">
          {/* Organizer Profile */}

          {isAdmin ? (
            <>
              <ul>
                {organizerRoutes.map((link) => (
                  <li key={link.path} className="font-medium text-base mb-2">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "text-orange-500 font-bold" : "text-gray-600"
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              {/* Participant Profile */}
              <ul>
                {participantsRoutes.map((link) => (
                  <li key={link.path} className="font-medium text-base mb-2">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "text-orange-500 font-bold" : "text-gray-600"
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Main content - right panel */}

        <div className="mt-20 ml-20 md:ml-40 lg:ml-64 w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
