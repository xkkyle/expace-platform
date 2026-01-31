"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Asterisk, Sparkle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Label,
} from "../ui";
import { toast } from "sonner";
import { Loading } from "@/components";
import { UserType } from "@/models/user";
import { createUser } from "@/lib/api";
import { studentRegisterFormSchema, StudentRegisterFormSchema } from "./schema";
import { courses } from "@/constants/courses";
import { routes } from "@/constants/routes";
import { useOptimisticMutate } from "@/hooks";

export default function StudentRegisterForm({
  inDialog = false,
  close,
}: {
  inDialog?: boolean;
  close?: () => void;
}) {
  const router = useRouter();

  const form = useForm<StudentRegisterFormSchema>({
    resolver: zodResolver(studentRegisterFormSchema),
    mode: "onSubmit",
    defaultValues: {
      course: courses[0],
      name: "",
      email: "",
      skills: {
        school: false,
        work: false,
        certificate: false,
        autocad: false,
        autocad_drawing: false,
        modeling: false,
      },
    },
  });

  const { optimisticMutate, isMutating } = useOptimisticMutate();
  const onSubmit = async (values: StudentRegisterFormSchema) => {
    const today = new Date().toISOString().slice(0, 10);

    try {
      await optimisticMutate(
        "/api/users",
        async (current: UserType[] = []) => {
          const { status, data } = await createUser(values);

          if (status !== 201) {
            throw new Error("등록 실패");
          }

          const newUser = data.data;

          return [...current, newUser];
        },
        {
          // optimistic: UI 즉시 반영 (fake user)
          optimisticData: (current: UserType[] = []) => {
            const optimisticUser = {
              ...values,
              _id: "optimistic-" + Date.now(),
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            return [...current, optimisticUser];
          },

          rollbackOnError: true,
          revalidate: false,
        },
      );

      toast.success(`${values.name}님 성공적으로 등록되었습니다`, {
        description: today,
      });

      form.reset();

      if (inDialog && close) {
        close();
      } else {
        router.push(routes.USER.WIP);
      }
    } catch (e) {
      console.error(e);
      toast.error("⚠️ 문제가 발생하였습니다.");
    }
  };

  return (
    <>
      {isMutating && (
        <div className="fixed top-0 left-0 bottom-0 right-0 ui-flex-center w-full h-full bg-white opacity-20 z-20">
          <Loading />
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`relative ${
            inDialog
              ? "py-4 px-1 max-h-[85dvh] overflow-y-auto sm:overflow-none"
              : "flex flex-col justify-between py-3"
          } space-y-8 w-full`}
        >
          <div className="grid gap-8">
            <div className="space-y-2">
              <h2
                className={`${
                  inDialog ? "hidden" : "flex items-center gap-1"
                } text-lg font-bold`}
              >
                <Sparkle size={18} />
                <span>수업자료 공유를 위한 등록</span>
              </h2>
              <p
                className={`${
                  inDialog ? "hidden" : "inline-flex items-center gap-1"
                } py-1.5 px-2 w-fit text-xs bg-blue-50 text-blue-500 rounded-lg`}
              >
                <Asterisk size={14} />
                수업에 활용되었던 수업자료를 등록한 이메일로 보내드립니다.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">코 스</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full cursor-pointer">
                          <SelectValue placeholder="코스 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem
                            key={course}
                            value={course}
                            className="cursor-pointer"
                          >
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">이 름</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="홍길동"
                        {...field}
                        className="min-w-[300px] cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">이메일</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        className="min-w-[300px] cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className={`grid gap-2 ${inDialog ? "pb-40" : "pb-32"}`}>
                <Label className="font-semibold">경험 여부</Label>
                <div className="flex flex-col gap-6 flex-wrap mt-3">
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="skills.school"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              id="school"
                              checked={field.value ?? false}
                              onCheckedChange={(checked) =>
                                field.onChange(!!checked)
                              }
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="school"
                            className="cursor-pointer"
                          >
                            관련 학과(건축학부, 실내디자인과, 공간디자인학과
                            등)에 재학 중이다.
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="skills.work"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              id="work"
                              checked={field.value ?? false}
                              onCheckedChange={(checked) =>
                                field.onChange(!!checked)
                              }
                            />
                          </FormControl>
                          <FormLabel htmlFor="work" className="cursor-pointer">
                            건축, 인테리어, 조경, 제품 설계 등에 종사 중이다.
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="skills.certificate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              id="certificate"
                              checked={field.value ?? false}
                              onCheckedChange={(checked) =>
                                field.onChange(!!checked)
                              }
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="certificate"
                            className="cursor-pointer"
                          >
                            실내건축기사/산업기사/기능사, 전산응용건축제도기능사
                            자격증을 미래에 취득할 예정이다.
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="skills.autocad"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              id="autocad"
                              checked={field.value ?? false}
                              onCheckedChange={(checked) =>
                                field.onChange(!!checked)
                              }
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="autocad"
                            className="cursor-pointer"
                          >
                            AutoCAD 기본 그리기 / 편집 명령어를 다룰 줄 안다.
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="skills.autocad_drawing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              id="autocad_drawing"
                              checked={field.value ?? false}
                              onCheckedChange={(checked) =>
                                field.onChange(!!checked)
                              }
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="autocad_drawing"
                            className="cursor-pointer"
                          >
                            AutoCAD를 활용해 원룸 이상의 건축, 인테리어도 도면을
                            그려본 경험이 있다. (도면을 보고 설명할 수 있다)
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="skills.modeling"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              id="modeling"
                              checked={field.value ?? false}
                              onCheckedChange={(checked) =>
                                field.onChange(!!checked)
                              }
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="modeling"
                            className="cursor-pointer"
                          >
                            Rhinoceros, SketchUp, Revit, C4D 등 3D 모델링
                            프로그램을 다뤄본 경험이 있다.
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`fixed bottom-0 right-0 left-0 ui-flex-center px-3 pt-3 pb-6 w-full border-t border-gray-100 bg-gray-50 z-10 ${
              inDialog ? "sm:absolute" : "sm:absolute"
            } sm:p-0`}
          >
            <Button
              type="submit"
              size="icon-lg"
              className="w-full font-semibold cursor-pointer"
            >
              {isMutating ? <Loading /> : "등 록"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
