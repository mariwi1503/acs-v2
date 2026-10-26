"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import PlexusBackground from "./plexus-background";
import heroImage from "../public/images/hero.png";
import logoImage from "../public/images/logo2.png";
import networkingImage from "../public/images/networking.png";
import dataCenterImage from "../public/images/data-center.png";
import cctvImage from "../public/images/cctv.png";
import telecommunicationImage from "../public/images/telecomunication.png";
import smartHomeImage from "../public/images/smarthome.png";
import officeImage from "../public/images/office.png";
import manpowerImage from "../public/images/manpower.png";
import projectManagementImage from "../public/images/project-management.png";
import operationalImage from "../public/images/operational.png";
import hausLogo from "../public/images/clients/haus.png";
import dpuprLogo from "../public/images/clients/dpupr.png";
import andreaBerkatAbadiLogo from "../public/images/clients/andrea-berkat-abadi.png";
import woodlandParkLogo from "../public/images/clients/woodland-park.png";
import springwoodLogo from "../public/images/clients/springwood.png";
import ciscoLogo from "../public/images/partners/cisco.png";
import arubaLogo from "../public/images/partners/aruba.png";
import ruijieLogo from "../public/images/partners/ruijie.png";
import sixcomLogo from "../public/images/partners/6com.png";
import mikrotikLogo from "../public/images/partners/mikrotik.png";
import juniperLogo from "../public/images/partners/juniper.png";
import raisecomLogo from "../public/images/partners/raisecom.png";
import tpLinkLogo from "../public/images/partners/tp-link.png";
import dellLogo from "../public/images/partners/dell.png";
import supermicroLogo from "../public/images/partners/supermicro.png";
import lenovoLogo from "../public/images/partners/lenovo.png";
import hikvisionLogo from "../public/images/partners/hikvision.png";
import zktecoLogo from "../public/images/partners/zkteco.png";
import unvLogo from "../public/images/partners/unv.png";
import dahuaLogo from "../public/images/partners/dahua.png";
import toaLogo from "../public/images/partners/toa.png";

type IconName = "arrow" | "chevron" | "menu" | "close" | "network" | "server" | "shield" | "radio" | "circuit" | "headphones" | "globe" | "check";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M7 17 17 7M8 7h9v9" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M5 5l14 14M19 5 5 19" />,
    network: <><rect x="9" y="2" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="16" y="16" width="6" height="6" rx="1" /><path d="M12 8v4M5 16v-4h14v4" /></>,
    server: <><rect x="3" y="3" width="18" height="8" rx="2" /><rect x="3" y="13" width="18" height="8" rx="2" /><path d="M7 7h.01M7 17h.01M11 7h7M11 17h7" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    radio: <><path d="M5 16a10 10 0 0 1 14 0M2 12a15 15 0 0 1 20 0M8 20a5 5 0 0 1 8 0" /><circle cx="12" cy="22" r="1" fill="currentColor" stroke="none" /></>,
    circuit: <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 9h6v6H9zM9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" /></>,
    headphones: <><path d="M3 14v-3a9 9 0 0 1 18 0v3" /><rect x="2" y="13" width="4" height="7" rx="2" /><rect x="18" y="13" width="4" height="7" rx="2" /></>,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

type SocialName = "Instagram" | "Facebook" | "TikTok" | "YouTube";

function SocialIcon({ name }: { name: SocialName }) {
  const shapes: Record<SocialName, React.ReactNode> = {
    Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
    Facebook: <path d="M14.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.1 1.5-4.1 4.3V10H8.5v3h2.8v8z" fill="currentColor" stroke="none" />,
    TikTok: <><path d="M14 3v12.2a4.5 4.5 0 1 1-4.5-4.5c.5 0 1 .1 1.5.2" /><path d="M14 3c.3 3.2 2.4 5.1 6 5.3" /></>,
    YouTube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" /></>,
  };

  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name]}</svg>;
}

type Service = { title: string; description: string; tags: string[]; image: StaticImageData; partnerGroup?: string };

