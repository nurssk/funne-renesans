// One visual per dialer cell, in the order of `dialing.cells` (src/content/dialing.ts).
import { DialInstant } from "./instant";
import { DialFollowUps } from "./follow-ups";
import { DialWaterfall } from "./waterfall";
import { DialLocalNumbers } from "./local-numbers";
import { DialTransfers } from "./transfers";

export const dialVisuals = [DialInstant, DialFollowUps, DialWaterfall, DialLocalNumbers, DialTransfers];
