import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { auth } from "~/server/auth";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  const originalDate = new Date();
  originalDate.setUTCHours(2, 37, 15);
  const fwdDate = new Date();
  fwdDate.setUTCHours(4, 36, 44);

  return (
    <main className="flex min-h-dvh justify-center bg-white p-2 sm:p-8 dark:bg-[#222222]">
      <div className="prose text-black dark:text-white">
        <h2 className="text-black dark:text-white">
          Fwd: Request for consultation [TCOTLR]
        </h2>
        <Collapsible>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                className="not-prose bg-[#dddddd]"
                src="/avatar.svg"
              />
              <AvatarFallback className="bg-[#dddddd] text-black">
                PD
              </AvatarFallback>
            </Avatar>
            <span>
              <div>
                <b>Pam Das</b>{" "}
                {Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(
                  fwdDate,
                )}
              </div>
              <div>
                <CollapsibleTrigger className="flex items-center">
                  to me <ChevronDown size={16} />
                </CollapsibleTrigger>
              </div>
            </span>
          </div>
          <CollapsibleContent>
            <div className="rounded-sm border-2 border-[#dddddd] p-2">
              <b>From:</b> Pam Das &lt;pam.das@cda.co.uk&gt;
              <br />
              <b>To:</b> consultants@cda.co.uk
              <br />
              <b>Date:</b>{" "}
              {Intl.DateTimeFormat(undefined, {
                dateStyle: "full",
                timeStyle: "long",
              }).format(fwdDate)}
            </div>
          </CollapsibleContent>
        </Collapsible>
        <p>
          Vaughn needs a call-out again, sounds like a high profile one...
          Anyone available for an out-of-hours consult?
        </p>
        <p>Pam x</p>
        <hr />
        <p>
          -----Forwarded Message-----
          <br />
          <b>From:</b> Holden Vaughn &lt;h.vaughn@met.police.uk&gt;
          <br />
          <b>Sent:</b>{" "}
          {Intl.DateTimeFormat(undefined, {
            dateStyle: "full",
            timeStyle: "long",
          }).format(originalDate)}
          <br />
          <b>To:</b> enquiries@cda.co.uk
          <br />
          <b>Subject:</b> Request Request for consultation [TCOTLR]
          <br />
        </p>
        <p>Hi Pam,</p>
        <p>
          I know its late but I&apos;ve got an urgent one, just hit my desk. I
          am on my way now but from the call I need a team. We need a solve
          before it hits the press, whatever the rate is the department&apos;s
          got it covered.
        </p>
        <p>Get your best there ASAP.</p>
        <p>
          The Penthouse
          <br />
          One, Hyde Park
          <br />
          100 Knightsbridge
          <br />
          London
          <br />
          SW1X 7LJ
        </p>
        <p>Thanks, Holden</p>
        <div className="flex items-center gap-2">
          <Image
            src="/met-logo.svg"
            alt="Metropolitan Police Logo"
            height={100}
            width={100}
          />
          <span>
            <b>Lead Detective Holden Vaughn</b>
            <br />
            Murder Squad
            <br />
            Scotland Yard
            <br />
            Metropolitan Police
          </span>
        </div>
        <div className="flex justify-center">
          <Link href={session ? "/" : "/api/auth/signin"}>
            <Button size="lg">Accept the case</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
