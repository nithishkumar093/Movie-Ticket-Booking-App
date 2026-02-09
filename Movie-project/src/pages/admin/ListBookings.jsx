import { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "./Title";
import { dateFormat } from "../../lib/dateFormat";
export default function ListBookings() {
    const currency = import.meta.env.VITE_CURRENCY;

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllBookings = async () => {
        try {
            setBookings(dummyBookingData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getAllBookings();
    }, [])
    return !isLoading ? (
        <>
            <Title text1="List" text2="Bookings" />
            <div className="max-w-5xl mt-8">
                <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#161616]">
                    <table className="w-full border-collapse text-nowrap">
                        <thead>
                            <tr className="bg-primary/10 text-left text-gray-300">
                                <th className="p-4 font-semibold pl-6 text-sm">User Name</th>
                                <th className="p-4 font-semibold text-sm">Movie Name</th>
                                <th className="p-4 font-semibold text-sm">Show Time</th>
                                <th className="p-4 font-semibold text-sm text-center">Seats</th>
                                <th className="p-4 font-semibold text-sm text-right pr-6">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {
                                bookings.map((item, index) => (
                                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                                        <td className="p-4 pl-6 text-gray-200">{item.user.name}</td>
                                        <td className="p-4 text-gray-300">{item.show.movie.title}</td>
                                        <td className="p-4 text-gray-300">{dateFormat(item.show.showDateTime)}</td>
                                        <td className="p-4 text-center text-gray-300">{item.bookedSeats.join(", ")}</td>
                                        <td className="p-4 text-right pr-6 font-bold text-white tracking-wide">
                                            {currency} {item.amount}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    ) : <Loading />
}
