import SectionLabel from '../components/SectionLabel'
import SymptomCard from '../components/SymptomCard'
import DisclaimerNote from '../components/DisclaimerNote'
import Sources from '../components/Sources'
import SymptomsReveal from '../components/SymptomsReveal'

const CARDS = [
  {
    symptom: 'Irregular or unpredictable periods',
    solutionName: 'Inositol',
    why: 'Often tied to insulin resistance disrupting the hormone signals that trigger ovulation each month.',
    solution:
      'Myo-inositol is one of the most-studied supplements for PCOS. One clinical study found it restored regular cycles in 68% of patients over 6 months, alongside improved insulin sensitivity. Generally well-tolerated; mild GI upset is the most common side effect.',
    source: {
      label: 'Contemporary OB/GYN, summarizing peer-reviewed clinical research',
      href: 'https://www.contemporaryobgyn.net/view/myo-inositol-shows-promise-for-pcos-therapy',
    },
  },
  {
    symptom: 'Acne or excess hair growth',
    solutionName: 'Spironolactone',
    why: 'Elevated androgens (like testosterone) stimulate oil glands and hair follicles.',
    solution:
      'Spironolactone is a commonly prescribed anti-androgen medication. Results typically take 2–4 months. Side effects can include fatigue, GI upset, and menstrual irregularity. Requires effective contraception due to pregnancy risk. Prescription only.',
    source: {
      label: 'Cleveland Clinic Journal of Medicine (PubMed)',
      href: 'https://pubmed.ncbi.nlm.nih.gov/2357784/',
    },
    prescriptionNote: true,
  },
  {
    symptom: 'Hair thinning',
    solutionName: 'Minoxidil',
    why: 'Driven by the same androgen-related process as other pattern hair loss.',
    solution:
      'FDA-approved for female pattern hair loss. Takes patience. Results typically appear after 3–6 months, and an initial shedding phase in the first few weeks is normal, not a sign it’s failing.',
    source: {
      label: 'Harvard Health',
      href: 'https://www.health.harvard.edu/healthy-aging-and-longevity/treating-female-pattern-hair-loss',
    },
  },
  {
    symptom: 'Insulin resistance / difficulty losing weight',
    solutionName: 'Metformin',
    why: 'High insulin drives the ovaries to produce more androgens, creating a feedback loop, not a willpower issue.',
    solution:
      'Commonly prescribed to improve insulin sensitivity. Common side effects: nausea, GI upset, metallic taste, usually improving over the first few weeks. Note: effects tend to fade if stopped without accompanying lifestyle changes, so it’s often paired with other approaches, not used as a standalone fix.',
    source: {
      label: 'NCBI clinical trial protocol summary',
      href: 'https://cdn.clinicaltrials.gov/large-docs/94/NCT06015594/Prot_SAP_ICF_000.pdf',
    },
    prescriptionNote: true,
  },
  {
    symptom: 'Mood changes: anxiety, depression, irritability',
    solutionName: 'Talk to your doctor about screening',
    why: 'This is well-documented, not incidental. Women with PCOS show significantly higher rates of depression and anxiety than the general population, with pooled prevalence estimates around 34–51% depending on the study. This is likely tied to hormonal and insulin-related factors, not a personal failing.',
    solution:
      'Because this is common enough that your doctor may screen for it directly, bring it up even if it feels unrelated to "PCOS." Treating underlying hormonal drivers sometimes helps mood too, but that’s not a substitute for separate mental health support if needed.',
    source: {
      label: "Archives of Women's Mental Health, overview of systematic reviews",
      href: 'https://link.springer.com/article/10.1007/s00737-024-01526-1',
    },
    mentalHealthNote: true,
  },
  {
    symptom: 'Difficulty conceiving',
    solutionName: 'Letrozole (preferred first-line) or Clomid',
    why: 'Many PCOS phenotypes involve irregular or absent ovulation.',
    solution:
      'Letrozole is now the preferred first-line option per current international guidelines, generally more effective than clomiphene citrate (Clomid), which remains a valid alternative. Both require medical supervision.',
    source: {
      label: 'PMC systematic review',
      href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12467464/',
    },
    prescriptionNote: true,
  },
]

export default function Symptoms() {
  return (
    <section id="symptoms" className="relative scroll-mt-20 border-t border-wine/10">
      <SymptomsReveal />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24">
        <SectionLabel>Symptoms</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl">
          Symptoms &amp; management
        </h2>

        <p className="mt-4 text-ink/70">
          These are some of the most common symptoms and approaches. PCOS can show up differently
          for everyone, and this isn&rsquo;t the full list. If something doesn&rsquo;t feel right,
          even if it&rsquo;s not listed here, it&rsquo;s worth bringing up with your doctor.
        </p>

        <div className="mt-10 space-y-4">
          {CARDS.map((card) => (
            <SymptomCard key={card.symptom} {...card} />
          ))}
        </div>

        <div className="mt-10">
          <DisclaimerNote />
        </div>

        <Sources />
      </div>
    </section>
  )
}
