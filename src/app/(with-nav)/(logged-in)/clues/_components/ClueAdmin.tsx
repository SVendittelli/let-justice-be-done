import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { api, type RouterInputs } from "~/trpc/react";
import { ChevronsUpDown } from "lucide-react";
import ClueForm from "./ClueForm";

type Props = {
  deleteEnabled: boolean;
  onDeleteEnabledChange: (newState: boolean) => void;
};

export default function ClueAdmin({
  deleteEnabled,
  onDeleteEnabledChange,
}: Props) {
  const utils = api.useUtils();
  const create = api.clues.create.useMutation({
    onSuccess: () => utils.clues.invalidate(),
  });

  const onSubmit = (data: RouterInputs["clues"]["create"]) => {
    create.mutate(data);
  };

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
            <ClueForm onSubmit={onSubmit} isPending={create.isPending} />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
