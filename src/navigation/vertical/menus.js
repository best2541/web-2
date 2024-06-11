import { User, Gift, Send, Mail, MessageSquare, Sliders, Rss, FileText, GitPullRequest} from "react-feather"

export default [
    {
        header: 'Member'
    },
    {
        id: "Accounts",
        groupMenuId: 1,
        showHeader: true,
        title: "Accounts",
        icon: <User size={20} />,
        navLink: '/accounts'
    },
    {
        id: "Credit",
        groupMenuId: 1,
        showHeader: true,
        title: "Credit",
        icon: <Gift size={20} />,
        navLink: '/credit'
    },
    {
        id: "Gateway",
        groupMenuId: 1,
        showHeader: true,
        title: "Gateway",
        icon: <Send size={20} />,
        navLink: '/gateway'
    },
    {
        id: "Sender",
        groupMenuId: 1,
        showHeader: true,
        title: "Sender",
        icon: <Mail size={20} />,
        navLink: '/sender'
    },
    {
        id: "Connection",
        groupMenuId: 1,
        showHeader: true,
        title: "Connection",
        icon: <Rss size={20} />,
        navLink: '/connection'
    },
    {
        id: "RequestSender",
        groupMenuId: 1,
        showHeader: true,
        title: "Request Sender",
        icon: <MessageSquare size={20} />,
        navLink: '/requestsender'
    },
    {
        id: "FTPConfig",
        groupMenuId: 1,
        showHeader: true,
        title: "FTP Config",
        icon: <GitPullRequest size={20} />,
        navLink: '/ftpconfig'
    },
    {
        id: "ConfigBilling",
        groupMenuId: 1,
        showHeader: true,
        title: "Config Billing",
        icon: <FileText size={20} />,
        navLink: '/configbilling'
    }
]