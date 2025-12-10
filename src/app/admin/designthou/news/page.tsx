import { Suspense } from "react";
import { NewsList, NewsRegisterDialog, Loading } from "@/components";

export default async function DesignthouNewsPage() {
  return (
    <section className="px-3 py-3 h-screen">
      <div className="sticky top-0 flex justify-between items-center mb-0 w-full bg-white sm:mb-3">
        <h2 className="text-base font-bold">News List</h2>
        <NewsRegisterDialog />
      </div>
      <Suspense fallback={<Loading />}>
        <NewsList />
      </Suspense>
    </section>
  );
}
