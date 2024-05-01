"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { showSuccess } from "@/lib/toast-actions";

const formSchema = z.object({
  currentPersonality: z
    .string()
    .min(20, { message: "最低でも20文字以上の入力が必要です。" })
    .max(400, { message: "400文字以内でお願いします。" }),
  idealPersonality: z
    .string()
    .min(20, { message: "最低でも20文字以上の入力が必要です。" })
    .max(400, { message: "400文字以内でお願いします。" }),
});

const Page = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPersonality: "",
      idealPersonality: "",
    },
  });

  const openDialog = (values: z.infer<typeof formSchema>) => {
    setDialogOpen(true);
  };

  const dialogAction = async () => {
    try {
      console.log(form.getValues());

      showSuccess({ message: "成功！！！" });
    } catch (error) {}

    setDialogOpen(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(openDialog)}
          className="space-y-8 m-4"
        >
          <FormField
            control={form.control}
            name="currentPersonality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-lg pl-1">
                  改善したい性格
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="h-60"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  短期、おっちょこちょい、自分の意見が言えない、など
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idealPersonality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-lg pl-1">
                  理想の性格
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="h-60"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  寛容的、積極的、自分の意見をはっきり言える、など
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
            <AlertDialogTitle className="mb-2">
              こちらで設定します。よろしいですか？
            </AlertDialogTitle>

            <p className="text-left text-lg">改善したい性格</p>
            <Textarea
              className="h-60"
              disabled
              value={form.getValues().currentPersonality}
            />

            <p className="text-left text-lg">理想の性格</p>
            <Textarea
              className="h-60"
              disabled
              value={form.getValues().idealPersonality}
            />
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
