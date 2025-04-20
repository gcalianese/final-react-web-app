import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, page }: { children: any; page: string }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    if (!currentUser) return <Navigate to="/Home" replace />;

    if (page === "Users" && currentUser.role !== "ADMIN") {
        return <Navigate to="/Home" replace />;
    }

    if (page === "Profile" && !currentUser) {
        return <Navigate to="/Home" replace />;
    }

    return children;
}