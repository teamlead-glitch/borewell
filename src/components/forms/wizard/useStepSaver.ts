import { useCallback, useRef } from "react";
import type { ApiResponse } from "@/types/common";

type StepResponse = ApiResponse<{ draft_token: string | null }>;
type StepSave = (draftToken: string | null) => Promise<StepResponse>;

/**
 * Saves each finished wizard step, so an unfinished form is still kept as an "Incomplete"
 * record the team can follow up. Saves run one after another: the first returns a draft
 * token that the next ones (and the final submit) send back to update the same record.
 *
 * `save` resolves with the API answer: the form awaits it to show validation errors (e.g.
 * "phone already registered") on that step. Network / server failures are for the form to
 * ignore, so a dropped connection never blocks the visitor.
 */
export function useStepSaver() {
  const token = useRef<string | null>(null);
  const queue = useRef<Promise<unknown>>(Promise.resolve());

  /** Queue a save; `send` gets the current draft token */
  const save = useCallback((send: StepSave): Promise<StepResponse> => {
    const run = queue.current.then(async () => {
      const res = await send(token.current);
      if (res.success && res.data?.draft_token) token.current = res.data.draft_token;
      return res;
    });
    queue.current = run;
    return run;
  }, []);

  /** Wait for queued saves, then return the token for the final submit */
  const flush = useCallback(async () => {
    await queue.current;
    return token.current ?? undefined;
  }, []);

  return { save, flush };
}

/** A save the visitor must fix (422 with field errors), as opposed to a network / server failure */
export const isStepValidationError = (res: StepResponse) => !res.success && Boolean(res.errors && Object.keys(res.errors).length);
