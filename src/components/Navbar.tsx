import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react";
import Image from "next/image";
import { useSession } from 'next-auth/react';
const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className=" flex justify-between">
<div className="">

</div>
    <div className=" flex justify-center items-center gap-10">
      <div className="">
    <DropdownMenu>
  <DropdownMenuTrigger>
    <Bell/>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-60">
    <DropdownMenuLabel >Notification</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</div>
<div className="">
<DropdownMenu>
  <DropdownMenuTrigger className="">
    <Image src={'https://utfs.io/f/642bc413-f070-4995-9884-011c2264a494-byglya.png'} alt="test image" width={100} height={100} className="h-10 w-10 rounded-full"/>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-60">
    <DropdownMenuLabel className="text-xl">{session?.user.UserName}
    <p className="text-[10px]">{session?.user.role}</p>
    </DropdownMenuLabel>
    
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</div>
    </div>
    </div>
  );
};

export default Navbar;
