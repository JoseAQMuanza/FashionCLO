import Image from "next/image";
import Link from "next/link";

export default function CollectionCard({
  title,
  description,
  href,
  imageSrc,
}: {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-72">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-4 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Coleção</p>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
        <Link
          href={href}
          aria-label={`Ver coleção ${title}`}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Ver coleção
        </Link>
      </div>
    </article>
  );
}
