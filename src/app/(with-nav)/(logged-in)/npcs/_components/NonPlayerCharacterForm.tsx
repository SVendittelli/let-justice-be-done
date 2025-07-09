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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const npcSchema = z.object({
  name: z.string().min(1),
  moniker: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["AUTHORITY", "SUSPECT"]),
  imageUrl: z.string().url(),
  imageBlurData: z.string().min(1),
  revealed: z.boolean(),
});
type Npc = z.infer<typeof npcSchema>;

type Props = {
  deleteEnabled: boolean;
  onDeleteEnabledChange: (newState: boolean) => void;
};

export default function NonPlayerCharacterForm({
  deleteEnabled,
  onDeleteEnabledChange,
}: Props) {
  const utils = api.useUtils();
  const create = api.npcs.create.useMutation({
    onSuccess: () => utils.npcs.invalidate(),
  });

  const form = useForm<Npc>({
    resolver: zodResolver(npcSchema),
    defaultValues: {
      name: "",
      moniker: "",
      description: "",
      type: "SUSPECT",
      imageUrl: "",
      imageBlurData: "",
      revealed: false,
    },
  });

  function onSubmit(data: Npc) {
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
                        <Input placeholder="Leonard Clement" {...field} />
                      </FormControl>
                      <FormDescription>The name the NPC.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="moniker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Moniker</FormLabel>
                      <FormControl>
                        <Input placeholder="The Vicar" {...field} />
                      </FormControl>
                      <FormDescription>
                        The job title/notable feature of the NPC.
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
                          placeholder="Faded and indeterminate..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The description of the NPC.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the NPC type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AUTHORITY">Authority</SelectItem>
                          <SelectItem value="SUSPECT">Suspect</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The description of the NPC.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormDescription>Image of the NPC.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageBlurData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Blur Data</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="data:image/png;base64,"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Data URL of the blured image.
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
                        Whether the NPC should be visible to the players yet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create NPC</Button>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
