import {
    IconBrowserCheck, IconHelp,
    IconLayoutDashboard, IconLockAccess, IconNotification, IconPalette, IconSettings,
    IconTool,
    IconUserCog
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
    user: {
        name: 'joe smith',
        email: 'joe@gmail.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Shadcn Admin',
            logo: Command,
            plan: 'Vite + ShadcnUI',
        },
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
    ],
    navGroups: [
        {
            title: 'General',
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard',
                    icon: IconLayoutDashboard,
                }

            ],
        },
        {
            title: 'Main',
            items: [
                {
                    title: 'Chats',
                    icon: IconLockAccess,
                    items: [
                        {
                            title: 'Create New',
                            url: '/chat',
                        },
                        {
                            title: 'Sending SOL to gupta ji',
                            url: '/chat/1',
                        },
                        {
                            title: 'Sending SOL to sharma ji',
                            url: '/chat/2',
                        },
                        {
                            title: 'Swaping SOL with USDC',
                            url: '/chat/3',
                        },
                        {
                            title: 'Buying SOL with USDC',
                            url: '/chat/4',
                        },
                    ],
                },

            ],
        },
        {
            title: 'Other',
            items: [
                {
                    title: 'Settings',
                    icon: IconSettings,
                    items: [
                        {
                            title: 'Profile',
                            url: '/settings',
                            icon: IconUserCog,
                        },
                        {
                            title: 'Account',
                            url: '/settings/account',
                            icon: IconTool,
                        },
                        {
                            title: 'Appearance',
                            url: '/settings/appearance',
                            icon: IconPalette,
                        },
                        {
                            title: 'Notifications',
                            url: '/settings/notifications',
                            icon: IconNotification,
                        },
                        {
                            title: 'Display',
                            url: '/settings/display',
                            icon: IconBrowserCheck,
                        },
                    ],
                },
                {
                    title: 'Help Center',
                    url: '/help-center',
                    icon: IconHelp,
                },
            ],
        },
    ],
}
