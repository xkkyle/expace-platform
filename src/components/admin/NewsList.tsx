"use client";

import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Loading, Button } from "@/components";
import { useOptimisticMutate } from "@/hooks";
import { deleteNews, getNewsList } from "@/lib/api/designthou";
import { getGenericDate } from "@/utils/date";
import { type NewsType } from "@/models/news";

export default function NewsList() {
  const { data: news, isLoading } = useSWR(
    "/api/designthou/news",
    getNewsList,
    {
      revalidateOnMount: true,
    },
  );

  const { optimisticMutate } = useOptimisticMutate();
  console.log(news);

  const remove = async ({ id }: { id: string }) => {
    try {
      await optimisticMutate(
        "/api/designthou/news",
        async (current: NewsType[] = []) => {
          const { status } = await deleteNews({ id });
          if (status !== 200) throw new Error("삭제 실패");
          return current;
        },
        {
          optimisticData: (current: NewsType[] = []) =>
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-3 mt-3 py-3 rounded-lg">
          {news?.map(({ _id, title, link, createdAt }, idx) => (
            <div
              key={`${title}_${idx}`}
              className="flex justify-between items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <Link href={link} target="_blank" className="cursor-pointer">
                <div className="font-semibold">{title}</div>
                <span className="text-gray-600">
                  {getGenericDate(createdAt)}
                </span>
              </Link>
              <Button
                type="button"
                size="icon-sm"
                variant="secondary"
                onClick={() => remove({ id: _id.toString() })}
              >
                {isLoading ? <Loading /> : <X />}
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
