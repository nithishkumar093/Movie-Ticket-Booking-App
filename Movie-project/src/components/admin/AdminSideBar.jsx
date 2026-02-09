import React from 'react'
import { LayoutDashboardIcon, PlusSquareIcon, ListIcon, ListCollapseIcon } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets'
const AdminSideBar = () => {
    const user = {
        firstname: 'Admin',
        lastname: 'user',
        imageUrl: assets.profile,
    }
    const adminNavlinks = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
        { name: 'Add Shows', path: '/admin?add-show=true', icon: PlusSquareIcon },
        { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
        { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
    ]
    const location = useLocation();

    return (
        <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-white/5 bg-[#0F0F0F] text-sm'>
            <img src={user.imageUrl} className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' />
            <p className='mt-2 text-base max-md:hidden text-white'>{user.firstname} {user.lastname}</p>
            <div className='w-full'>
                {
                    adminNavlinks.map((link, index) => {
                        const isActive = link.name === 'Add Shows'
                            ? new URLSearchParams(location.search).get('add-show') === 'true'
                            : location.pathname === link.path && !location.search;

                        return (
                            <NavLink
                                key={index}
                                to={link.path}
                                end
                                className={`relative flex items-center max-md:justify-center gap-2 w-full py-3 md:pl-10 first:mt-6 text-gray-400 font-medium transition-all ${isActive && 'bg-primary/10 text-primary'}`}
                            >
                                <link.icon className='w-5 h-5' />
                                <p className='max-md:hidden'>{link.name}</p>
                                <span className={`w-1 h-10 right-0 absolute bg-primary transition-all rounded-l-md ${isActive ? 'opacity-100' : 'opacity-0'}`}></span>
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminSideBar