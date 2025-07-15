export default function AboutPage() {
  return (
    <div className="flex justify-center items-center h-screen px-4 text-center">
      <h1 className="text-3xl font-bold text-black">About Blog Summariser</h1>
      <p className="mt-4 text-gray-700">
        This app lets you summarize blogs and translate the summary into Urdu.
        Built with Next.js 15, MongoDB, Supabase & AI logic.
      </p>
    </div>
  );
}
