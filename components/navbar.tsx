import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarColor } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, SettingsIcon } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

type NavbarProps = {
  className?: string;
};

export const Navbar = () => {
  const { user } = useAuthContext();

  const avatarColor = user && getAvatarColor(user.displayName)
  const userInitial = user?.displayName ? user.displayName.charAt(0).toUpperCase() : ''

  console.log(user)

  return (
    <div className="flex justify-start content-stretch flex-col py-2">      
      <Button 
        variant="ghost" 
        size="icon" 
        >
          <Home className="w-6 h-6" />
      </Button>
      <Settings />
      <div className="mt-auto">        
        <Avatar>
          {user?.photoURL ? <AvatarImage src={user.photoURL} /> : null}
          <AvatarFallback className={`${avatarColor} dark:${avatarColor}`}>{userInitial}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

const Settings = () => {
  return(
    <Sheet>
      <SheetTrigger>
        <Button 
        variant="ghost" 
        size="icon" 
        >
          <SettingsIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
        <SheetHeader>        
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <div className="p4">
          <p>Sheet stuff</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}