"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Sparkle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Loading,
} from "@/components";
import { newsRegisterFormSchema, type NewsRegisterFormSchema } from "./schema";
import { routes } from "@/constants/routes";
import { useOptimisticMutate } from "@/hooks";
import { createNews } from "@/lib/api/designthou";
import { NewsType } from "@/models/news";

export default function NewsRegisterForm({
  inDialog = false,
  close,
}: {
  inDialog?: boolean;
  close?: () => void;
}) {
  const router = useRouter();

  const form = useForm<NewsRegisterFormSchema>({
    resolver: zodResolver(newsRegisterFormSchema),
    defaultValues: {
      title: "",
      link: "",
    },
  });

  const { optimisticMutate, isMutating } = useOptimisticMutate();
  const onSubmit = async (values: NewsRegisterFormSchema) => {
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);
    try {
      await optimisticMutate(
        "/api/designthou/news",
        async (current: NewsType[] = []) => {
          const { status, data } = await createNews(values);

          if (status !== 201) {
            throw new Error("등록 실패");
          }

          const news = data.data;

          return [...current, news];
        },
        {
          // optimistic: UI 즉시 반영 (fake user)
          optimisticData: (current: NewsType[] = []) => {
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

      toast.success(`새로운 뉴스가 성공적으로 등록되었습니다`, {
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
          <div className="grid gap-8 pb-8">
            <div className={`${inDialog ? "hidden" : "block"} space-y-2`}>
              <h2
                className={`${
                  inDialog ? "hidden" : "flex items-center gap-1"
                } text-lg font-bold`}
              >
                <Sparkle size={18} />
                <span>뉴스 등록</span>
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="제목을 입력하세요"
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
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://designthou.com"
                        {...field}
                        className="min-w-[300px] cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
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
