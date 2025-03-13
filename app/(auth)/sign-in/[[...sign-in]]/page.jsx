import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex my-10 md:my-0 md:h-32 items-center bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Workzenn
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              No need to worry, get your dream job quickly.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-16 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden text-center md:text-start">
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Workzenn
              </h1>

              <p className="mt-4 mb-6 md:mb-0 leading-relaxed text-gray-500">
                No need to worry, get your dream job quickly.
              </p>
            </div>

            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
