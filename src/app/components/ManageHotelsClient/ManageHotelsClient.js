"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import Hotel from "../Hotel/Hotel";
import Link from "next/link";
import Header from "../Header/Header";
import PrivateRoute from "@/app/utils/PrivateRoute";

const ManageHotelsClient = ({ hotelsData }) => {
    const [hotels, setHotels] = useState(hotelsData);
    const [currentPage, setCurrentPage] = useState(1);
    const hotelsPerPage = 8;

    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
    const totalPages = Math.ceil(hotels.length / hotelsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteHotel = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:5000/deleteHotel/${id}`, {
                        method: "DELETE",
                    });

                    if (!res.ok) throw new Error("Failed to delete hotel");

                    setHotels((hotels) => hotels.filter((hotel) => hotel._id !== id));

                    Swal.fire("Deleted!", "Your hotel has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting hotel:", error);
                    Swal.fire("Error!", "Failed to delete the hotel.", "error");
                }
            }
        });
    };

    return (
        <div>
            <Header />
            <div className="flex justify-end p-4">
                <Link href={'/AddHotel'} className="text-white bg-green-500 hover:bg-blue-700 px-4 py-2 rounded-md text-sm">
                    Create Hotel
                </Link>
            </div>
            {hotels.length > 0 ? (
                <>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {currentHotels.map((hotel) => (
                            <Hotel key={hotel._id} hotel={hotel} deleteHotel={deleteHotel} />
                        ))}
                    </ul>
                    <div className="flex justify-center my-4 space-x-2">
                        {[...Array(totalPages).keys()].map((number) => (
                            <button
                                key={number + 1}
                                onClick={() => paginate(number + 1)}
                                className={`px-3 py-1 rounded ${currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <p>No hotels found.</p>
            )}
        </div>
    );
};

export default PrivateRoute(ManageHotelsClient);
