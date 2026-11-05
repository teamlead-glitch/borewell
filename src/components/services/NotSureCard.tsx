import Button from "@/components/ui/Button";

export default function NotSureCard() {
  return (
    <div className="flex h-full flex-col items-start justify-center gap-4 rounded-[28px] bg-gradient-to-br from-aquifer-soft to-mist p-8">
      <h2 className="text-[24px] font-extrabold">Not sure what you need?</h2>
      <p className="text-[16px] text-stone">Send a general enquiry. Our team will advise after the inspection.</p>
      <Button href="/enquiry" variant="dark" className="mt-2">
        Send enquiry
      </Button>
    </div>
  );
}
