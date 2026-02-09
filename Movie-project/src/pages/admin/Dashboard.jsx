import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "./Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";
import { useSearchParams, useNavigate } from "react-router-dom";
import AddShows from "./AddShows";

export default function Dashboard() {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isAddingShow = searchParams.get('add-show') === 'true';

    const [dashboardData, setDashboardData] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeShows: [],
        totalUser: 0
    });
    const [loading, setLoading] = useState(true);

    const closeAddShow = () => {
        navigate('/admin');
    }

    const dashboardCards = [
        { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
        { title: "Total Revenue", value: `${currency}${dashboardData.totalRevenue || "0"}`, icon: CircleDollarSignIcon },
        { title: "Active Shows", value: dashboardData.activeShows?.length || "0", icon: PlayCircleIcon },
        { title: "Total Users", value: dashboardData.totalUser || "0", icon: UserIcon },
    ]
    const fetchDashboardData = async () => {
        setDashboardData(dummyDashboardData)
        setLoading(false)
    }
    useEffect(() => {
        fetchDashboardData();
    }, [])
    return !loading ? (
        <div className="flex flex-col gap-8 relative">
            {/* Modal Overlay */}
            {isAddingShow && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={closeAddShow}
                    ></div>
                    <div className="relative z-10 w-full max-w-lg transform transition-all duration-300 scale-100">
                        <button
                            onClick={closeAddShow}
                            className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors"
                        >
                            <XIcon className="w-8 h-8" />
                        </button>
                        <AddShows onClose={closeAddShow} />
                    </div>
                </div>
            )}

            <Title text1="Admin" text2="Dashboard" />
            <div className="relative">
                <BlurCircle top="-40px" left="-40px" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10">
                    {
                        dashboardCards.map((card, index) => (
                            <div key={index} className="flex items-center justify-between p-6 bg-[#161616] border border-white/5 rounded-xl hover:border-primary/30 transition-all duration-300 group">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-sm text-gray-400 font-medium">{card.title}</h1>
                                    <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg text-gray-400 group-hover:text-primary transition-colors">
                                    <card.icon className="w-6 h-6" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <p className="mt-10 test-lg font-medium">Active Shows</p>
            <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
                <BlurCircle top="100px" left="-10%" />
                {
                    dashboardData.activeShows.map((show) => (
                        <div key={show._id} className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300">
                            <img src={show.movie.poster_path} className="h-60 w-full object-cover" />
                            <p className="font-medium p-2 truncate">{show.movie.title}</p>
                            <div className="flex items-center justify-between px-2">
                                <p className="text-lg font-medium">{currency} {show.showPrice}</p>
                                <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                                    {show.movie.vote_average.toFixed(1)}
                                </p>
                            </div>
                            <p className="px-2 pt-2 text-sm text-gray-500">{dateFormat(show.showDateTime)}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    ) : <Loading />
}
