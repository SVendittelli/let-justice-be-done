import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
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
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const sceneSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  revealed: z.boolean(),
});
type CrimeScene = z.infer<typeof sceneSchema>;

type Props = {
  deleteEnabled: boolean;
  onDeleteEnabledChange: (newState: boolean) => void;
};

export default function CrimeSceneForm({
  deleteEnabled,
  onDeleteEnabledChange,
}: Props) {
  const utils = api.useUtils();
  const create = api.scenes.create.useMutation({
    onSuccess: () => utils.scenes.invalidate(),
  });

  const form = useForm<CrimeScene>({
    resolver: zodResolver(sceneSchema),
    defaultValues: {
      name: "",
      description: "",
      revealed: false,
    },
  });

  function onSubmit(data: CrimeScene) {
    create.mutate(data);
  }

  return (
    <Card>
      <CardContent>
        <Collapsible>
          <div className="flex items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-2">
              <Switch
                id="showDelete"
                checked={deleteEnabled}
                onClick={() => onDeleteEnabledChange(!deleteEnabled)}
              />
              <Label htmlFor="showDelete">Show Delete</Label>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronsUpDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="The Vicarage" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name the crime scene.
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
                          placeholder="A small, quaint building..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The description of the crime scene.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="revealed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revealed</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Whether the Crime Scene should be visible to the players
                        yet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Crime Scene</Button>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
