import Link from "next/link";
import { Button } from "@/components/ui";
import { routes } from "@/constants/routes";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-center items-center my-0 mx-auto w-full border-b border-gray-100 z-10">
      <div className="flex justify-between items-center px-3 min-w-[300px] min-h-14 w-full border-l border-r border-gray-100 bg-gray-50 sm:max-w-[800px] sm:bg-white">
        <h1 className="flex justify-center items-center text-lg font-black font-mono rounded-lg border border-gray-50 hover:bg-gray-50 hover:border-gray-100 transition-colors cursor-pointer sm:border-white">
          <Link href={routes.USER.ROOT} className="py-1.5 px-1.5 w-full">
            expace
          </Link>
        </h1>

        <Button
          type="button"
          variant="default"
          size="sm"
          className="font-semibold"
          asChild
        >
          <Link href={routes.USER.REGISTER}>Register</Link>
        </Button>
      </div>
    </nav>
  );
}