const itServices: Service[] = [
  { title: "Networking", description: "Wired network, wireless, SDWAN, network security, cabling, dan perangkat pendukung jaringan.", tags: ["Wired Network", "Wireless", "SD-WAN", "Network Security", "Cabling"], image: networkingImage, partnerGroup: "Networking" },
  { title: "Data Center & Power System", description: "Infrastruktur data center, perangkat pendukung, dan sistem kelistrikan.", tags: ["Infrastruktur Data Center", "Server & Storage", "Sistem Kelistrikan"], image: dataCenterImage, partnerGroup: "Server & Storage" },
  { title: "Surveillance & Analytics Camera", description: "Surveillance camera, AI camera, dan IoT camera untuk pengawasan dan analitik.", tags: ["Surveillance Camera", "AI Camera", "IoT Camera", "Analitik Video"], image: cctvImage, partnerGroup: "Security & Access Control" },
  { title: "Telecommunication", description: "Radio link, metro network, dan solusi telekomunikasi sesuai kebutuhan.", tags: ["Radio Link", "Metro Network", "Solusi Custom"], image: telecommunicationImage },
  { title: "Building Solution, IoT & Smart System", description: "Smart building, smart home, IoT, dan sistem cerdas untuk bangunan.", tags: ["Smart Building", "Smart Home", "IoT", "Sistem Cerdas"], image: smartHomeImage },
];
const jasaServices: Service[] = [
  { title: "General Service", description: "Facility management dan dukungan operasional untuk kebutuhan bisnis sehari-hari.", tags: ["Facility Management", "Dukungan Operasional"], image: officeImage },
  { title: "Manpower Supply", description: "Penyediaan sumber daya manusia profesional sesuai kebutuhan perusahaan.", tags: ["Tenaga Profesional", "Sesuai Kebutuhan"], image: manpowerImage },
  { title: "Project Management", description: "Pendampingan dan pengelolaan proyek IT maupun non-IT.", tags: ["Proyek IT", "Proyek Non-IT", "Pendampingan"], image: projectManagementImage },
  { title: "Procurement", description: "Pengadaan barang IT dan non-IT untuk mendukung kebutuhan usaha.", tags: ["Barang IT", "Barang Non-IT"], image: operationalImage },
];
const serviceGroups = [
  { id: "it", number: "01", title: "Layanan IT", summary: "Infrastruktur, konektivitas, keamanan, dan sistem cerdas.", services: itServices },
  { id: "jasa", number: "02", title: "Layanan Jasa", summary: "Dukungan operasional, tenaga kerja, proyek, dan pengadaan.", services: jasaServices },
];
const managedServices = [
  ["Managed Colocation", "Kolokasi di pusat data Indonesia dan ASEAN, termasuk penyiapan, instalasi, dan pemeliharaan."],
  ["Managed SDWAN", "Perangkat SDWAN dan konektivitas last-mile dengan pemantauan serta pengelolaan harian."],
  ["Remote Network Monitoring", "Pemantauan access point, switch, dan router."],
  ["Enterprise Network Management", "Pemantauan onsite dan offsite, dukungan helpdesk, serta layanan teknik."],
  ["Engineer On Site", "Dukungan teknisi di tempat sesuai kebutuhan."],
  ["IP Address Supply", "Penyediaan alamat IP untuk kebutuhan infrastruktur jaringan."],
];
const whatsappUrl = `https://wa.me/628212999742?text=${encodeURIComponent("Halo Alpha Core Solution, saya ingin berdiskusi mengenai kebutuhan bisnis saya.")}`;

type Logo = { name: string; image: StaticImageData };

const partnerGroups: { title: string; partners: Logo[] }[] = [
  { title: "Networking", partners: [
    { name: "Cisco", image: ciscoLogo }, { name: "Aruba", image: arubaLogo },
    { name: "Ruijie Networks", image: ruijieLogo }, { name: "6COM", image: sixcomLogo },
    { name: "MikroTik", image: mikrotikLogo }, { name: "Juniper Networks", image: juniperLogo },
    { name: "Raisecom", image: raisecomLogo }, { name: "TP-Link", image: tpLinkLogo },
  ] },
  { title: "Server & Storage", partners: [
    { name: "Dell", image: dellLogo }, { name: "Supermicro", image: supermicroLogo },
    { name: "Lenovo", image: lenovoLogo },
  ] },
  { title: "Security & Access Control", partners: [
    { name: "Hikvision", image: hikvisionLogo }, { name: "ZKTeco", image: zktecoLogo },
    { name: "UNV", image: unvLogo }, { name: "Dahua Technology", image: dahuaLogo },
  ] },
  { title: "Audio System", partners: [
    { name: "TOA", image: toaLogo },
  ] },
];
const customers: Logo[] = [
  { name: "Haus!", image: hausLogo },
  { name: "DPUPR", image: dpuprLogo },
  { name: "PT. Andrea Berkat Abadi", image: andreaBerkatAbadiLogo },
  { name: "Woodland Park Residence", image: woodlandParkLogo },
  { name: "Springwood Residence", image: springwoodLogo },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return <a className={`brand${footer ? " footer-brand" : ""}`} href="#top" aria-label="Alpha Core Solution beranda"><Image src={logoImage} alt="" priority={!footer} sizes="86px" /><span>ALPHA CORE<b>SOLUTION</b></span></a>;
}

