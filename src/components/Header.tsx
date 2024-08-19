export default function Header() {
  return (
    <>
      <section className="flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">
          Pouch
        </h1>
        <p className="max-w-2xl text-lg font-light text-foreground">
          An implementation of real world web3 wallets.
        </p>
      </section>
    </>
  );
}