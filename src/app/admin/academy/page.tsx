import { AcademyRegisterDialog, StudentListWithTrigger } from "@/components";

export default async function AdminPage() {
  return (
    <section className="px-4 pb-4 h-screen">
      <div className="sticky top-0 flex justify-between items-center mb-0 py-3 w-full bg-white sm:mb-3">
        <h2 className="text-base font-bold">수강생 리스트</h2>
        <AcademyRegisterDialog />
      </div>
      <StudentListWithTrigger />
    </section>
  );
}
