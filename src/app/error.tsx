"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

// The CMS could not be reached and nothing was cached: a 5xx, never a fake 404.
// Says what happened and what to do; the header above still has the phone number.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-white">
      <Container className="pb-16 pt-32 sm:pb-24 sm:pt-40">
        <h1 className="max-w-[20ch] text-[34px] font-extrabold sm:text-[48px]">This page didn&apos;t load.</h1>
        <p className="mt-4 max-w-[46ch] text-[17px] text-white/80">
          Our server didn&apos;t answer in time. Try again in a minute, or call the number at the top of the page to talk to our team.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="button" variant="light" onClick={() => reset()}>
            Try again
          </Button>
          <Button href="/" variant="ghost-light">
            Go to the home page
          </Button>
        </div>
      </Container>
    </section>
  );
}
