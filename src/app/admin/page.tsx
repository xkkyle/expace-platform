import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components";
import { routes } from "@/constants/routes";

export default async function HomePage() {
  return (
    <div className="flex flex-col justify-items-center gap-3 p-4 pb-20 bg-white">
      <div className="p-12 text-white font-semibold bg-gray-400 rounded-lg">
        <p>This is a dashboard</p>
        <p>Still Work In Progress ⚡️</p>
      </div>
      <div className="grid grid-rows-2 gap-3 mt-3 w-full md:grid-cols-2">
        <Button asChild variant="secondary" size="icon-lg" className="w-full">
          <Link href={routes.ADMIN.ACADEMY}>
            <ArrowUpRight size={18} />
            Academy Register List
          </Link>
        </Button>
        <Button asChild variant="secondary" size="icon-lg" className="w-full">
          <Link href={routes.ADMIN.DESIGNTHOU.NEWS}>
            <ArrowUpRight size={18} />
            Designthou News
          </Link>
        </Button>
      </div>
    </div>
  );
}
