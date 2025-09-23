import { useModal } from "@/hooks/useModal";
import { useUserData } from "@/hooks/useUserData";
import { type ChildrenProps } from "@/types/ui";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";

interface ProtectedRouteProps extends ChildrenProps {
	anonymous?: boolean;
}

const ProtectedRoute = ({
	children,
	anonymous = false,
}: ProtectedRouteProps) => {
	const { currentUser } = useUserData();
	const { setModalIsOpen } = useModal();
	const location = useLocation();
	const from = location.state?.from || "/";

	if (anonymous && currentUser && from !== "/") {
		return <Navigate to={from} />;
	}

	if (!currentUser && !anonymous) {
		toast.error("You must be logged in to access this page");
		setModalIsOpen("auth");
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};

export default ProtectedRoute;
