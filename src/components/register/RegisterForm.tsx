"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Asterisk, Sparkle } from "lucide-react";
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
import { useLoading } from "@/hooks";
import { courses } from "@/constants/courses";
import { registerFormSchema, RegisterFormSchema } from "./schema";
import { routes } from "@/constants/routes";
import { createUser } from "@/lib/api";

export default function RegisterForm({
  inDialog = false,
  close,
}: {
  inDialog?: boolean;
  close?: () => void;
}) {
  const router = useRouter();
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      course: courses[0],
      name: "",
      email: "",
    },
  });

  const { startTransition, isLoading, Loading } = useLoading();

  const onSubmit = async (values: RegisterFormSchema) => {
    const today = new Date().toISOString().slice(0, 10);

    try {
      const { status, data } = await startTransition(createUser(values));
      console.log(status, data);
      if (status === 201) {
        toast(`✅ ${data?.name}님 성공적으로 등록되었습니다`, {
          description: today,
        });

        form.reset();

        if (inDialog && close) {
          close();
        } else {
          router.push(routes.USER.WIP);
        }
      }
    } catch (e: unknown) {
      console.error(e);

      toast("⚠️ 문제가 발생하였습니다.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`relative ${
          inDialog
            ? "py-4 max-h-[85dvh] overflow-y-auto sm:overflow-none"
            : "flex flex-col justify-between py-6"
        } space-y-8 w-full h-[calc(100dvh-var(--global-layout-nav-height))]`}
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

            <div className="grid gap-2 pb-40">
              <Label className="font-semibold">경험 여부</Label>
              <div className="flex flex-col gap-6 flex-wrap mt-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="school" />
                  <Label htmlFor="school" className="cursor-pointer">
                    관련 학과(건축학부, 실내디자인과, 공간디자인학과 등)에 재학
                    중이다.
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="work" />
                  <Label htmlFor="work" className="cursor-pointer">
                    건축, 인테리어, 조경, 제품 설계 등에 종사 중이다.
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="certificate" />
                  <Label htmlFor="certificate" className="cursor-pointer">
                    실내건축기사/산업기사/기능사 자격증을 미래에 취득할
                    예정이다.
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="AutoCAD" />
                  <Label htmlFor="AutoCAD" className="cursor-pointer">
                    AutoCAD 기본 그리기 / 편집 명령어를 다룰 줄 안다.
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="AutoCAD drawing" />
                  <Label htmlFor="AutoCAD drawing" className="cursor-pointer">
                    AutoCAD를 활용해 원룸 이상의 건축, 인테리어도 도면을 그려본
                    경험이 있다.
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="modeling" />
                  <Label htmlFor="modeling" className="cursor-pointer">
                    Rhinoceros, SketchUp, Revit, C4D 등 3D 모델링 프로그램을
                    다뤄본 경험이 있다.
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed bottom-0 right-0 left-0 ui-flex-center px-3 pt-3 pb-6 w-full border-t border-gray-100 bg-gray-50 z-10 ${
            inDialog ? "sm:absolute" : "sm:static"
          } sm:p-0`}
        >
          <Button
            type="submit"
            size="icon-lg"
            className="w-full font-semibold cursor-pointer"
          >
            {isLoading ? <Loading className="animate-spin" /> : "등 록"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
