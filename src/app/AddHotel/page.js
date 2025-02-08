"use client";
import React, { useEffect, useState } from 'react';
import './AddHotel.css';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header/Header';

const AddHotel = () => {
    const searchParams = useSearchParams();
    const hotelId = searchParams.get("id");
    const { register, handleSubmit, reset, setValue } = useForm();
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (hotelId) {
            fetch(`https://hostel-management-server-kappa.vercel.app/hotelDetails/${hotelId}`)
                .then(res => res.json())
                .then(data => {
                    setValue("property_name", data.property_name);
                    setValue("address", data.address);
                    setValue("cost_per_night", data.cost_per_night);
                    setValue("available_rooms", data.available_rooms);
                    setValue("average_rating", data.average_rating);
                    setImageUrl(data.property_image);
                })
                .catch(err => console.error("Error fetching hotel:", err));
        }
    }, [hotelId, setValue]);

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '5fb422405e02b3782f9ac55b36d77374');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(response => setImageUrl(response.data.data.display_url))
            .catch(error => console.log(error));
    };

    const onSubmit = async (data) => {
        if (!imageUrl) {
            alert('Please upload a property image');
            return;
        }

        let newObject = {
            ...data,
            cost_per_night: Number(data.cost_per_night),
            available_rooms: Number(data.available_rooms),
            average_rating: Number(data.average_rating),
            property_image: imageUrl,
        };

        try {
            const response = hotelId
                ? await fetch(`https://hostel-management-server-kappa.vercel.app/updateHotel/${hotelId}`, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newObject),
                })
                : await fetch('https://hostel-management-server-kappa.vercel.app/addHotel', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newObject),
                });

            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: hotelId ? 'Hotel updated!' : 'Hotel added!',
                    icon: 'success',
                });
                reset();
            } else {
                alert('Operation failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <section className="addHotel">
                <div>
                    <h3 className="text-center text-xl font-semibold p-3">
                        {hotelId ? "Edit Hotel" : "Add Hotel"}
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="addHotelForm">
                        <div className="addHotelItem">
                            <label>Property Name</label>
                            <input type="text" {...register("property_name", { required: true })} placeholder="Property Name" />
                        </div>
                        <div className="addHotelItem">
                            <label>Address</label>
                            <input type="text" {...register("address", { required: true })} placeholder="Property Address" />
                        </div>
                        <div className="addHotelItem">
                            <label>Cost per Night</label>
                            <input type="number" {...register("cost_per_night", { required: true })} placeholder="$100" />
                        </div>
                        <div className="addHotelItem">
                            <label>Number of Available Rooms</label>
                            <input type="number" {...register("available_rooms", { required: true })} placeholder="10" />
                        </div>
                        <div className="addHotelItem">
                            <label htmlFor="file">
                                <span>Upload Property Image</span>
                                <FontAwesomeIcon
                                    className={imageUrl ? "hotelUpdateIconGreen" : "hotelUpdateIconRed"}
                                    icon={faUpload} />
                            </label>
                            <input style={{ display: 'none' }} type="file" onChange={handleImageUpload} id="file" />
                        </div>
                        <div className="addHotelItem">
                            <label>Average Rating</label>
                            <input type="number" step="0.1" {...register("average_rating", { required: true })} placeholder="4.5" />
                        </div>
                        <input className="addHotelButton" type="submit" value={hotelId ? "Update Hotel" : "Add Hotel"} />
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddHotel;
