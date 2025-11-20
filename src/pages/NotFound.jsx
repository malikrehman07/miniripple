import React from "react";
import ErrorContent from "@/components/notFound/ErrorContent";
import IntroSection from "@/components/IntroSection/IntroSection";

function NotFoundPage() {
  return (
    <main className="flex items-center justify-center w-full bg-transparent px-4" style={{ minHeight: '100vh' }}>
      <IntroSection>
        <section className="simplified-security-section">
          <ErrorContent />
        </section>
      </IntroSection>
    </main>
  );
}

export default NotFoundPage;
