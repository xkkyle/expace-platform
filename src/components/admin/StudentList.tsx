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

const questions = {
  school: "관련 학과(건축학부, 실내디자인과, 공간디자인학과 등)에 재학 중이다.",
  work: "건축, 인테리어, 조경, 제품 설계 등에 종사 중이다.",
  certificate: "실내건축기사/산업기사/기능사 자격증을 미래에 취득할 예정이다.",
  autocad: "AutoCAD 기본 그리기 / 편집 명령어를 다룰 줄 안다.",
  autocad_drawing:
    " AutoCAD를 활용해 원룸 이상의 건축, 인테리어도 도면을 그려본 경험이 있다.",
  modeling:
    " Rhinoceros, SketchUp, Revit, C4D 등 3D 모델링 프로그램을 다뤄본 경험이 있다.",
};

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
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="min-w-[50px] sm:min-w-[100px]  font-bold">
                        {student.name}
                      </div>
                      <div className="min-w-[50px] sm:min-w-[100px] font-bold">
                        {student.email}
                      </div>
                    </div>
                    <ul className="">
                      {Object.entries(student.skills).map(([name, value]) => (
                        <li
                          key={name}
                          className="flex justify-between items-center gap-6"
                        >
                          <span className="">
                            {questions[name as keyof typeof questions]}
                          </span>

                          <span className="font-bold">
                            {value ? "yes" : "no"}
                          </span>
                        </li>
                      ))}
                    </ul>
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
