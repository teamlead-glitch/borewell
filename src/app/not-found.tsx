import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageHeader crumb="Page not found" title="Dry bore." lead="We couldn't find this page. It may have moved, or the link may be mistyped.">
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/" variant="light">
          Go to the home page
        </Button>
        <Button href="/enquiry" variant="ghost-light">
          Send an enquiry
        </Button>
      </div>
    </PageHeader>
  );
}
