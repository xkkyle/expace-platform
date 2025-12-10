"use client";

import React from "react";
import useSWR, { useSWRConfig } from "swr";
import { Box, X } from "lucide-react";
import { toast } from "sonner";
import { Button, Loading } from "@/components";
import { useOptimisticMutate } from "@/hooks";
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
  const { data, isLoading } = useSWR("/api/users", fetchUsers, {
    revalidateOnMount: true,
  });

  const { optimisticMutate, isMutating } = useOptimisticMutate();

  const students = data?.filter((student) => student.course === currentCourse);

  const remove = async ({ id }: { id: string }) => {
    try {
      await optimisticMutate(
        "/api/users",
        async (current: UserType[] = []) => {
          const { status } = await deleteUser({ id });
          if (status !== 200) throw new Error("삭제 실패");
          return current;
        },
        {
          optimisticData: (current: UserType[] = []) =>
            current.filter((u) => u._id.toString() !== id),

          // 2) 서버 요청 실패 시 캐시 롤백
          rollbackOnError: true,

          // 3) 서버 통신 후 데이터 재검증
          revalidate: true,
        },
      );

      toast.success("삭제되었습니다.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    }
  };

  return (
    <div className="pb-3 min-h-[150px] w-full">
      <>
        {isLoading || isMutating ? (
          <div className="ui-flex-center min-h-0 flex-1 h-[60dvh]">
            <Loading />
          </div>
        ) : (
          <>
            {students?.length === 0 ? (
              <div className="ui-flex-center gap-2 min-h-[60dvh] mt-4 w-full bg-gradient-gray-100 font-medium text-lg text-gray-600 rounded-lg">
                <Box size={18} /> <span>Empty Data</span>
              </div>
            ) : (
              <ul className="flex flex-col gap-3 mt-3 w-full">
                <li className="flex gap-3 py-1.5 px-3 font-bold border border-gray-100 rounded-lg">
                  <div className="min-w-[50px] sm:min-w-[100px]">Name</div>
                  <div className="min-w-[50px] sm:min-w-[100px]">Email</div>
                </li>
                {students?.map(({ _id, name, email, skills }) => (
                  <li
                    key={_id.toString()}
                    className={`relative flex flex-col gap-3 p-3 border border-gray-100 rounded-lg`}
                  >
                    <div className="col-span-2 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="min-w-[50px] sm:min-w-[100px]  font-bold">
                          {name}
                        </div>
                        <div className="min-w-[50px] sm:min-w-[100px] font-bold">
                          {email}
                        </div>
                      </div>
                      <ul className="flex flex-col gap-2 w-full">
                        {Object.entries(skills).map(([name, value], idx) => (
                          <li
                            key={name}
                            className="flex justify-between items-center gap-6"
                          >
                            <div className="flex items-center gap-2">
                              <span className="inline-flex justify-center items-center w-4 h-4 text-sm text-gray-600 border border-gray-300 rounded-full min-w-4">
                                {idx + 1}
                              </span>
                              <span
                                className={`${value ? "font-semibold underline" : "text-gray-600 font-normal"}`}
                              >
                                {questions[name as keyof typeof questions]}
                              </span>
                            </div>
                            <span
                              className={`${value ? "text-black font-bold " : "text-gray-600 font-normal"}`}
                            >
                              {value ? "yes" : "no"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="absolute top-2 right-2 flex justify-end ">
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="secondary"
                        onClick={() => remove({ id: _id.toString() })}
                      >
                        {isLoading ? <Loading /> : <X />}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </>
    </div>
  );
}
