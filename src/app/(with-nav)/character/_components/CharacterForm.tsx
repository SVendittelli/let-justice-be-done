import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  pronouns: z.string().min(1),
  description: z.string().min(1),
  traits: z.tuple([z.string().min(1), z.string().min(1)]),
});
type CharacterForm = z.infer<typeof formSchema>;

export default function CharacterForm() {
  const utils = api.useUtils();
  const create = api.pcs.create.useMutation();

  const form = useForm<CharacterForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pronouns: "",
      description: "",
      traits: ["", ""],
    },
  });

  const submit = (data: CharacterForm) => {
    create.mutate(data, {
      onSuccess: () => {
        utils.pcs.invalidate().catch(console.error);
      },
    });
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
            <FormField
              control={form.control}
              name="traits.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trait 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Author" {...field} />
                  </FormControl>
                  <FormDescription>
                    The first trait your character is famous for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="traits.1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trait 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Old" {...field} />
                  </FormControl>
                  <FormDescription>
                    The second trait your character is famous for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="An elderly woman with a kind face, sensible glasses, and unassuming clothing."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How you&apos;d describe your character in a book.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jessica Fletcher" {...field} />
                  </FormControl>
                  <FormDescription>
                    What people call your character.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
                  <FormControl>
                    <Input placeholder="She/Her" {...field} />
                  </FormControl>
                  <FormDescription>
                    The pronouns your character uses.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={create.isPending}
            >
              {create.isPending && <LoaderCircle className="animate-spin" />}
              Create Character
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
