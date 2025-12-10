import { z } from "zod";

type StudentRegisterFormSchema = z.infer<typeof studentRegisterFormSchema>;

type NewsRegisterFormSchema = z.infer<typeof newsRegisterFormSchema>;

const skillsSchema = z.object({
  school: z.boolean(),
  work: z.boolean(),
  certificate: z.boolean(),
  autocad: z.boolean(),
  autocad_drawing: z.boolean(),
  modeling: z.boolean(),
});

const studentRegisterFormSchema = z.object({
  course: z.string({
    required_error: "선택해 주세요",
  }),
  name: z
    .string()
    .regex(/^[가-힣]+$/, { message: "한글만 입력 가능합니다" })
    .min(2, { message: "최소 2글자 이상 입력해 주세요" })
    .max(4, { message: "최대 4글자로 입력해 주세요" }),
  email: z
    .string({ required_error: "이메일을 입력해 주세요" })
    .email({ message: "이메일 형식이 올바르지 않습니다" }),
  skills: skillsSchema,
});

const newsRegisterFormSchema = z.object({
  title: z.string({
    required_error: "제목을 입력해 주세요",
  }),
  link: z.string().regex(/^https:\/\/.+$/, {
    message: "https://로 시작하는 URL만 입력 가능합니다",
  }),
});

export type { NewsRegisterFormSchema, StudentRegisterFormSchema };
export { studentRegisterFormSchema, skillsSchema, newsRegisterFormSchema };
