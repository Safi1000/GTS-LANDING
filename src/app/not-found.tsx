import type { Metadata } from "next";
import { Crest } from "@/components/Crest";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <header className="wrap phero" style={{ paddingBlock: "clamp(70px,11vw,140px)" }}>
      <Crest w={66} h={78} style={{ margin: "0 auto 26px" }} eager />
      <h1 className="d-lg">That level didn&apos;t hold.</h1>
      <p className="lede" style={{ marginInline: "auto" }}>
        The page you were looking for isn&apos;t here. Nothing dramatic — just a bad link.
      </p>
      <div className="btn-row center" style={{ marginTop: 32 }}>
        <MagneticButton href="/" className="btn btn-primary">Back to home</MagneticButton>
        <MagneticButton href="/masterclass" className="btn btn-secondary">Masterclass</MagneticButton>
      </div>
    </header>
  );
}
