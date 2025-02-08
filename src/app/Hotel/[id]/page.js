import Header from "@/app/components/Header/Header";
import SocialShare from "@/app/components/SocialShare/SocialShare";

async function getHotelData(id) {
  const res = await fetch(`https://hostel-management-server-kappa.vercel.app/hotelDetails/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hotel details");
  }

  return res.json();
}

export default async function HotelDetailPage({ params }) {
  const { id } = params;
  const hotel = await getHotelData(id);

  return (
	<>
		<Header />
		<div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
			<img
				src={hotel.property_image}
				alt={hotel.property_name}
				width={600}
				height={400}
				className="w-full h-64 object-cover rounded-md"
			/>
			<h1 className="text-2xl font-bold mt-4">{hotel.property_name}</h1>
			<p className="text-gray-600 mt-2">{hotel.address}</p>
			<p className="text-gray-800 mt-2"><strong>Cost per night:</strong> ${hotel.cost_per_night}</p>
			<p className="text-gray-600 mt-2"><strong>Available Rooms:</strong> {hotel.available_rooms}</p>
			<p className="text-yellow-500 mt-2"><strong>Rating:</strong> {hotel.average_rating} ⭐</p>
			<div className="flex space-x-3 mt-4">
			<SocialShare title={hotel.property_name} address={hotel.address}/>
			</div>
		</div>
	</>
  );
}
