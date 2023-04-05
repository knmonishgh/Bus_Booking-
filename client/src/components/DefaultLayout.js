import React from 'react'
import '../resources/layout.css'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';



function DefaultLayout({ children }) {
    const navigate= useNavigate();
    const [collapsed,setCollapsed]=React.useState(false);
    const {user}=useSelector(state => state.users)
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-line'
        },
        {
            name: 'Bookings',
            path: '/bookings',
            icon: 'ri-file-list-3-line'
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'ri-user-3-line'
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: 'ri-logout-box-r-line'
        }

    ]
    const adminMenu = [
        {
            name: 'Home',
            path: '/admin',
            icon: 'ri-home-line'
        },
        {
            name: 'Buses',
            path: '/admin/buses',
            icon: 'ri-bus-fill'
        },
        {
            name: 'Users',
            path: '/admin/users',
            icon: 'ri-user-3-line'
        },
        {
            name: 'Bookings',
            path: '/admin/bookings',
            icon: 'ri-file-list-3-line'
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: 'ri-logout-box-r-line'
        }

    ]
    const menuToBeRendered = user?.isAdmin ? adminMenu: userMenu;
    const activeRoute=window.location.pathname;
    return (
        <div className='layout-parent'>
            <div className='body'>
                <div className='header'>
                    <div className='subheader'>
                        <h1 className='logo'>TravelSwift</h1>
                        <h1 className="role">Name : {user?.name} <br />Role : {user?.isAdmin ? 'Admin' : 'User'}</h1>
                    </div>
                    <div className='d-flex flex-row gap-3 justify-content-start menu'>
                        {menuToBeRendered.map((item, index) => {
                            return (
                                 <div className={`${activeRoute===item.path && 'active-menu-item'} menu-item`}>
                            <i className={item.icon}></i>
                            <span 
                               onClick={()=>{
                                navigate(item.path);
                              }}
                                >
                                {item.name}</span>
                            </div>
                        );
                        })}
                    </div>
                </div>
                <div className='content'>{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout;