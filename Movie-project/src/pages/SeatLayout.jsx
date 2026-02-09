import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";

const SeatLayout = () => {
    const { id, date } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [show, setShow] = useState(null);

    const navigate = useNavigate();

    const getShow = async () => {
        const show = dummyShowsData.find(show => show._id === id);
        if (show) {
            setShow({
                movie: show,
                dateTime: dummyDateTimeData
            })
            if (dummyDateTimeData[date]) {
                setSelectedTime(dummyDateTimeData[date][0]);
            }
        }
    }

    useEffect(() => {
        getShow();
    }, [id, date])

    const handleSeatClick = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    }

    const renderSeats = (row, start, end) => {
        let seats = [];
        for (let i = start; i <= end; i++) {
            const seatId = `${row}${i}`;
            const isSelected = selectedSeats.includes(seatId);
            const isOccupied = seatId === 'C8' || seatId === 'D4' || seatId === 'C12'; // Mock data

            seats.push(
                <button
                    key={seatId}
                    disabled={isOccupied}
                    onClick={() => handleSeatClick(seatId)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md border transition-all duration-300 flex items-center justify-center text-[8px] sm:text-[10px] font-medium
                    ${isSelected
                            ? 'bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20'
                            : isOccupied
                                ? 'bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed'
                                : 'bg-[#121212] border-primary/30 text-gray-400 hover:border-primary hover:text-primary'}`}
                >
                    {seatId}
                </button>
            )
        }
        return seats;
    }

    return show ? (
        <div className='min-h-screen bg-[#050505] text-white px-6 md:px-16 lg:px-40 py-24'>
            <div className='flex flex-col md:flex-row gap-20 items-start'>
                {/* Sidebar: Available Timings */}
                <div className='w-full md:w-64 flex-none sticky top-24'>
                    <div className='bg-[#111111] rounded-3xl p-8 border border-white/5 shadow-2xl'>
                        <p className='text-xs font-black text-gray-500 mb-8 uppercase tracking-[0.2em]'>Available Timings</p>
                        <div className='space-y-4'>
                            {show.dateTime[date]?.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedTime(item)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all duration-500 group border
                                    ${selectedTime?.showId === item.showId
                                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                            : "bg-transparent border-white/5 hover:border-primary/40 text-gray-400"}`}
                                >
                                    <ClockIcon className={`w-4 h-4 transition-transform duration-500 ${selectedTime?.showId === item.showId ? 'scale-110' : 'group-hover:rotate-12'}`} />
                                    <p className='font-bold text-sm'>{new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content: Seat Layout */}
                <div className='flex-1 flex flex-col items-center pt-10'>
                    <h2 className='text-3xl font-bold tracking-tight mb-20 text-white/90'>Select your seat</h2>

                    {/* Curved Screen Indicator */}
                    <div className='w-full max-w-3xl relative mb-24'>
                        <div className='w-full h-12 border-t-[3px] border-primary/20 rounded-[100%] absolute top-0'></div>
                        <p className='text-center pt-8 text-[11px] uppercase tracking-[0.6em] text-gray-600 font-black'>Screen Side</p>
                    </div>

                    {/* Seat Grid Sections */}
                    <div className='flex flex-col gap-12 items-center w-full transform scale-90 lg:scale-100 origin-top'>

                        {/* Section 1: Rows A-B (Centered) */}
                        <div className='flex flex-col gap-3'>
                            {['A', 'B'].map(row => (
                                <div key={row} className='flex items-center gap-6'>
                                    <div className='flex gap-3'>{renderSeats(row, 1, 9)}</div>
                                </div>
                            ))}
                        </div>

                        {/* Section 2: Rows C-D (Left) & E-F (Right) */}
                        <div className='flex flex-col gap-3'>
                            {['C', 'D'].map((row, idx) => {
                                const rightRow = ['E', 'F'][idx];
                                return (
                                    <div key={row} className='flex items-center gap-14'>
                                        <div className='flex gap-2.5'>{renderSeats(row, 1, 9)}</div>
                                        <div className='flex gap-2.5'>{renderSeats(rightRow, 1, 9)}</div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Section 3: Rows G-H (Left) & I-J (Right) */}
                        <div className='flex flex-col gap-3'>
                            {['G', 'H'].map((row, idx) => {
                                const rightRow = ['I', 'J'][idx];
                                return (
                                    <div key={row} className='flex items-center gap-14'>
                                        <div className='flex gap-2.5'>{renderSeats(row, 1, 9)}</div>
                                        <div className='flex gap-2.5'>{renderSeats(rightRow, 1, 9)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Float Bar: Proceed to Checkout */}
            {selectedSeats.length > 0 && (
                <div className='fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000'>
                    <button
                        onClick={() => navigate('/my-bookings')}
                        className='w-full bg-primary py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-3xl shadow-primary/40 flex items-center justify-center gap-4 group'
                    >
                        Proceed to checkout
                        <ArrowRightIcon strokeWidth={3} className="w-4 h-4"/>
                    </button>
                </div>
            )}
        </div>
    ) : (
        <Loading />
    )
};
export default SeatLayout