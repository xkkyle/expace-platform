"use client";

import React from "react";
import { Box, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components";
import { useLoading } from "@/hooks";
import { deleteUser, fetchUsers } from "@/lib/api";
import { Course } from "@/constants/courses";
import { UserType } from "@/models/user";

interface StudentListProps {
  currentCourse: Course;
}

export default function StudentList({ currentCourse }: StudentListProps) {
  const { startTransition, isLoading, Loading } = useLoading();
  const [students, setStudents] = React.useState<UserType[]>([]);

  const getUsers = async () => {
    try {
      const data = await startTransition(fetchUsers());

      setStudents(
        data.filter((user: UserType) => user.course === currentCourse)
      );
    } catch (e) {
      console.error(e);
      setStudents([]);
    }
  };

  const remove = async ({ id }: { id: string }) => {
    try {
      const { data, status } = await startTransition(deleteUser({ id }));

      if (status === 200) {
        setStudents(
          students.filter((user: UserType) => user._id.toString() !== id)
        );
        toast.success(data.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }

      console.error(e);
    }
  };

  React.useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCourse]);

  return (
    <div className="min-h-[150px] w-full">
      {isLoading ? (
        <div className="ui-flex-center min-h-0 flex-1 h-[50dvh]">
          <Loading className="animate-spin" size={18} />
        </div>
      ) : (
        <>
          {students?.length === 0 ? (
            <div className="ui-flex-center gap-2 min-h-[60dvh] mt-4 w-full bg-gradient-gray-100 font-medium text-lg text-gray-600 rounded-lg">
              <Box size={18} /> <span>Empty Data</span>
            </div>
          ) : (
            <ul className="flex flex-col gap-3 mt-8 w-full">
              <li className="flex gap-3 px-3 font-bold">
                <div className="min-w-[50px] sm:min-w-[100px]">Name</div>
                <div className="min-w-[50px] sm:min-w-[100px]">Email</div>
              </li>
              {students?.map((student) => (
                <li
                  key={student._id.toString()}
                  className="flex justify-between items-center gap-3 p-3 border border-gray-100 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="min-w-[50px] sm:min-w-[100px] font-medium">
                      {student.name}
                    </div>
                    <div className="min-w-[50px] sm:min-w-[100px]">
                      {student.email}
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="secondary"
                    onClick={() => remove({ id: student._id.toString() })}
                  >
                    {isLoading ? <Loading /> : <X />}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
