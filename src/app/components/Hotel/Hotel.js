import Link from 'next/link';

const Hotel = ({hotel, deleteHotel}) => {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
		<Link href={`/Hotel/${hotel._id}`} className='cursor-pointer'>
			<img className="w-full h-48 object-cover" src={hotel.property_image} alt="Hotel Image" />
			<div className="p-4">
			<h2 className="text-xl font-semibold text-gray-800">{hotel.property_name}</h2>
			
			<p className="text-gray-600 text-sm mt-2">
			<span className="font-medium">Address:</span> {hotel.address}
			</p>

			<p className="text-gray-800 text-lg mt-2">
			<span className="font-medium">Cost per night:</span> ${hotel.cost_per_night}
			</p>

			<p className="text-gray-600 text-sm mt-2">
			<span className="font-medium">Available Rooms:</span> {hotel.available_rooms} rooms
			</p>

			<div className="mt-2">
			<span className="font-medium text-gray-800">Average Rating: </span>
			<div className="flex items-center">
				<span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
				<span className="text-gray-600 ml-2">{hotel.average_rating}/5</span>
			</div>
			</div>
			</div>
		</Link>

		<div className="mt-4 flex justify-between items-center pb-4 px-4">
			<Link href={{pathname: '/AddHotel', query: {id: hotel._id}}} className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md text-sm">
				Edit
			</Link>
			<button onClick={() => deleteHotel(hotel._id)} className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md text-sm">
				Delete
			</button>
			</div>
		</div>
	)
};

export default Hotel;