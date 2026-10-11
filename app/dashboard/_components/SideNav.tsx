"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { OPEN_CREATE_EVENT } from "./CreateForm";
import { useFormUsage } from "./FormUsageProvider";

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

export function MobileNav() {
  const path = usePathname();
  const { openUpgrade } = useFormUsage();

  return (
    <nav className="md:hidden flex gap-3 overflow-x-auto px-4 py-3 border-b-2 border-black">
      {menuList
        .filter((menu) => menu.id <= 2)
        .map((menu) => (
          <Link key={menu.id} href={menu.path} className="shrink-0">
            <Button
              variant="brutalDown"
              className={`flex items-center gap-2 bg-background rounded-lg px-4 py-2 font-bold ${
                path === menu.path && "bg-black text-white shadow-yellow-300"
              }`}
            >
              <menu.icon className="w-5 h-5" />
              {menu.name}
            </Button>
          </Link>
        ))}
      <Button
        variant="brutalDown"
        onClick={() => openUpgrade()}
        className="shrink-0 flex items-center gap-2 bg-background rounded-lg px-4 py-2 font-bold"
      >
        <Shield className="w-5 h-5" />
        Upgrade
      </Button>
    </nav>
  );
}

function SideNav() {
  const path = usePathname();
  const { count, limit, openUpgrade } = useFormUsage();

  useEffect(() => {}, [path]);

  return (
    <div className="h-full pt-4 rounded-md   border-l-0  border-4 border-black shadow-[5px_5px_0_#000]">
      <div className="flex flex-col gap-4 p-4">
        {menuList.map((menu) => (
          <div key={menu.id} className="w-full flex flex-col gap-1">
            {menu.id === 4 ? (
              <Button
                variant="brutalDown"
                onClick={() => openUpgrade()}
                className="flex items-center gap-2 bg-background w-full rounded-lg px-4 py-2 font-bold"
              >
                <menu.icon className="w-5 h-5" />
                {menu.name}
              </Button>
            ) : menu.id > 2 ? (
              <Button
                disabled
                title="Comming Soon"
                variant="brutalDown"
                className="flex items-center gap-2 bg-background w-full rounded-lg px-4 py-2 font-bold cursor-not-allowed opacity-50"
              >
                <menu.icon className="w-5 h-5" />
                {menu.name}
              </Button>
            ) : (
              <Link href={menu.path} className="w-full">
                <Button
                  variant="brutalDown"
                  className={`flex items-center gap-2 bg-background w-full rounded-lg px-4 py-2 font-bold ${
                    path === menu.path &&
                    "bg-black text-white shadow-yellow-300"
                  }`}
                >
                  <menu.icon className="w-5 h-5" />
                  {menu.name}
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-5 p-4 w-64">
        <Button
          variant="brutalUp"
          className="w-full rounded-md"
          onClick={() => window.dispatchEvent(new Event(OPEN_CREATE_EVENT))}
        >
          Create Form
        </Button>
        <div className="my-7 text-center">
          <Progress
            value={((count ?? 0) / limit) * 100}
            className="h-3 rounded-md"
          />
          <h2 className="text-sm text-black mt-2">
            <strong>{count ?? "-"}</strong> out of <strong>{limit}</strong> Form
            Created
          </h2>
          <button
            type="button"
            onClick={() => openUpgrade()}
            className="text-xs text-black mt-2 underline cursor-pointer"
          >
            Upgrade your plan for unlimited form creation
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
