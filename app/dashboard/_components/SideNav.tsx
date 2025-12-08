"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function SideNav() {
  const menuList = [
    { id: 1, name: "My Forms", icon: LibraryBig, path: "/dashboard" },
    {
      id: 2,
      name: "Response",
      icon: MessageSquare,
      path: "/dashboard/response",
    },
    { id: 3, name: "Analytics", icon: LineChart, path: "/dashboard/analytics" },
    { id: 4, name: "Upgrade", icon: Shield, path: "/dashboard/upgrade" },
  ];

  const path = usePathname();

  useEffect(() => {}, [path]);

  return (
    <div className="h-screen  pt-20 rounded-md   border-l-0  border-4 border-black shadow-[5px_5px_0_#000]">
      <div className="flex flex-col gap-4 p-4">
        {menuList.map((menu) => (
          <Button
            key={menu.id}
            variant="brutalDown"
            className={`flex items-center gap-2 bg-background rounded-lg px-4 py-2 font-bold ${
              path == menu.path && "bg-black text-white shadow-yellow-300"
            }`}
          >
            <menu.icon className="w-5 h-5" />
            {menu.name}
          </Button>
        ))}
      </div>
      <div className="fixed bottom-5 p-4 w-64">
        <Button variant="brutalUp" className="w-full rounded-md">
          Create Form
        </Button>
        <div className="my-7 text-center">
          <Progress value={33} className="h-3 rounded-md" />
          <h2 className="text-sm text-black mt-2">
            <strong>2</strong> out of <strong>3</strong> Form Created
          </h2>
          <h2 className="text-xs text-black mt-2">
            Upgrade your plan for unlimited form creation
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
