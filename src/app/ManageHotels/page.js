import ManageHotelsClient from "../components/ManageHotelsClient/ManageHotelsClient";

const ManageHotelsPage = async () => {
    try {
        const res = await fetch("http://localhost:5000/hotels", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const hotelsData = await res.json();

        return <ManageHotelsClient hotelsData={hotelsData} />;
    } catch (error) {
        console.error("Error fetching hotels:", error);
        return <p>Error loading hotels.</p>;
    }
};

export default ManageHotelsPage;