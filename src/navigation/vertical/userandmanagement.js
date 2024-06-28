import { User } from "react-feather"

export default [
    {
        header: 'User Management'
    },
    {
        id: "email@email.com",
        groupMenuId: 2,
        showHeader: true,
        title: window.localStorage.getItem('email'),
        icon: <User size={20} />,
        navLink: '/member'
    }
]