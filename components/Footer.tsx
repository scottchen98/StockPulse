export default function Footer() {
  return (
    <footer className="flex justify-center">
      <div className="fixed bottom-0 flex w-fit items-center justify-center gap-4 text-center tracking-tight sm:mb-4 sm:px-0 md:flex-row">
        <div className="border-none p-3 px-4 backdrop-blur-md sm:rounded-xl">
          Made with 💜 by{" "}
          <a
            href="https://github.com/scottchen98"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Scott
          </a>
          . Crafted using{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Next.js
          </a>
          ,{" "}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Shadcn UI
          </a>
          , and{" "}
          <a
            href="https://recharts.org/en-US/"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Recharts
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
