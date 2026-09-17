import PageShell from "../components/PageShell";

export default function About() {
  const source = import.meta.env.DEV ? "/src/pages/About.html" : "/about.html";
  return (
    <PageShell className="bg-[#050505]">
      <iframe
        title="About TEDxThe Orbis School"
        src={source}
        className="block h-[100vh] min-h-[900px] w-full border-0"
      />
    </PageShell>
  );
}
