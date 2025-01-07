'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useAuth } from '@/stores/use-auth';
import { User } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function ProfileDropdown() {
  const { copyToClipboard } = useCopyToClipboard();
  const authStore = useAuth();
  const user = useAuth((state) => state.user);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={'icon'}>
          <User size={25} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => console.log(authStore)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyToClipboard(user?.public_key || 'ERROR')}
          >
            Copy Wallet Address
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="focus:bg-destructive focus:text-destructive-foreground"
          onClick={() => signOut()}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
