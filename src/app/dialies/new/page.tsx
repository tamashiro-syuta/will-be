"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import moment from "moment";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { showSuccess } from "@/lib/toast-actions";
import { createRenewalDiary } from "@/app/actions";
import { useLiff } from "@/components/custom/provider/LiffProvider";

const formSchema = z.object({
  text: z
    .string()
    .min(20, {
      message: "最低でも20文字以上の入力が必要です。",
    })
    .max(400, {
      message: "日記は400文字以内でお願いします。",
    }),
});

const Page = () => {
  const { liff } = useLiff();
  const [dialogOpen, setDialogOpen] = useState(false);
  const today = moment().format("YYYY年 MM月 DD日");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    setDialogOpen(true);
  };

  const dialogAction = async () => {
    try {
      const renewalDiary = await createRenewalDiary(form.getValues().text);

      console.log(renewalDiary);
      showSuccess({ message: "成功！！！" });
    } catch (error) {}

    setDialogOpen(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-lg pl-1">
                  {today}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="h-60"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  今日あった出来事を記録しましょう。AIが理想のあなたになりきって変換します。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="fixed inset-x-0 bottom-0 p-4 bg-white">
            <Button type="submit" className="bg-primary w-full shadow-lg">
              記録
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={dialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              こちらで日記を記録してもよいですか？
            </AlertDialogTitle>
            <AlertDialogDescription>
              ※ 一度、記録すると変更はできません。
            </AlertDialogDescription>
            <Textarea className="h-60" disabled value={form.getValues().text} />
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row space-x-2">
            <AlertDialogAction
              onClick={() => setDialogOpen(false)}
              className="basis-1/2 bg-gray-100 text-gray-800"
            >
              戻る
            </AlertDialogAction>
            <AlertDialogAction onClick={dialogAction} className="basis-1/2">
              記録
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Page;
