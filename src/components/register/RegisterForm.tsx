"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
        className={`${inDialog ? "py-4" : "py-8 sm:py-36"} space-y-8`}
      >
        <h2 className={`${inDialog ? "hidden" : "block"} text-lg font-bold`}>
          📋 수업자료 공유를 위한 등록
        </h2>
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>코 스</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormLabel>이 름</FormLabel>
              <FormControl>
                <Input
                  placeholder="홍길동"
                  {...field}
                  className="min-w-[300px] cursor-pointer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  className="min-w-[300px] cursor-pointer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full font-semibold cursor-pointer"
        >
          {isLoading ? <Loading className="animate-spin" /> : "등록"}
        </Button>
      </form>
    </Form>
  );
}
