function Error() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-zinc-800 dark:text-zinc-200">
        <div className="text-center">
          <p className="text-base my-2 font-semibold text-indigo-600">404</p>
          {/* <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5x backdrop-blur-3xl bg-orange-500">
            Page not found
          </h1> */}
          <div className="relative p-2 inline-block">
            <div className="absolute inset-0 bg-indigo-700 blur-xl"></div>
            <h1 className="relative text-3xl font-bold tracking-tight text-zinc-800 dark:text-white sm:text-5x">
            Page not found
          </h1>
          </div>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-zinc-200">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Error;
