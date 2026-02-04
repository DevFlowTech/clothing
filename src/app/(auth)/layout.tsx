import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-block font-display text-2xl font-bold mb-8 hover:opacity-80 transition-opacity"
          >
            DEVFLOW
          </Link>
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-1 relative bg-muted">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h2 className="font-display text-4xl font-bold mb-4">
              Welcome to DEVFLOW
            </h2>
            <p className="text-lg text-white/80 max-w-md">
              Discover premium fashion that speaks to your soul. Join our
              community of style-conscious individuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
