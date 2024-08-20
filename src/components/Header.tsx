export default function Header() {
  return (
    <>
      <section className="flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-7xl">
          Pouch.
        </h1>
        <p className="max-w-2xl md:text-lg text-xs font-light text-foreground">
          An open-source HD wallet generator for Sol and Eth.
        </p>
      </section>
    </>
  );
}
