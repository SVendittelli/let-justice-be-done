import { Card, CardContent } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  ChevronsUpDown,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Ellipsis,
} from "lucide-react";
import ClueTooltip from "./_component/ClueTooltip";
import CollaborateTooltip from "./_component/CollaborateTooltip";
import ComplicationTooltip from "./_component/ComplicationTooltip";
import ConsultantTooltip from "./_component/ConsultantTooltip";
import CrimeSceneTooltip from "./_component/CrimeSceneTooltip";
import ElucidateTooltip from "./_component/ElucidateTooltip";
import FabricateTooltip from "./_component/FabricateTooltip";
import InterrogateTooltip from "./_component/InterrogateTooltip";
import InvestigateTooltip from "./_component/InvestigateTooltip";
import MoveTooltip from "./_component/MoveTooltip";
import RollResultTooltip from "./_component/RollResultTooltip";
import SuspectTooltip from "./_component/SuspectTooltip";
import SuspicionTooltip from "./_component/SuspicionTooltip";
import TheAuthorityTooltip from "./_component/TheAuthorityTooltip";
import TraitsTooltip from "./_component/TraitsTooltip";
import UndertakeTooltip from "./_component/UndertakeTooltip";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="prose !prose-invert">
        <h1>Rules</h1>
      </div>
      <Card>
        <CardContent className="prose">
          <h2 id="making-a-consultant">Making a Consultant</h2>
          <h3>Who Are You?</h3>
          <p>
            You are a world-famous consulting detective in a world where figures
            like Sherlock Holmes, Jane Marple, and Sam Spade are plentiful and
            beloved. Anyone on the street can name their favorite sleuth and
            describe the latest impossible crime they solved. It&apos;s all over
            the news, late night talk shows, true crime podcasts, and the
            non-fiction section of airport bookstores.
          </p>
          <p>
            The police, relieved as always to collect overtime pay without doing
            the work, freely hire such individuals to help out with any and all
            crimes they struggle with. They know full-well that if any mistake
            is made, those amateur detectives will take the brunt of the blame.
          </p>
          <p>
            You, however, belong to the reputable{" "}
            <i>Consulting Detective Agency</i>, along with several notable
            sleuths who you&apos;ll work with during this mystery.
          </p>
          <h3 id="traits">Traits</h3>
          <p>
            Your character has two famous <TraitsTooltip linkText="Traits" />{" "}
            that are widely known that you can use at any time to get extra dice
            on a roll. Like so many things in this job, whether these are true
            or not is entirely immaterial. These traits may include:
          </p>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2">
              <b>Trait List</b> <ChevronsUpDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="font-bold">
                <li>Reformed Criminal</li>
                <li>Doctor</li>
                <li>Masked</li>
                <li>Reformed Cop</li>
                <li>Priest/Nun</li>
                <li>Master of Disguise</li>
                <li>Spirit Medium</li>
                <li>Author</li>
                <li>Soldier</li>
                <li>Rich</li>
                <li>Scientist</li>
                <li>“Coward”</li>
                <li>Working Class</li>
                <li>Recovering Addict</li>
                <li>Encyclopaedic Mind</li>
                <li>Old</li>
                <li>[BLANK] Expert</li>
                <li>Child</li>
                <li>Migrant</li>
                <li>Lie Detector</li>
                <li>“Corruptible”</li>
                <li>Reformed Magician</li>
                <li>Perfect Memory</li>
                <li>“Incompetent”</li>
                <li>Amateur</li>
                <li>Mind Reader</li>
                <li>Animal Whisperer</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
          <p>
            You may also come up with your own, so long as it&apos;s something
            that will help you know where to look, convince people to talk, or
            create evidence where there is none.
          </p>
          <h3>Description</h3>
          <p>
            This is how they&apos;d describe your character in a book. It
            doesn&apos;t have to take in every detail about them, just the
            important ones. The particular glasses on the edge of their nose.
            Their dirty beige coat. The care they take in maintaining their
            mustache. The lipstick they apply to take people&apos;s eyes away
            from their bad teeth. The way they look rather pleasantly like a
            blond satan.
          </p>
          <h3>Name & Pronouns</h3>
          <p>
            There are three schools of thought when it comes to Names: You can
            have a name that you could hear every day (Sam Spade, Jane Marple,
            Patrick Jane, Jessica Fletcher…), the strangest name you&apos;ve
            ever heard (Sherlock Holmes, Ellery Queen, Nero Wolfe, Benoit
            Blanc…) or no name at all (The Continental Op, The Second Mrs de
            Winter, um… others…)
          </p>
          <p>Same goes for Pronouns.</p>
          <h2>Taking an Action</h2>
          <h3>Describe your Action</h3>
          <p>
            Start by describing vaguely what you would like to do. For instance,
            you can decide to try to provoke a <SuspectTooltip /> into revealing
            a <ClueTooltip /> about another <SuspectTooltip />.
          </p>
          <h3>Determine Move</h3>
          <p>
            Then, the GM will figure out which kind of <MoveTooltip /> it will
            be (either <InvestigateTooltip />, <InterrogateTooltip />,{" "}
            <FabricateTooltip />, or <UndertakeTooltip />
            ). Most <MoveTooltip linkText="Moves" /> function the same, but
            doing badly at a <FabricateTooltip /> roll will increase{" "}
            <SuspicionTooltip /> and even successfully completing an{" "}
            <UndertakeTooltip /> roll will not get you a <ClueTooltip />.
          </p>
          <p>
            If the action doesn&apos;t fit the <MoveTooltip /> you want to do,
            you may change your action.
          </p>
          <h3>Add Dice for Traits</h3>
          <p>
            Next, you can attempt to modify that initial action by adding a
            six-sided dice (or a <i>d6</i>) for whatever <TraitsTooltip /> you
            have that would help you accomplish this action.
          </p>
          <p>
            For instance, when you&apos;re{" "}
            <InterrogateTooltip linkText="provoking" /> a <SuspectTooltip />{" "}
            into revealing a <ClueTooltip />, you may use{" "}
            <TraitsTooltip linkText="Spirit Medium" /> to irritate their
            rational mind by making a show of contacting the victim and{" "}
            <TraitsTooltip linkText='"Incompetent"' /> to get something clearly
            wrong so the <SuspectTooltip /> corrects you to show how much
            smarter than you they are.
          </p>
          <h3>Add Dice for Clues</h3>
          <p>
            Then, you can look over the <ClueTooltip linkText="Clues" /> that
            have been discovered so far and weave them into the action, adding a{" "}
            <i>d6</i> for any relevant clues. In this case, you may deliberately
            get a number of facts wrong to increase the <SuspectTooltip />
            &apos;s sense of superiority more and more.
          </p>
          <h3>Add Dice for Collaboration</h3>
          <p>
            Finally, if another <ConsultantTooltip /> is around to help you out
            on a roll, they can do the <CollaborateTooltip /> move, giving you
            an extra <i>d6</i>, but they run the risk too.
          </p>
          <h3 id="roll-result">Determine the Result</h3>
          <p>
            Finally, roll all the dice you have accumulated, and look at the
            highest result. If you have 0 dice (or fewer), roll <i>2d6</i> and
            look at the lowest result.
          </p>
          <p>
            Look at your highest dice result and compare it to the table below
            (and the list of <MoveTooltip linkText="Moves" />) to figure out
            your final result:
          </p>
          <table className="border-collapse border border-4 border-red">
            <thead>
              <tr className="bg-red !prose-invert">
                <th className="border border-4 border-red text-center">
                  <Dice1 className="inline" />
                  <Dice2 className="inline" />
                  <Dice3 className="inline" />
                </th>
                <th className="border border-4 border-red text-center">
                  <Dice4 className="inline" />
                  <Dice5 className="inline" />
                </th>
                <th className="border border-4 border-red text-center">
                  <Dice6 className="inline" />
                </th>
                <th className="border border-4 border-red text-center">
                  <Dice6 className="inline" />
                  <Dice6 className="inline" />
                  <Ellipsis className="inline" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-bold">
                <td
                  id="failure"
                  className="border border-4 border-red text-center"
                >
                  Failure
                </td>
                <td
                  id="mixed-success"
                  className="border border-4 border-red text-center"
                >
                  Mixed Success
                </td>
                <td
                  id="success"
                  className="border border-4 border-red text-center"
                >
                  Success
                </td>
                <td
                  id="critical-success"
                  className="border border-4 border-red text-center"
                >
                  Critical Success
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <b>Note:</b> A <b>Critical Success</b> is when you roll more than
            one six on the dice. Most of the moves describe what happens when
            you get that result.
          </p>
          <h2 id="moves">Moves</h2>
          <h3 id="move-collaborate">Collaborate</h3>
          <p>
            Any <ConsultantTooltip /> can give an extra die on a roll, simply by
            being a sounding board for their fellow <ConsultantTooltip />
            &apos;s theories. However, if it goes wrong, the collaborator will
            face their own <ComplicationTooltip />, too...
          </p>
          <h3 id="move-investigate">Investigate</h3>
          <p>
            If you search a <CrimeSceneTooltip /> for useful evidence, roll your{" "}
            <TraitsTooltip /> and any <ClueTooltip linkText="Clues" /> that
            help.
          </p>
          <p>
            On a <RollResultTooltip result="SUCCESS" /> or{" "}
            <RollResultTooltip result="CRITICAL_SUCCESS" />, gain a{" "}
            <ClueTooltip /> for each six rolled. The GM will describe them.
          </p>
          <p>
            On a <RollResultTooltip result="MIXED_SUCCESS" />, you still gain a{" "}
            <ClueTooltip />, but the GM introduces a <ComplicationTooltip />.
          </p>
          <p>
            On a <RollResultTooltip result="FAILURE" />, you come up short. The
            GM will introduce a <ComplicationTooltip />.
          </p>
          <h3 id="move-interrogate">Interrogate</h3>
          <p>
            If you charm, bully, or otherwise manipulate a <SuspectTooltip />{" "}
            into giving a statement, roll your <TraitsTooltip /> and any{" "}
            <ClueTooltip linkText="Clues" /> that help.
          </p>
          <p>
            On a <RollResultTooltip result="SUCCESS" />, gain a <ClueTooltip />.
            The GM describes it.
          </p>
          <p>
            On a <RollResultTooltip result="CRITICAL_SUCCESS" />, they lose
            themselves. You gain a number of <ClueTooltip linkText="Clues" />{" "}
            equal to sixes rolled.
          </p>
          <p>
            On a <RollResultTooltip result="MIXED_SUCCESS" />, you still gain a{" "}
            <ClueTooltip />, but the GM introduces a <ComplicationTooltip />.
          </p>
          <p>
            On a <RollResultTooltip result="FAILURE" />, they don&apos;t play
            your game. The GM will introduce a <ComplicationTooltip />.
          </p>
          <h3 id="move-fabricate">Fabricate</h3>
          <p>
            If you alter, destroy, plant, or create{" "}
            <ClueTooltip linkText="Clues" />, roll your <TraitsTooltip /> and
            any <ClueTooltip linkText="Clues" /> that help.
          </p>
          <p>
            On a <RollResultTooltip result="SUCCESS" /> or{" "}
            <RollResultTooltip result="CRITICAL_SUCCESS" />, make a change for
            each six you roll.
          </p>
          <p>
            On a <RollResultTooltip result="MIXED_SUCCESS" />, you still gain a{" "}
            <ClueTooltip />, but your group gains <SuspicionTooltip />.
          </p>
          <p>
            On a <RollResultTooltip result="FAILURE" />, it doesn&apos;t work
            and your group gains 2 <SuspicionTooltip /> and a{" "}
            <ComplicationTooltip />.
          </p>
          <h3 id="move-undertake">Undertake</h3>
          <p>
            If you do anything that isn&apos;t covered by the other moves, roll
            your <TraitsTooltip /> and any <ClueTooltip linkText="Clues" /> that
            help.
          </p>
          <p>
            On a <RollResultTooltip result="SUCCESS" />, you do it.
          </p>
          <p>
            On a <RollResultTooltip result="CRITICAL_SUCCESS" />, you do it very
            well. Describe what that looks like.
          </p>
          <p>
            On a <RollResultTooltip result="MIXED_SUCCESS" />, you do it, but
            the GM introduces a <ComplicationTooltip />.
          </p>
          <p>
            On a <RollResultTooltip result="FAILURE" />, it doesn&apos;t work.
            The GM introduces a <ComplicationTooltip />.
          </p>
          <h3 id="move-elucidate">Elucidate</h3>
          <p>
            If you provide <TheAuthorityTooltip /> with a convincing explanation
            of what happened here, everyone rolls with any <ClueTooltip /> that
            they incorporate.
          </p>
          <p>
            For each six rolled, you determine a <SuspectTooltip />
            &apos;s fate. It can be prison or it can be worse.
          </p>
          <p>
            For everyone else, it doesn&apos;t stick. The GM describes how they
            get away with it and what happens next.
          </p>
          <h2 id="complications">Complications</h2>
          <ul>
            <li>
              <b>Obstacle</b>: Something interrupts you that means you&apos;ll
              need to complete the <UndertakeTooltip /> move if you want to
              proceed.
            </li>
            <li>
              <b>Lost Opportunity</b>:{" "}
              <CrimeSceneTooltip linkText="Crime Scenes" /> are contaminated
              (either on-screen or off). <SuspectTooltip linkText="Suspects" />{" "}
              lawyer up and refuse to talk. If you want to find{" "}
              <ClueTooltip linkText="Clues" />, you&apos;ll have to look
              somewhere else.
            </li>
            <li>
              <b>New Evidence</b>: A <SuspectTooltip /> introduces (or invents)
              a <ClueTooltip /> that helps prove their innocence.
            </li>
            <li>
              <b>Bespoke Clue</b>: The GM alters the <ClueTooltip /> you get
              themselves to make life harder for you.
            </li>
          </ul>
          <h2>The Climax</h2>
          <p>The mystery ends when one of two things happens.</p>
          <h3>You &quot;Solve&quot; the Mystery</h3>
          <p>
            This is the most likely outcome. At a certain point, you will have
            enough <ClueTooltip linkText="Clues" /> to support any investigation
            or interrogation your group wishes to make and it will become
            natural to gather <TheAuthorityTooltip /> and all the{" "}
            <SuspectTooltip linkText="Suspects" /> together to collectively
            deliver the final denouement.
          </p>
          <p>
            This is done as a group, using the <ElucidateTooltip /> move.
          </p>
          <p>
            Everyone should have a turn to describe what truly happened and how
            each of these terrible people were personally involved. When they
            do, they can weave in one <ClueTooltip /> that proves your point of
            view, slam a dice on the table, before the next person continues
            stating clues.
          </p>
          <p>
            When nobody can figure out how to tie any more{" "}
            <ClueTooltip linkText="Clues" /> in (or when you run out of{" "}
            <ClueTooltip linkText="Clues" />
            ), the GM gathers up every dice on the table and rolls them all.
          </p>
          <p>
            For each six rolled, a player can describe one thing that happens to
            a <SuspectTooltip />. Certainly, this can be a long prison sentence,
            but it may also be a forced resignation, a sudden divorce, public
            disgrace, or a failed attempt to return to the spotlight.
          </p>
          <p>
            If you run out of dice before you run out of punished{" "}
            <SuspectTooltip linkText="Suspects" /> then, sadly, some of them get
            away with it. The GM will get to narrate how they beat the charges
            and continue just as before.
          </p>
          <p className="font-bold">Then, the Mystery is over.</p>
          <h3 id="suspicion">Your Group Gains Too Much Suspicion</h3>
          <p>
            Your group works together. When one person gets a <ClueTooltip />,
            you all get a <ClueTooltip />. And when one person gets{" "}
            <SuspicionTooltip />, you all get <SuspicionTooltip />.
          </p>
          <p>
            Gaining <SuspicionTooltip /> means that the{" "}
            <SuspectTooltip linkText="Suspects" /> and <TheAuthorityTooltip />{" "}
            start to figure out what you&apos;re <i>really</i> trying to do
            here. The only way the group will gain it is by using the{" "}
            <FabricateTooltip /> move to alter, plant, or create{" "}
            <ClueTooltip linkText="Clues" />. This is purely optional and the{" "}
            <ConsultantTooltip linkText="Consultants" /> may forgo doing
            anything untowards, but faking and creating{" "}
            <ClueTooltip linkText="Clues" /> makes framing these people a hell
            of a lot easier.
          </p>
          <p>
            If your group collectively accumulates seven <SuspicionTooltip />,
            the jig is up. The GM narrates a scene where bad things happen and{" "}
            <TheAuthorityTooltip /> steps up to regretfully deal with you.
          </p>
          <p>
            You are foiled, disgraced, and will possibly face massive criminal
            repercussions for not just this case, but every one of the cases
            you&apos;ve solved up to this point.
          </p>
          <p>
            Each player will narrate a short epilogue of what their
            character&apos;s life is like now, either in prison, forced
            retirement, living life on the run, or whatever else feels
            appropriate. Do they miss their life as a renowned investigator? Do
            they regret what they tried to do? Or do they wish they just had one
            last chance to change things.
          </p>
          <p className="font-bold">Then, the Mystery is over.</p>
        </CardContent>
      </Card>
    </div>
  );
}
