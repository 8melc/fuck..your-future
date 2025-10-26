/**
 * FYF Feedboard Content Data
 * 
 * Generated from Cluster_Content_DB.md
 * 2025-10-26T17:43:55.951Z
 */

export type FeedItem = {
  id: string;
  title: string;
  description: string;
  format: 'Zitat' | 'Artikel' | 'Event' | 'People' | 'Podcast' | 'Song';
  theme: 'Zeit & Endlichkeit' | 'Beziehungen' | 'Wachstum' | 'Selbsterkenntnis' | 'Sinn & Bedeutung' | 'Fokus & Flow' | 'Freiheit & Orte' | 'Geld & Wert' | 'Kultur & Stimmen';
  perma: 'Meaning' | 'Relationships' | 'Accomplishment' | 'Engagement' | 'Positive Emotions';
  link: string;
  image: string;
  guideWhy: string;
  source?: 'feedboard' | 'guide' | 'manual';
  chips: string[];
};

export const feedItems: readonly FeedItem[] = [
  {
    id: "seneca-ber-die-krze-des-lebens",
    title: "Seneca: Über die Kürze des Lebens",
    description: "Die Kürze des Lebens ist nicht das Schlimme. Das Schlimme ist, dass wir einen großen Teil davon verschwenden.",
    format: "Zitat" as const,
    theme: "Zeit & Endlichkeit" as const,
    perma: "Meaning" as const,
    link: "https://www.gutenberg.org/ebooks/4276",
    image: "/images/feed_visuals/fyf_zeit_endlichkeit_seneca_ueber_die.jpg",
    guideWhy: "Weil dir die Realität der Zeitverschwendung ins Gesicht schlägt und du keinen Bock auf leere Phrasen hast.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "the-8020-rule-fr-beziehungen",
    title: "The 80/20 Rule für Beziehungen",
    description: "80% deiner Lebensqualität kommt von 20% deiner Beziehungen. Zeit für ein Audit?",
    format: "Artikel" as const,
    theme: "Beziehungen" as const,
    perma: "Relationships" as const,
    link: "https://markmanson.net/80-20-relationships",
    image: "/images/feed_visuals/fyf_beziehungen_the_80_20.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du die Realität der Beziehungen anpacken willst, ohne dir etwas vorzumachen.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "memento-mori-die-kunst-des-bewussten-lebens",
    title: "Memento Mori – Die Kunst des bewussten Lebens",
    description: "Die Stoiker dachten jeden Tag an den Tod. Nicht weil sie depressiv waren, sondern weil sie wach waren.",
    format: "Artikel" as const,
    theme: "Zeit & Endlichkeit" as const,
    perma: "Meaning" as const,
    link: "https://dailystoic.com/memento-mori",
    image: "/images/feed_visuals/fyf_zeit_endlichkeit_memento_mori_die.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du die Realität der Vergänglichkeit nicht ignorieren kannst und dir bewusst ist, dass es Zeit ist, die Dinge klarer zu sehen.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "your-life-in-weeks",
    title: "Your Life in Weeks",
    description: "Jede Woche ist ein Pixel. Du hast ~4.000 davon. Wie viele hast du schon verschwendet?",
    format: "Artikel" as const,
    theme: "Zeit & Endlichkeit" as const,
    perma: "Meaning" as const,
    link: "https://waitbutwhy.com/2014/05/life-weeks.html",
    image: "/images/feed_visuals/fyf_zeit_endlichkeit_your_life_in2.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du dir die Vergänglichkeit deines Lebens bewusst machen willst.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "digital-detox-30-tage-challenge",
    title: "Digital Detox – 30 Tage Challenge",
    description: "Dein Phone ist nicht das Problem. Deine Unfähigkeit, Nein zu sagen, schon.",
    format: "Artikel" as const,
    theme: "Wachstum" as const,
    perma: "Accomplishment" as const,
    link: "https://calnewport.com/on-digital-minimalism",
    image: "/images/feed_visuals/fyf_wachstum_digital_detox_30.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du einfach mal einen Break von der digitalen Überflutung brauchst.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "wer-bin-ich-wirklich",
    title: "Wer bin ich wirklich?",
    description: "Die meisten Menschen spielen ihr Leben lang eine Rolle. Vielleicht ist es Zeit für die Maske-ab-Szene.",
    format: "Artikel" as const,
    theme: "Selbsterkenntnis" as const,
    perma: "Engagement" as const,
    link: "https://www.theschooloflife.com/article/who-am-i",
    image: "/images/feed_visuals/fyf_selbsterkenntnis_wer_bin_ich.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du die Rolle, die du spielst, leid bist und nach echtem Verständnis suchst.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "deliberate-practice-der-weg-zur-meisterschaft",
    title: "Deliberate Practice – Der Weg zur Meisterschaft",
    description: "10.000 Stunden machen dich nicht zum Meister. 10.000 Stunden bewusste Praxis schon.",
    format: "Artikel" as const,
    theme: "Wachstum" as const,
    perma: "Accomplishment" as const,
    link: "https://fs.blog/deliberate-practice-guide",
    image: "/images/feed_visuals/fyf_wachstum_deliberate_practice_der.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du nicht für leere Versprechen, sondern für echte, bewusste Praxis hier bist.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "purpose-discovery-workshop",
    title: "Purpose Discovery Workshop",
    description: "Der Sinn deines Lebens findet sich nicht in einem Coaching-Call. Aber vielleicht ist das hier ein Anfang.",
    format: "Event" as const,
    theme: "Sinn & Bedeutung" as const,
    perma: "Meaning" as const,
    link: "https://fyf.studio/events/purpose-discovery-workshop",
    image: "/images/feed_visuals/fyf_sinn_bedeutung_purpose_discovery_workshop.jpg",
    guideWhy: "Du siehst das, weil du dir keinen Coaching-Bullshit mehr anhören willst, sondern den echten Sinn in deinem Leben finden willst.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "jenny-odell-how-to-do-nothing",
    title: "Jenny Odell – How to Do Nothing",
    description: "Sie lebt, was FYF lehrt: Stillstand als bewusste Entscheidung, nicht als Versagen.",
    format: "People" as const,
    theme: "Freiheit & Orte" as const,
    perma: "Meaning" as const,
    link: "https://www.jennyodell.com/howtodonothing.html",
    image: "/images/feed_visuals/fyf_freiheit_orte_jenny_odell_how.jpg",
    guideWhy: "Du siehst diesen Inhalt, weil du den Mut hast, Stillstand als eine bewusste Entscheidung zu akzeptieren, anstatt dich im Hamsterrad der ständigen Aktivität zu verlieren.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "why-attention-is-the-new-iq",
    title: "Why Attention is the New IQ",
    description: "Intelligenz ohne Aufmerksamkeit ist wie ein Ferrari ohne Benzin. Du hast das Potenzial – nutzt du es?",
    format: "Artikel" as const,
    theme: "Fokus & Flow" as const,
    perma: "Meaning" as const,
    link: "https://fs.blog/attention-new-iq",
    image: "/images/feed_visuals/fyf_fokus_flow_why_attention_is.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du keine Zeit für leere Versprechen hast und wirklich verstehen willst, warum der Fokus entscheidend ist.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "why-we-cant-manage-time",
    title: "Why We Can't Manage Time",
    description: "Zeit lässt sich nicht managen, nur bewusst erleben. Kein Hack kann dir mehr Wochen geben.",
    format: "Podcast" as const,
    theme: "Zeit & Endlichkeit" as const,
    perma: "Meaning" as const,
    link: "https://www.oliverburkeman.com/fourhundredweeks",
    image: "/images/feed_visuals/fyf_zeit_endlichkeit_why_we_cant.jpg",
    guideWhy: "Du siehst diesen Podcast, weil du die Illusion von Zeitmanagement hinterfragen willst, anstatt dich mit leeren Versprechen abzufinden.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "zwischen-reiz-und-reaktion",
    title: "Zwischen Reiz und Reaktion",
    description: "In diesem Raum liegt unsere Macht zu wählen. Bewusstsein = Freiheit.",
    format: "Zitat" as const,
    theme: "Zeit & Endlichkeit" as const,
    perma: "Meaning" as const,
    link: "https://www.themarginalian.org/frankl-between-stimulus-response",
    image: "/images/feed_visuals/fyf_zeit_endlichkeit_zwischen_reiz_und.jpg",
    guideWhy: "Du siehst das, weil du die Freiheit zur Wahl in einer Welt der Reizüberflutung brauchst.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "your-life-in-weeks",
    title: "Your Life in Weeks",
    description: "Jede Woche ist ein Pixel deiner Lebensgeschichte. Das ist kein Quick Win – das ist Fundament.",
    format: "Artikel" as const,
    theme: "Zeit & Endlichkeit" as const,
    perma: "Meaning" as const,
    link: "https://waitbutwhy.com/2014/05/life-weeks.html",
    image: "/images/feed_visuals/fyf_zeit_endlichkeit_your_life_in.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du realisieren musst, dass Zeit nicht wartet und jede Woche zählt.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "begrenzung-ist-befreiung",
    title: "Begrenzung ist Befreiung",
    description: "Weniger Optionen, mehr Klarheit. Das Gegenteil von dem, was dir Social Media erzählt.",
    format: "Zitat" as const,
    theme: "Fokus & Flow" as const,
    perma: "Positive Emotions" as const,
    link: "https://fuckyourfuture.com/manifesto",
    image: "/images/feed_visuals/fyf_fokus_flow_begrenzung_ist_befreiung.jpg",
    guideWhy: "Du siehst diesen Inhalt, weil du gerade eine klare Ansage brauchst, statt dich in endlosen Möglichkeiten zu verlieren.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "deep-work-vs-shallow-habits",
    title: "Deep Work vs. Shallow Habits",
    description: "Fokus brauchst du nicht finden, du musst ihn zulassen. Kein To-Do-App rettet dich, wenn du nie Nein sagst.",
    format: "Podcast" as const,
    theme: "Fokus & Flow" as const,
    perma: "Engagement" as const,
    link: "https://calnewport.com/deep-work",
    image: "/images/feed_visuals/fyf_fokus_flow_deep_work_vs.jpg",
    guideWhy: "Du siehst das, weil du mal wieder den Fokus verlierst und keine Lust auf oberflächliche Lösungen hast.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "you-dont-have-to-be-happy-to-have-meaning",
    title: "You Don't Have to Be Happy to Have Meaning",
    description: "Sinn braucht keine Smileys. Die wichtigsten Entscheidungen triffst du nicht aus Freude, sondern aus Überzeugung.",
    format: "Artikel" as const,
    theme: "Sinn & Bedeutung" as const,
    perma: "Meaning" as const,
    link: "https://psyche.co/ideas/you-dont-have-to-be-happy-to-have-meaning",
    image: "/images/feed_visuals/fyf_sinn_bedeutung_you_dont_have.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du wissen willst, dass es auch ohne Glück eine tiefere Bedeutung im Leben gibt.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "10-best-coworking-spaces-in-bali-for-deep-work",
    title: "10 Best Coworking Spaces in Bali for Deep Work",
    description: "Such Orte, die dich fokussieren, nicht betäuben. Bali ist kein Traumziel, sondern eine Probe.",
    format: "Artikel" as const,
    theme: "Freiheit & Orte" as const,
    perma: "Meaning" as const,
    link: "https://nomadlist.com/bali-coworking-spaces",
    image: "/images/feed_visuals/fyf_freiheit_orte_10_best_coworking.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du Orte suchst, die dir helfen, dich zu konzentrieren, und nicht nur einen weiteren Instagram-Traum.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "the-shadow-side-of-paradise",
    title: "The Shadow Side of Paradise",
    description: "Freiheit hat immer einen Preis. Entscheidest du ihn bewusst oder zahlst du ihn unbewusst?",
    format: "Podcast" as const,
    theme: "Freiheit & Orte" as const,
    perma: "Relationships" as const,
    link: "https://www.thenomadpodcast.com/episodes/shadow-side-paradise",
    image: "/images/feed_visuals/fyf_freiheit_orte_the_shadow_side.jpg",
    guideWhy: "Du siehst diesen Podcast, weil Freiheit nicht immer das ist, was sie scheint, und du die unbequemen Wahrheiten dazu hören musst.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "the-psychology-of-enough",
    title: "The Psychology of Enough",
    description: "Reichtum = Balance, nicht Besitz. Wann hast du genug? Die Antwort entscheidet über deine Freiheit.",
    format: "Podcast" as const,
    theme: "Geld & Wert" as const,
    perma: "Positive Emotions" as const,
    link: "https://hiddenbrain.org/podcast/the-psychology-of-enough",
    image: "/images/feed_visuals/fyf_geld_wert_the_psychology_of.jpg",
    guideWhy: "Du siehst diesen Podcast, weil du die Wahrheit über Geld und Wert wissen willst, ohne die rosarote Brille.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "austin-kleon-show-your-work",
    title: "Austin Kleon – Show Your Work",
    description: "Teilen ist Substanz, nicht Selbstvermarktung. Kleon zeigt, wie du gibst, ohne dich zu verkaufen.",
    format: "People" as const,
    theme: "Kultur & Stimmen" as const,
    perma: "Relationships" as const,
    link: "https://austinkleon.com/show-your-work",
    image: "/images/feed_visuals/fyf_kultur_stimmen_austin_kleon_show.jpg",
    guideWhy: "Du siehst das, weil du nicht noch mehr Selbstvermarktung brauchst, sondern echte Substanz.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "money-as-energy",
    title: "Money as Energy",
    description: "Geld ist gespeicherte Zeit. Zeit ist gespeicherte Aufmerksamkeit. Wo investierst du wirklich?",
    format: "Artikel" as const,
    theme: "Geld & Wert" as const,
    perma: "Meaning" as const,
    link: "https://aeon.co/essays/money-is-not-wealth-time-attention-and-life-energy-are",
    image: "/images/feed_visuals/fyf_geld_wert_money_as_energy.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du wissen willst, wie Geld wirklich funktioniert und nicht nur, was dir die Werbung verkauft.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "hctor-garca-francesc-miralles-ikigai",
    title: "Héctor García & Francesc Miralles – Ikigai",
    description: "Ikigai ist kein Trend, sondern eine Praxis. Sie zeigen, wie Sinn im Alltag entsteht.",
    format: "People" as const,
    theme: "Sinn & Bedeutung" as const,
    perma: "Meaning" as const,
    link: "https://www.penguinrandomhouse.com/books/538186/ikigai-by-hector-garcia-and-francesc-miralles",
    image: "/images/feed_visuals/fyf_sinn_bedeutung_hector_garcia_francesc.jpg",
    guideWhy: "Du siehst diesen Inhalt, weil du die Suche nach Sinn im Alltag leid bist und echte Praktiken statt Trends willst.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "morgan-housel-the-psychology-of-money",
    title: "Morgan Housel – The Psychology of Money",
    description: "Er schreibt über Geld wie ein Philosoph, nicht wie ein Berater. Verhalten schlägt Wissen.",
    format: "People" as const,
    theme: "Geld & Wert" as const,
    perma: "Meaning" as const,
    link: "https://www.morganhousel.com/the-psychology-of-money",
    image: "/images/feed_visuals/fyf_geld_wert_morgan_housel_the.jpg",
    guideWhy: "Du siehst diesen Inhalt, weil du nicht nur nach Zahlen, sondern nach dem verstehst, was Geld wirklich mit Menschen macht.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "erykah-badu-didnt-cha-know",
    title: "Erykah Badu – Didn't Cha Know",
    description: "Manchmal sagt Musik mehr als alle Artikel. Badu singt über Erkenntnis, nicht über Gefühle.",
    format: "Song" as const,
    theme: "Kultur & Stimmen" as const,
    perma: "Positive Emotions" as const,
    link: "https://open.spotify.com/track/4F7cbKTjOHZvNaVLQpMw9s",
    image: "/images/feed_visuals/fyf_kultur_stimmen_erykah_badu_didnt.jpg",
    guideWhy: "Du siehst diesen Song, weil du keine Lust auf leere Phrasen hast und echte Erkenntnisse brauchst.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "purpose-isnt-a-job-title",
    title: "Purpose Isn't a Job Title",
    description: "Purpose findest du nicht in LinkedIn, sondern in dem, was du tust, wenn niemand zuschaut.",
    format: "Podcast" as const,
    theme: "Sinn & Bedeutung" as const,
    perma: "Meaning" as const,
    link: "https://onbeing.org/programs/purpose-conversations",
    image: "/images/feed_visuals/fyf_sinn_bedeutung_purpose_isnt_a.jpg",
    guideWhy: "Du siehst diesen Podcast, weil du keinen Bock auf Titel und Floskeln hast, sondern nach echtem Sinn suchst, wenn die Welt dir gerade nicht die Antworten gibt.",
    source: "feedboard" as const,
    chips: []
  },
  {
    id: "art-as-resistance-in-the-attention-economy",
    title: "Art as Resistance in the Attention Economy",
    description: "Kultur ist nicht Konsum, sondern Widerstand. Was du erschaffst, formt die Welt mehr als das, was du kaufst.",
    format: "Artikel" as const,
    theme: "Kultur & Stimmen" as const,
    perma: "Meaning" as const,
    link: "https://www.theatlantic.com/technology/archive/art-resistance-attention-economy",
    image: "/images/feed_visuals/fyf_kultur_stimmen_art_as_resistance.jpg",
    guideWhy: "Du siehst diesen Artikel, weil du gerade gegen den Strom schwimmen willst und nicht für Konsum, sondern für echten Widerstand stehst.",
    source: "feedboard" as const,
    chips: []
  }
] as const;
