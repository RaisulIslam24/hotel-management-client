import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PrivateRoute = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("accessToken");

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/Login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;
    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `PrivateRoute(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithAuth;
};

export default PrivateRoute;
