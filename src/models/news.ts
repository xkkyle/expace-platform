import { z } from "zod";

type NewsType = z.infer<typeof newsSchema>;

const newsSchema = z.object({
  _id: z.string().length(36),
  title: z.string({
    required_error: "제목을 입력해 주세요",
  }),
  link: z
    .string()
    .regex(/^https:\/\/.+$/, {
      message: "https://로 시작하는 URL만 입력 가능합니다",
    }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type { NewsType };
export { newsSchema };
