import Link from "next/link";
import { IArrow } from "@/components/ui/icons";

export function ComingSoon({
  title,
  description,
  category,
}: {
  title: string;
  description?: string;
  category?: string;
}) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          {category && <div className="page-eyebrow">{category}</div>}
          <h1 className="page-title">{title}</h1>
          {description && <p className="page-subtitle">{description}</p>}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--dens-8) var(--dens-6)",
          background: "var(--bg-elev)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          textAlign: "center",
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            marginBottom: 16,
          }}
        >
          Yapım Aşamasında
        </div>
        <h2 className="display" style={{ fontSize: 32, fontWeight: 500, margin: 0, maxWidth: 520 }}>
          Bu bölüm yakında burada olacak
        </h2>
        <p style={{ color: "var(--fg-muted)", fontSize: 14, marginTop: 16, maxWidth: 480 }}>
          MVP kapsamındaki diğer modüllere öncelik verdik. Sprint planını{" "}
          <Link href="/admin" style={{ color: "var(--accent)" }}>
            yönetim panelinden
          </Link>{" "}
          izleyebilirsin.
        </p>
        <Link href="/" className="btn btn-ghost" style={{ marginTop: 24 }}>
          <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
            <IArrow size={14} />
          </span>
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
