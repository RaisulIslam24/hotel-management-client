import ManageHotelsClient from "../components/ManageHotelsClient/ManageHotelsClient";

const ManageHotelsPage = async () => {
    try {
        const res = await fetch("https://hostel-management-server-kappa.vercel.app/hotels", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const hotelsData = await res.json();

        return <ManageHotelsClient hotelsData={hotelsData} />;
    } catch (error) {
        console.error("Error fetching hotels:", error);
        return <p>Error loading hotels.</p>;
    }
};

export default ManageHotelsPage;