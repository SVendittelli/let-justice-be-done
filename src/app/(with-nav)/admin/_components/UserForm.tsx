import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import type { RouterOutputs } from "~/trpc/react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  ids: z.array(z.string().cuid2()),
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  users: RouterOutputs["users"]["getAll"];
  onSubmit: (data: FormSchema) => void;
};

export function UserForm({ users, onSubmit }: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ids: users.filter(({ enabled }) => enabled).map(({ id }) => id),
    },
  });

  return (
    <Form {...form}>
      <div className="mb-2 flex gap-2">
        <Button
          onClick={() =>
            form.setValue(
              "ids",
              users.map(({ id }) => id),
            )
          }
        >
          Select All
        </Button>
        <Button onClick={() => form.setValue("ids", [])}>Select None</Button>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="ids"
          render={() => (
            <FormItem>
              {users.map((user) => (
                <FormField
                  key={user.id}
                  control={form.control}
                  name="ids"
                  render={({ field }) => (
                    <FormItem
                      key={user.id}
                      className="flex flex-row items-center gap-2"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(user.id)}
                          onCheckedChange={(checked) =>
                            checked
                              ? field.onChange([...field.value, user.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== user.id,
                                  ),
                                )
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {user.name}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2">
          Enable
        </Button>
      </form>
    </Form>
  );
}
