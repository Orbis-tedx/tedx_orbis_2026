import PageShell from "../components/PageShell";

export default function Gallery() {
  const source = import.meta.env.DEV ? "/src/pages/Gallery.html" : "/gallery.html";
  return (
    <PageShell className="bg-[#050505]">
      <iframe
        title="TEDxThe Orbis School gallery"
        src={source}
        className="block h-[100vh] min-h-[900px] w-full border-0"
      />
    </PageShell>
  );
}
