"use client";

import React from "react";
import axios from "axios";
import { UserType } from "@/models/user";
import { Loading } from "../loader";

export default function NewsList() {
  const [news, setNews] = React.useState<UserType[]>([]);
  const [isLoading, setLoading] = React.useState(false);

  const getNews = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<UserType[]>("/api/designthou/news");
      setNews(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-3 mt-3 py-3 px-3 bg-gray-50 rounded-lg">
          {news?.map((item, idx) => (
            <div
              key={`${item.name}_${idx}`}
              className="flex items-center gap-3"
            >
              <div>{item.name}</div>
              <div key={item.name}>{item.email}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
