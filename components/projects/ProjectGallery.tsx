import Image from "next/image";
import type { Project } from "@/types/portfolio";
import styles from "./ProjectGallery.module.css";

export default function ProjectGallery({ items, name }: { items: NonNullable<Project["gallery"]>; name: string }) {
  return <section className={styles.gallery} aria-label={`${name} 실제 서비스 화면 갤러리`}>
    <h4>Service Screens</h4>
    <div className={styles.items}>{items.map(item=><figure key={item.image}>
      <a href={item.image} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} 원본 크게 보기`}><div className={styles.capture}><Image src={item.image} alt={item.alt} fill sizes="(max-width:760px) 90vw, 380px" /></div></a>
      <figcaption><strong>{item.title}</strong><p>{item.description}</p><a href={item.image} target="_blank" rel="noopener noreferrer">원본 크게 보기 ↗</a></figcaption>
    </figure>)}</div>
  </section>;
}