function ServicesSection() {
  const [groupId, setGroupId] = useState(serviceGroups[0].id);
  const [activeIndex, setActiveIndex] = useState(0);
  const group = serviceGroups.find(item => item.id === groupId) ?? serviceGroups[0];

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="section-kicker">03 / LAYANAN KAMI</div>
            <h2>Dua bidang layanan.<br /><span>Solusi yang jelas.</span></h2>
          </div>
          <p>Pilih bidang layanan, lalu jelajahi setiap solusi untuk melihat cakupan dan teknologi pendukungnya.</p>
        </div>
        <div className="service-switch" role="group" aria-label="Bidang layanan">
          {serviceGroups.map(item =>
            <button type="button" key={item.id} className={item.id === group.id ? "is-active" : undefined} aria-pressed={item.id === group.id} onClick={() => { setGroupId(item.id); setActiveIndex(0); }}>
              <span className="service-switch-number">{item.number}</span>
              <span className="service-switch-text"><strong>{item.title}</strong><small>{item.summary}</small></span>
            </button>
          )}
        </div>
        <div className="service-explorer" key={group.id} style={{ "--service-count": group.services.length } as React.CSSProperties}>
          {group.services.map((service, index) => {
            const isActive = index === activeIndex;
            const panelId = `service-panel-${group.id}-${index}`;
            const partners = partnerGroups.find(item => item.title === service.partnerGroup)?.partners.slice(0, 4);
            return (
              <Fragment key={service.title}>
                <button type="button" className={`service-trigger${isActive ? " is-active" : ""}`} aria-expanded={isActive} aria-controls={panelId} onClick={() => setActiveIndex(index)}>
                  <span className="service-trigger-thumb"><Image src={service.image} alt="" sizes="56px" /></span>
                  <span className="service-trigger-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-trigger-title">{service.title}</span>
                  <Icon name="chevron" size={18} />
                </button>
                <article className="service-panel" id={panelId} hidden={!isActive}>
                  <span className="service-panel-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div className="service-panel-content">
                    <div>
                      <span className="service-panel-kicker">{group.title.toUpperCase()} / {String(index + 1).padStart(2, "0")}</span>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <div className="service-scope">
                      <span>CAKUPAN LAYANAN</span>
                      <ul aria-label={`Cakupan ${service.title}`}>{service.tags.map(tag => <li key={tag}><Icon name="check" size={15} />{tag}</li>)}</ul>
                    </div>
                    {partners && <div className="service-partners"><span>BRAND PARTNER</span><ul>{partners.map(partner => <li key={partner.name}><Image src={partner.image} alt={partner.name} sizes="96px" /></li>)}</ul></div>}
                    <a className="service-panel-cta" href="#contact">Diskusikan layanan ini <Icon name="arrow" size={16} /></a>
                  </div>
                </article>
              </Fragment>
            );
          })}
        </div>
        <div className="service-cta-band">
          <p><strong>Butuh kombinasi layanan IT dan jasa?</strong> Ceritakan kebutuhan Anda, tim kami bantu memetakan solusi yang paling sesuai.</p>
          <a className="button button-primary" href="#contact">Mulai konsultasi <Icon name="arrow" size={16} /></a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return <div className="site-shell">
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}><div className="container nav-wrap"><Brand /><button className="menu-toggle" type="button" aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} size={25} /></button><nav id="main-nav" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Navigasi utama">{[["Tentang Kami", "#about"], ["Layanan", "#services"], ["Industri", "#industries"], ["Pelanggan", "#customers"], ["Partner", "#partners"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Mari Berdiskusi <Icon name="arrow" size={15} /></a></nav></div></header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-heading"><PlexusBackground /><div className="container hero-content"><div className="hero-copy reveal"><div className="eyebrow"><span className="eyebrow-dot" />PT. ALPHA CORE SOLUTION</div><h1 id="hero-heading">Technology that<br /><em>moves</em> business forward.</h1><p className="hero-lead">Kami merancang, membangun, dan menjaga solusi digital yang membuat bisnis lebih siap menghadapi hari esok.</p><div className="hero-actions"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Mulai percakapan <Icon name="arrow" size={16} /></a><a className="text-link" href="#services">Jelajahi layanan <Icon name="chevron" size={15} /></a></div><div className="hero-proof"><span className="proof-line" /><span>Solusi terpercaya untuk operasional yang lebih cerdas</span></div></div><div className="hero-visual reveal delay-one"><Image className="hero-image" src={heroImage} alt="Ilustrasi teknologi digital, jaringan global, dan infrastruktur server Alpha Core Solution" priority sizes="(max-width: 800px) 100vw, 50vw" /></div></div><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></div></section>
      <section className="core-strip" aria-label="Nilai perusahaan CORE"><div className="container"><div className="core-grid">{[["C", "Collaborative", "Bekerja sama untuk hasil terbaik."], ["O", "Optimized", "Solusi efisien dan efektif."], ["R", "Reliable", "Dapat diandalkan."], ["E", "Excellence", "Mengejar kualitas terbaik."]].map(([letter, title, copy]) => <article className="core-item" key={letter}><b>{letter}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>
      <section className="section about-section" id="about"><div className="container split-layout"><div className="about-image"><Image src="https://images.unsplash.com/photo-1587038787166-becd08a156f7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="Foto pendukung profil PT. Alpha Core Solution" fill sizes="(max-width: 1020px) 100vw, 48vw" /></div><div className="about-content"><div className="section-kicker">01 / ABOUT ACS</div><h2>Partner untuk<br /><span>transformasi digital.</span></h2><p className="large-copy">PT. Alpha Core Solution bergerak di bidang Teknologi Informasi dan Jasa. Kami membantu bisnis berkembang melalui solusi digital yang efisien, aman, dan sesuai kebutuhan.</p><p>Didukung tim profesional dan semangat inovasi, kami berkomitmen menjadi partner terpercaya dalam transformasi digital dan layanan pendukung bisnis Anda.</p></div></div></section>
      <section className="section vision-section" id="vision"><div className="container vision-layout"><div><div className="section-kicker">02 / VISI & MISI</div><h2>Arah yang jelas.<br /><span>Komitmen yang nyata.</span></h2><div className="vision-statement"><span>VISI</span><p>Menjadi perusahaan IT dan jasa terdepan di Indonesia yang memberikan solusi inovatif untuk mendorong pertumbuhan bisnis klien.</p></div></div><div className="mission-block"><h3>Misi kami</h3><ol><li>Memberikan solusi IT yang cepat, tepat, dan berkelanjutan.</li><li>Menyediakan layanan jasa profesional dengan standar kualitas tinggi.</li><li>Membangun kemitraan jangka panjang berbasis kepercayaan.</li><li>Mengembangkan SDM yang kompeten dan berintegritas.</li></ol></div></div></section>
      <ServicesSection />
      <section className="section managed-section"><div className="container managed-layout"><div className="managed-intro"><div className="section-kicker light-kicker">04 / NETWORK MANAGED SERVICE</div><h2>Keep your<br /><span>business moving.</span></h2><p>Dari kolokasi hingga pemantauan jaringan dan dukungan teknisi di tempat, kami membantu menjaga infrastruktur tetap berjalan.</p><a className="button button-light" href="#contact">Diskusikan kebutuhan <Icon name="arrow" size={16} /></a></div><div className="managed-list">{managedServices.map(([title, description], index) => <div className="managed-item" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div><Icon name="chevron" size={18} /></div>)}</div></div></section>
      <section className="section industries-section" id="industries"><div className="container"><div className="section-heading"><div><div className="section-kicker">05 / INDUSTRY TO CATER</div><h2>Memahami bisnis,<br /><span>mengerti tantangan.</span></h2></div><p>Kami melayani berbagai sektor dengan solusi yang disesuaikan untuk menghasilkan kualitas tinggi dan efisiensi biaya.</p></div><p className="industry-intro">Dari tekanan pasar hingga biaya operasional yang tinggi, Alpha Core Solution membantu menjawab tantangan industri dengan solusi inovatif yang selaras dengan tujuan bisnis. Didukung insinyur berpengalaman, kami menghadirkan solusi komprehensif. Kesuksesan global kami menjadi bukti nilai yang kami bawa bagi bisnis Anda.</p><div className="industry-grid">{["Hospitality", "Government & Public Services", "Manufacture", "Education"].map((industry, index) => <div className="industry-card" key={industry}><span>{String(index + 1).padStart(2, "0")}</span><h3>{industry}</h3><Icon name="arrow" size={20} /></div>)}</div></div></section>
      <section className="section reasons-section"><div className="container"><div className="section-heading"><div><div className="section-kicker">06 / MENGAPA MEMILIH KAMI</div><h2>Empat alasan untuk<br /><span>melangkah bersama.</span></h2></div><p>Pendekatan yang membantu kami menghadirkan solusi sesuai kebutuhan klien.</p></div><div className="reason-grid">{[["Modern", "Menggunakan teknologi terbaru."], ["Minimalis", "Proses kerja sederhana, hasil maksimal."], ["Fleksibel", "Layanan dapat disesuaikan dengan kebutuhan klien."], ["Terpercaya", "Tim berpengalaman dan dukungan 24/7."]].map(([title, description], index) => <article className="reason-card" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
      <section className="section customers-section" id="customers"><div className="container"><div className="section-kicker">07 / OUR CUSTOMER</div><div className="partners-title"><h2>Kepercayaan yang<br /><span>terus bertumbuh.</span></h2><p>Sejumlah pelanggan yang ditampilkan dalam profil perusahaan kami.</p></div><div className="customer-grid">{customers.map(customer => <div className="customer-logo" key={customer.name}><Image src={customer.image} alt={customer.name} sizes="(max-width: 460px) 70vw, (max-width: 1020px) 35vw, 300px" /></div>)}</div></div></section>
      <section className="section partners-section" id="partners"><div className="container"><div className="section-kicker">08 / OUR PARTNERS</div><div className="partners-title"><h2>Didukung ekosistem<br /><span>teknologi terpercaya.</span></h2><p>Partner teknologi kami mencakup jaringan, server dan penyimpanan, keamanan dan kontrol akses, serta sistem audio.</p></div><div className="partner-groups">{partnerGroups.map((group, index) => <section className="partner-group" key={group.title} aria-labelledby={`partner-group-${index}`}><h3 id={`partner-group-${index}`}>{group.title}</h3><div className="partner-cloud">{group.partners.map(partner => <div className="partner-logo" key={partner.name}><Image src={partner.image} alt={partner.name} sizes="160px" /></div>)}</div></section>)}</div></div></section>
      <section className="contact-section" id="contact"><div className="container contact-inner"><div><div className="section-kicker light-kicker">09 / LET&apos;S CONNECT</div><h2>Let&apos;s build<br /><em>future together.</em></h2></div><div className="contact-right"><p>Transformasi digital adalah kunci keunggulan kompetitif. Bersama Alpha Core Solution, wujudkan efisiensi, inovasi, dan skalabilitas bisnis masa depan melalui solusi teknologi yang tepat sasaran. Hubungi kami untuk memulai langkah digital Anda.</p><a className="button button-primary" href="mailto:info@alphacoresolution.id">Hubungi Alpha Core <Icon name="arrow" size={16} /></a><div className="contact-details"><a href="tel:+628212999742"><Icon name="headphones" size={16} />+62 821-2999-742</a><a href="mailto:info@alphacoresolution.id"><Icon name="globe" size={16} />info@alphacoresolution.id</a></div></div></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-main"><div className="footer-brand-group"><Brand footer /><ul className="footer-socials" aria-label="Media sosial">{(["Instagram", "Facebook", "TikTok", "YouTube"] as SocialName[]).map(name => <li key={name}><span className="footer-social-icon" role="img" aria-label={name}><SocialIcon name={name} /></span></li>)}</ul></div><a className="footer-address" href="https://maps.google.com/?q=Kota+Wisata+Blok+J4+No+38+Gunung+Putri+Bogor" target="_blank" rel="noopener noreferrer">Kota Wisata Blok J4 no 38<br />Gunung Putri — Bogor <Icon name="arrow" size={16} /></a></div><div className="container footer-bottom"><span>© 2026 PT. Alpha Core Solution. All rights reserved.</span><span>Technology with purpose.</span></div></footer>
  </div>;
}
