/* ============================================================================
   MLOPS — VERBATIM vs COMMENTARY (FULL PAPER)
   ----------------------------------------------------------------------------
   Every substantive paragraph of:
     Kreuzberger, Kühl, Hirschl — "Machine Learning Operations (MLOps):
     Overview, Definition, and Architecture" (arXiv:2205.02302v3)
   transcribed VERBATIM (full text, no summarising, no shortening) and paired,
   side by side, with:
     • tldr      — "Pe scurt" (descriere simplistă / simplificată, RO)
     • plain     — comentariu pe înțelesul tuturor (RO)
     • realworld — exemple concrete din lumea reală
     • services  — servicii/tooluri care există și CUM se fituie ele

   Rendered by mlops-guide.html using window.MLOPS_DOC.renderEntry (shared with
   mlops-verbatim.js — same two-column "verbatim left / commentary right" card).
   ============================================================================ */
(function (global) {
  "use strict";

  const P = [];
  function add(o) { P.push(o); }

  /* =========================== ABSTRACT =============================== */
  add({
    section: "Abstract", tag: "ABS", title: "Abstract",
    verbatim:
`The final goal of all industrial machine learning (ML) projects is to develop ML products and rapidly bring them into production. However, it is highly challenging to automate and operationalize ML products and thus many ML endeavors fail to deliver on their expectations. The paradigm of Machine Learning Operations (MLOps) addresses this issue. MLOps includes several aspects, such as best practices, sets of concepts, and development culture. However, MLOps is still a vague term and its consequences for researchers and professionals are ambiguous. To address this gap, we conduct mixed-method research, including a literature review, a tool review, and expert interviews. As a result of these investigations, we provide an aggregated overview of the necessary principles, components, and roles, as well as the associated architecture and workflows. Furthermore, we furnish a definition of MLOps and highlight open challenges in the field. Finally, this work provides guidance for ML researchers and practitioners who want to automate and operate their ML products with a designated set of technologies.`,
    tldr: "Scopul oricărui proiect ML e producția; e greu, multe eșuează; MLOps + această cercetare (literatură + unelte + interviuri) dau rețeta.",
    plain:
`Acesta e „rezumatul de copertă” al lucrării. Spune trei lucruri: (1) ținta reală nu e un model bun, ci un PRODUS în producție; (2) automatizarea/operarea e partea grea unde cad proiectele; (3) ca să clarifice termenul vag „MLOps”, autorii au combinat trei metode de cercetare și livrează principii + componente + roluri + arhitectură + definiție + provocări.`,
    realworld: [
      "Un PoC strălucit demonstrat managementului care nu ajunge niciodată live — exact „fail to deliver on expectations”.",
      "Echipe care confundă „am antrenat modelul” cu „am livrat produsul”."
    ],
    services: [
      { name: "Platforme end-to-end", fit: "SageMaker / Vertex AI / Azure ML / Databricks — încearcă să acopere tot lanțul într-un set de tehnologii." }
    ]
  });

  add({
    section: "Abstract", tag: "KW", title: "Keywords",
    verbatim: `CI/CD, DevOps, Machine Learning, MLOps, Operations, Workflow Orchestration`,
    tldr: "Cuvintele-cheie spun pe scurt din ce e făcut MLOps.",
    plain:
`Cuvintele-cheie sunt o hartă în miniatură: MLOps = ML + DevOps + CI/CD + orchestrare de workflow + operare. Dacă reții doar atât, ai deja scheletul.`,
    realworld: ["Orice anunț de job „MLOps Engineer” conține fix aceste cuvinte."],
    services: []
  });

  /* =========================== 1 INTRODUCTION ======================== */
  add({
    section: "1 · Introduction", tag: "¶1", title: "Why ML projects fail",
    verbatim:
`Machine Learning (ML) has become an important technique to leverage the potential of data and allows businesses to be more innovative [1], efficient [13], and sustainable [22]. However, the success of many productive ML applications in real-world settings falls short of expectations [21]. A large number of ML projects fail—with many ML proofs of concept never progressing as far as production [30]. From a research perspective, this does not come as a surprise as the ML community has focused extensively on the building of ML models, but not on (a) building production-ready ML products and (b) providing the necessary coordination of the resulting, often complex ML system components and infrastructure, including the roles required to automate and operate an ML system in a real-world setting [35]. For instance, in many industrial applications, data scientists still manage ML workflows manually to a great extent, resulting in many issues during the operations of the respective ML solution [26].`,
    tldr: "ML aduce valoare, dar majoritatea proiectelor nu ajung în producție fiindcă lumea s-a ocupat de modele, nu de operare.",
    plain:
`Diagnoza problemei. Cercetarea ML s-a concentrat 99% pe „modelul perfect” și aproape deloc pe (a) produsul gata de producție și (b) coordonarea pieselor + a oamenilor care îl operează. Rezultatul concret: data scientistul face totul manual, deci fragil.`,
    realworld: [
      "Reantrenare făcută manual „când are timp cineva” → modelul rămâne în urmă.",
      "Un singur om știe să ruleze pipeline-ul; pleacă în concediu → nimeni nu poate."
    ],
    services: [
      { name: "Airflow / Prefect / Dagster", fit: "Înlocuiesc workflow-ul manual cu unul automat, repornibil." }
    ]
  });
  add({
    section: "1 · Introduction", tag: "¶2", title: "Goal & research question",
    verbatim:
`To address these issues, the goal of this work is to examine how manual ML processes can be automated and operationalized so that more ML proofs of concept can be brought into production. In this work, we explore the emerging ML engineering practice "Machine Learning Operations"—MLOps for short—precisely addressing the issue of designing and maintaining productive ML. We take a holistic perspective to gain a common understanding of the involved principles, components, roles, and architectures. While existing research sheds some light on various specific aspects of MLOps, a holistic conceptualization, generalization, and clarification of ML systems design are still missing. Different perspectives and conceptions of the term "MLOps" might lead to misunderstandings and miscommunication, which, in turn, can lead to errors in the overall setup of the entire ML system. Thus, we ask the research question: RQ: What is MLOps?`,
    tldr: "Întrebarea centrală a lucrării: „Ce este MLOps?” — privit holistic, nu pe bucăți.",
    plain:
`Aici își fixează misiunea: nu să inventeze un tool nou, ci să UNIFICE. Pentru că dacă fiecare înțelege altceva prin „MLOps”, echipele comunică greșit și construiesc sisteme greșite. De aici și întrebarea de cercetare explicită: RQ: What is MLOps?`,
    realworld: [
      "Doi colegi spun „facem MLOps”: unul se gândește doar la CI/CD, altul la monitorizare — și se ceartă degeaba.",
    ],
    services: []
  });
  add({
    section: "1 · Introduction", tag: "¶3", title: "Four contributions",
    verbatim:
`To answer that question, we conduct a mixed-method research endeavor to (a) identify important principles of MLOps, (b) carve out functional core components, (c) highlight the roles necessary to successfully implement MLOps, and (d) derive a general architecture for ML systems design. In combination, these insights result in a definition of MLOps, which contributes to a common understanding of the term and related concepts.`,
    tldr: "Patru livrabile: principii, componente, roluri, arhitectură → din care iese definiția.",
    plain:
`Promisiunea concretă a lucrării, în patru piese (a–d). Cele patru piese sunt fix structura ghidului ăstuia: 9 principii, 9 componente, 7 roluri și arhitectura din Figura 4. Le pui cap la cap și obții definiția.`,
    realworld: ["Acest ghid interactiv = o materializare directă a celor patru contribuții (a–d)."],
    services: []
  });
  add({
    section: "1 · Introduction", tag: "¶4", title: "Intended impact",
    verbatim:
`In so doing, we hope to positively impact academic and practical discussions by providing clear guidelines for professionals and researchers alike with precise responsibilities. These insights can assist in allowing more proofs of concept to make it into production by having fewer errors in the system's design and, finally, enabling more robust predictions in real-world environments.`,
    tldr: "Scopul practic: ghiduri clare + responsabilități clare → mai multe PoC-uri ajung live, cu mai puține erori.",
    plain:
`„De ce ar trebui să-ți pese.” Dacă fiecare rol știe exact ce are de făcut (responsabilități precise), apar mai puține erori de design și mai multe modele rezistă în producția reală.`,
    realworld: ["O matrice RACI clară (cine e Responsabil/Aprobator) pe pipeline-ul ML reduce „credeam că faci tu”."],
    services: []
  });
  add({
    section: "1 · Introduction", tag: "¶5", title: "Paper structure",
    verbatim:
`The remainder of this work is structured as follows. We will first elaborate on the necessary foundations and related work in the field. Next, we will give an overview of the utilized methodology, consisting of a literature review, a tool review, and an interview study. We then present the insights derived from the application of the methodology and conceptualize the term by providing a unifying definition. We conclude the paper with a short summary, limitations, and outlook.`,
    tldr: "Harta lucrării: fundamente → metodologie → rezultate + definiție → concluzie.",
    plain:
`Doar cuprinsul, dar util ca să știi unde ești. Restul comentariului urmează exact această ordine.`,
    realworld: [],
    services: []
  });

  /* =========================== 2 FOUNDATIONS OF DEVOPS =============== */
  add({
    section: "2 · Foundations of DevOps", tag: "§2", title: "DevOps — the parent paradigm",
    verbatim:
`In the past, different software process models and development methodologies surfaced in the field of software engineering. Prominent examples include waterfall [37] and the agile manifesto [5]. Those methodologies have similar aims, namely to deliver production-ready software products. A concept called "DevOps" emerged in the years 2008/2009 and aims to reduce issues in software development [9,31]. DevOps is more than a pure methodology and rather represents a paradigm addressing social and technical issues in organizations engaged in software development. It has the goal of eliminating the gap between development and operations and emphasizes collaboration, communication, and knowledge sharing. It ensures automation with continuous integration, continuous delivery, and continuous deployment (CI/CD), thus allowing for fast, frequent, and reliable releases. Moreover, it is designed to ensure continuous testing, quality assurance, continuous monitoring, logging, and feedback loops. Due to the commercialization of DevOps, many DevOps tools are emerging, which can be differentiated into six groups [23,28]: collaboration and knowledge sharing (e.g., Slack, Trello, GitLab wiki), source code management (e.g., GitHub, GitLab), build process (e.g., Maven), continuous integration (e.g., Jenkins, GitLab CI), deployment automation (e.g., Kubernetes, Docker), monitoring and logging (e.g., Prometheus, Logstash). Cloud environments are increasingly equipped with ready-to-use DevOps tooling that is designed for cloud use, facilitating the efficient generation of value [38]. With this work shift towards DevOps, developers need to care about what they develop, as they need to operate it as well. As empirical results demonstrate, DevOps ensures better software quality [34]. People in the industry, as well as academics, have gained a wealth of experience in software engineering using DevOps. This experience is now being used to automate and operationalize ML.`,
    tldr: "DevOps (din 2008/2009) = cultură + automatizare CI/CD + monitorizare; MLOps moștenește totul de aici.",
    plain:
`Capitolul ăsta spune „nu reinventăm roata”. DevOps a rezolvat deja, în software, cearta Dev↔Ops prin colaborare + automatizare + feedback. Are 6 grupe de unelte (colaborare, source control, build, CI, deploy, monitorizare). MLOps ia exact aceste reflexe și unelte și le extinde la modele și date. „Developerii trebuie să le și opereze” = principiul „you build it, you run it”.`,
    realworld: [
      "O echipă SaaS care livrează de zeci de ori pe zi cu GitHub Actions + Kubernetes + Prometheus.",
      "Cele 6 grupe de unelte sunt fix stack-ul pe care orice firmă de software îl are deja."
    ],
    services: [
      { name: "Slack / Trello / GitLab Wiki", fit: "Grupa 1 — colaborare & knowledge sharing." },
      { name: "GitHub / GitLab + Maven + Jenkins/GitLab CI", fit: "Grupele 2–4 — source control, build, CI." },
      { name: "Docker / Kubernetes + Prometheus / Logstash", fit: "Grupele 5–6 — deploy & monitorizare; refolosite direct de MLOps." }
    ]
  });

  /* =========================== 3 METHODOLOGY ======================== */
  add({
    section: "3 · Methodology", tag: "§3", title: "Mixed-method approach",
    verbatim:
`To derive insights from the academic knowledge base while also drawing upon the expertise of practitioners from the field, we apply a mixed-method approach, as depicted in Figure 1. As a first step, we conduct a structured literature review [20,43] to obtain an overview of relevant research. Furthermore, we review relevant tooling support in the field of MLOps to gain a better understanding of the technical components involved. Finally, we conduct semi-structured interviews [33,39] with experts from different domains. On that basis, we conceptualize the term "MLOps" and elaborate on our findings by synthesizing literature and interviews in the next chapter ("Results").`,
    tldr: "Trei surse combinate: literatură + unelte + interviuri cu experți.",
    plain:
`Cum au ajuns la concluzii — și de ce să ai încredere. Nu e o părere, ci un triunghi: ce zice teoria (papers), ce există în practică (tools) și ce spun experții (interviuri). Combinarea celor trei = robustețe.`,
    realworld: ["E metoda standard de cercetare „mixed-method” — la fel cum un jurnalist verifică o știre din 3 surse."],
    services: []
  });
  add({
    section: "3 · Methodology", tag: "3.1", title: "Literature Review",
    verbatim:
`To ensure that our results are based on scientific knowledge, we conduct a systematic literature review according to the method of Webster and Watson [43] and Kitchenham et al. [20]. After an initial exploratory search, we define our search query as follows: ((("DevOps" OR "CICD" OR "Continuous Integration" OR "Continuous Delivery" OR "Continuous Deployment") AND "Machine Learning") OR "MLOps" OR "CD4ML"). We query the scientific databases of Google Scholar, Web of Science, Science Direct, Scopus, and the Association for Information Systems eLibrary. It should be mentioned that the use of DevOps for ML, MLOps, and continuous practices in combination with ML is a relatively new field in academic literature. Thus, only a few peer-reviewed studies are available at the time of this research. Nevertheless, to gain experience in this area, the search included non-peer-reviewed literature as well. The search was performed in May 2021 and resulted in 1,864 retrieved articles. Of those, we screened 194 papers in detail. From that group, 27 articles were selected based on our inclusion and exclusion criteria (e.g., the term MLOps or DevOps and CI/CD in combination with ML was described in detail, the article was written in English, etc.). All 27 of these articles were peer-reviewed.`,
    tldr: "Au căutat sistematic, au găsit 1.864 articole, au filtrat la 194, apoi la 27 relevante.",
    plain:
`Pâlnia de selecție: pornesc de la o interogare precisă (vezi paranteza cu OR/AND), o rulează pe bazele științifice mari, scot 1.864 rezultate, citesc atent 194 și rețin 27 solide. Mesajul subtil: în mai 2021 MLOps era încă un subiect tânăr academic (puține peer-reviewed).`,
    realworld: ["Aceeași tehnică de „funnel” o folosești când faci research de piață: multe lead-uri → puține relevante."],
    services: [
      { name: "Google Scholar / Scopus / Web of Science", fit: "Bazele de date interogate pentru literatură." }
    ]
  });
  add({
    section: "3 · Methodology", tag: "3.2", title: "Tool Review",
    verbatim:
`After going through 27 articles and eight interviews, various open-source tools, frameworks, and commercial cloud ML services were identified. These tools, frameworks, and ML services were reviewed to gain an understanding of the technical components of which they consist. An overview of the identified tools is depicted in Table 1 of the Appendix.`,
    tldr: "Au inventariat uneltele reale (open-source + cloud) ca să deducă din ce componente sunt făcute.",
    plain:
`Pasul „practic”: în loc să teoretizeze componentele, se uită la ce unelte EXISTĂ deja și fac reverse-engineering — dacă toate uneltele au un „feature store”, atunci feature store-ul e o componentă reală.`,
    realworld: ["Exact ce facem în acest ghid la fiecare componentă: listăm uneltele care o implementează."],
    services: [
      { name: "MLflow, Kubeflow, Feast, SageMaker, Vertex AI…", fit: "Genul de unelte inventariate în Table 1." }
    ]
  });
  add({
    section: "3 · Methodology", tag: "3.3", title: "Interview Study — sampling",
    verbatim:
`To answer the research questions with insights from practice, we conduct semi-structured expert interviews according to Myers and Newman [33]. One major aspect in the research design of expert interviews is choosing an appropriate sample size [8]. We apply a theoretical sampling approach [12], which allows us to choose experienced interview partners to obtain high-quality data. Such data can provide meaningful insights with a limited number of interviews. To get an adequate sample group and reliable insights, we use LinkedIn—a social network for professionals—to identify experienced ML professionals with profound MLOps knowledge on a global level. To gain insights from various perspectives, we choose interview partners from different organizations and industries, different countries and nationalities, as well as different genders. Interviews are conducted until no new categories and concepts emerge in the analysis of the data. In total, we conduct eight interviews with experts (α – θ), whose details are depicted in Table 2 of the Appendix. According to Glaser and Strauss [5, p.61], this stage is called "theoretical saturation." All interviews are conducted between June and August 2021.`,
    tldr: "8 experți aleși de pe LinkedIn, divers, până la „saturație teoretică” (nu mai apar idei noi).",
    plain:
`De ce 8 interviuri sunt suficiente: nu contează numărul, ci „theoretical saturation” — te oprești când oameni noi nu mai aduc idei noi. Experții (notați α–θ) sunt referințele care apar în paranteze peste tot în paper (ex. „[α, β]”).`,
    realworld: ["UX research folosește același principiu: ~5–8 interviuri prind majoritatea problemelor."],
    services: [
      { name: "LinkedIn", fit: "Sursa de recrutare a experților." }
    ]
  });
  add({
    section: "3 · Methodology", tag: "3.3", title: "Interview Study — design & coding",
    verbatim:
`With regard to the interview design, we prepare a semi-structured guide with several questions, documented as an interview script [33]. During the interviews, "soft laddering" is used with "how" and "why" questions to probe the interviewees' means-end chain [39]. This methodical approach allowed us to gain additional insight into the experiences of the interviewees when required. All interviews are recorded and then transcribed. To evaluate the interview transcripts, we use an open coding scheme [8].`,
    tldr: "Interviuri semi-structurate cu întrebări „cum/de ce”, transcrise și codificate.",
    plain:
`Tehnica „soft laddering” = sapă cu „de ce?” repetat ca să ajungi la motivația reală, nu la răspunsul de suprafață. Apoi transcrierile sunt „codate” (etichetate pe teme) ca să iasă tiparele — de aici principiile și componentele.`,
    realworld: ["„De ce?” de 5 ori (ca la analiza cauzei rădăcină) e fix soft laddering."],
    services: []
  });

  /* =========================== 4 RESULTS ============================ */
  add({
    section: "4 · Results", tag: "§4", title: "Results — overview",
    verbatim:
`We apply the described methodology and structure our resulting insights into a presentation of important principles, their resulting instantiation as components, the description of necessary roles, as well as a suggestion for the architecture and workflow resulting from the combination of these aspects. Finally, we derive the conceptualization of the term and provide a definition of MLOps.`,
    tldr: "Capitolul de rezultate: principii → componente → roluri → arhitectură → definiție.",
    plain:
`Lanțul logic al întregului paper, într-o frază: principiile (ce vrem) devin componente (cu ce facem), operate de roluri (cine face), asamblate într-o arhitectură (cum se leagă), din care iese definiția.`,
    realworld: [],
    services: []
  });
  add({
    section: "4.1 · Principles", tag: "4.1", title: "What a principle is",
    verbatim:
`A principle is viewed as a general or basic truth, a value, or a guide for behavior. In the context of MLOps, a principle is a guide to how things should be realized in MLOps and is closely related to the term "best practices" from the professional sector. Based on the outlined methodology, we identified nine principles required to realize MLOps. Figure 2 provides an illustration of these principles and links them to the components with which they are associated.`,
    tldr: "Un principiu = o „best practice” / regulă de comportament; sunt 9 la număr.",
    plain:
`Definește vocabularul înainte de listă: „principiu” = ce ar trebui să faci (valoare/regulă), iar „componentă” (urmează) = cu ce o faci. Figura 2 leagă fiecare principiu de componentele care îl implementează.`,
    realworld: ["Ca diferența dintre „mănâncă sănătos” (principiu) și „frigider + rețete” (componente)."],
    services: []
  });

  /* ---- P1..P9 (full verbatim incl. references) ---- */
  add({ section: "4.1 · Principles", tag: "P1", title: "P1 · CI/CD automation",
    verbatim:`CI/CD automation. CI/CD automation provides continuous integration, continuous delivery, and continuous deployment. It carries out the build, test, delivery, and deploy steps. It provides fast feedback to developers regarding the success or failure of certain steps, thus increasing the overall productivity [15,17,26,27,35,42,46] [α, β, θ].`,
    tldr:"Cod nou ⇒ build + test + livrare + deploy automate, cu feedback rapid.",
    plain:`Robotul care, la fiecare schimbare, construiește, testează și livrează. Dacă pică ceva afli imediat, nu în producție. „Productivitate mai mare” = oamenii nu mai pierd timp cu pași manuali.`,
    realworld:["Un push declanșează testele și împachetează imaginea modelului."],
    services:[{name:"Jenkins / GitHub Actions / GitLab CI",fit:"Motoare CI/CD."},{name:"Argo CD",fit:"Continuous deployment GitOps pe Kubernetes."}] });
  add({ section: "4.1 · Principles", tag: "P2", title: "P2 · Workflow orchestration",
    verbatim:`Workflow orchestration. Workflow orchestration coordinates the tasks of an ML workflow pipeline according to directed acyclic graphs (DAGs). DAGs define the task execution order by considering relationships and dependencies [14,17,26,32,40,41] [α, β, γ, δ, ζ, η].`,
    tldr:"Un DAG decide ordinea pașilor și dependențele dintre ei.",
    plain:`Pipeline-ul ML are pași care depind unul de altul. DAG-ul (graf fără cicluri) e „rețeta cu ordine”: pasul B pornește doar după ce A e gata. Orchestratorul rulează rețeta singur.`,
    realworld:["extrage → curăță → antrenează → validează → publică, ca un graf nocturn."],
    services:[{name:"Airflow / Prefect / Dagster",fit:"Orchestrare generală."},{name:"Kubeflow / SageMaker / Vertex Pipelines",fit:"Orchestrare nativ ML."}] });
  add({ section: "4.1 · Principles", tag: "P3", title: "P3 · Reproducibility",
    verbatim:`Reproducibility. Reproducibility is the ability to reproduce an ML experiment and obtain the exact same results [14,32,40,46] [α, β, δ, ε, η].`,
    tldr:"Rulezi din nou același experiment ⇒ exact același rezultat.",
    plain:`Dacă nu poți reface bit-cu-bit un model (aceleași date+cod+parametri+mediu), nu poți nici depana, nici dovedi nimic. Reproductibilitatea e baza încrederii.`,
    realworld:["Un auditor cere să reproduci modelul care a refuzat un credit."],
    services:[{name:"DVC / LakeFS",fit:"Versionare date."},{name:"MLflow / Git / Docker / conda",fit:"Cod, parametri, mediu."}] });
  add({ section: "4.1 · Principles", tag: "P4", title: "P4 · Versioning",
    verbatim:`Versioning. Versioning ensures the versioning of data, model, and code to enable not only reproducibility, but also traceability (for compliance and auditing reasons) [14,32,40,46] [α, β, δ, ε, η].`,
    tldr:"Versionezi TREI lucruri: date, model ȘI cod.",
    plain:`În software versionezi codul; în ML rezultatul depinde și de date și de model, deci versionezi toate trei. Așa poți spune „model v3 = date v7 + cod abc123”. Necesare pentru audit/compliance.`,
    realworld:["Bancar: trebuie să arăți exact ce date au produs decizia modelului."],
    services:[{name:"Git",fit:"Cod."},{name:"DVC / LakeFS",fit:"Date."},{name:"MLflow Model Registry",fit:"Model + versiune."}] });
  add({ section: "4.1 · Principles", tag: "P5", title: "P5 · Collaboration",
    verbatim:`Collaboration. Collaboration ensures the possibility to work collaboratively on data, model, and code. Besides the technical aspect, this principle emphasizes a collaborative and communicative work culture aiming to reduce domain silos between different roles [14,26,40] [α, δ, θ].`,
    tldr:"Date, model și cod lucrabile în echipă; spargi silozurile.",
    plain:`Nu doar unelte, ci CULTURĂ. Data scientist, data engineer și DevOps trebuie să lucreze pe aceleași artefacte, nu fiecare în colțul lui. Silozurile = dușmanul nr. 1 al MLOps.`,
    realworld:["Repo + feature store comune în loc de fișiere pe mail."],
    services:[{name:"GitHub / GitLab",fit:"Cod + review comun."},{name:"Feature store partajat",fit:"Feature-uri reutilizate de toți."}] });
  add({ section: "4.1 · Principles", tag: "P6", title: "P6 · Continuous ML training & evaluation",
    verbatim:`Continuous ML training & evaluation. Continuous training means periodic retraining of the ML model based on new feature data. Continuous training is enabled through the support of a monitoring component, a feedback loop, and an automated ML workflow pipeline. Continuous training always includes an evaluation run to assess the change in model quality [10,17,19,46] [β, δ, η, θ].`,
    tldr:"Reantrenare periodică pe date noi + evaluare de fiecare dată.",
    plain:`Modelul „îmbătrânește” pentru că lumea se schimbă. Continuous training = automat (programat sau la drift) reantrenezi, dar NICIODATĂ nu publici fără să verifici că a devenit mai bun (evaluare).`,
    realworld:["Recomandări reantrenate zilnic ca să prindă trendurile."],
    services:[{name:"Kubeflow / SageMaker / Vertex Pipelines / TFX",fit:"Pipeline de (re)antrenare + evaluare."}] });
  add({ section: "4.1 · Principles", tag: "P7", title: "P7 · ML metadata tracking/logging",
    verbatim:`ML metadata tracking/logging. Metadata is tracked and logged for each orchestrated ML workflow task. Metadata tracking and logging is required for each training job iteration (e.g., training date and time, duration, etc.), including the model specific metadata—e.g., used parameters and the resulting performance metrics, model lineage: data and code used—to ensure the full traceability of experiment runs [26,27,29,32,35] [α, β, δ, ε, ζ, η, θ].`,
    tldr:"Fiecare antrenare notează: când, cât, ce parametri, ce date/cod, ce scor.",
    plain:`Un jurnal de bord automat. „Lineage” = lanțul date→cod→model. Cu el compari 200 de rulări și știi exact care e cel mai bun și DE CE.`,
    realworld:["Grafic cu 50 de rulări → alegi modelul cu cel mai bun F1."],
    services:[{name:"MLflow / Weights & Biases / Neptune.ai",fit:"Tracking parametri+metrici."},{name:"Vertex ML Metadata",fit:"Lineage în cloud."}] });
  add({ section: "4.1 · Principles", tag: "P8", title: "P8 · Continuous monitoring",
    verbatim:`Continuous monitoring. Continuous monitoring implies the periodic assessment of data, model, code, infrastructure resources, and model serving performance (e.g., prediction accuracy) to detect potential errors or changes that influence the product quality [4,7,10,27,29,42,46] [α, β, γ, δ, ε, ζ, η].`,
    tldr:"Urmărești non-stop date, model, infra și acuratețea predicțiilor.",
    plain:`După deploy nu te culci pe lauri. Monitorizezi continuu ca să prinzi degradarea ÎNAINTE ca businessul să simtă. Atenție: nu doar „serverul e viu”, ci „modelul mai e bun?”.`,
    realworld:["Alarmă la scădere de acuratețe sau la drift al datelor de intrare."],
    services:[{name:"Prometheus + Grafana",fit:"Infra/serving."},{name:"Evidently / Arize / WhyLabs / Fiddler",fit:"Drift & calitate model."}] });
  add({ section: "4.1 · Principles", tag: "P9", title: "P9 · Feedback loops",
    verbatim:`Feedback loops. Multiple feedback loops are required to integrate insights from the quality assessment step into the development or engineering process (e.g., a feedback loop from the experimental model engineering stage to the previous feature engineering stage). Another feedback loop is required from the monitoring component (e.g., observing the model serving performance) to the scheduler to enable the retraining [4,6,7,17,27,46] [α, β, δ, ζ, η, θ].`,
    tldr:"Ce afli din monitorizare se întoarce automat în pașii dinainte.",
    plain:`Sistemul e circular, nu liniar. Două bucle cheie: (1) de la experiment înapoi la feature engineering; (2) de la monitorizare la scheduler (declanșează reantrenarea). Asta face sistemul „viu”.`,
    realworld:["Drift detectat → automat pornește un DAG de reantrenare."],
    services:[{name:"Monitor → Orchestrator",fit:"Evidently/Arize declanșează Airflow/Kubeflow."}] });

  /* ---- 4.2 Components ---- */
  add({ section: "4.2 · Components", tag: "4.2", title: "Components — intro",
    verbatim:`After identifying the principles that need to be incorporated into MLOps, we now elaborate on the precise components and implement them in the ML systems design. In the following, the components are listed and described in a generic way with their essential functionalities. The references in brackets refer to the respective principles that the technical components are implementing.`,
    tldr:"Componentele sunt piesele concrete care implementează principiile; parantezele arată ce principiu acoperă fiecare.",
    plain:`Tranziția principii → componente. Reține trucul: după fiecare componentă apare „(P1, P6…)” = ce principii bifează. Descrierile sunt „generice” intenționat, ca să fie agnostice de vendor.`,
    realworld:[],
    services:[] });
  add({ section: "4.2 · Components", tag: "C1", title: "C1 · CI/CD Component",
    verbatim:`C1 CI/CD Component (P1, P6, P9). The CI/CD component ensures continuous integration, continuous delivery, and continuous deployment. It takes care of the build, test, delivery, and deploy steps. It provides rapid feedback to developers regarding the success or failure of certain steps, thus increasing the overall productivity [10,15,17,26,35,46] [α, β, γ, ε, ζ, η]. Examples are Jenkins [17,26] and GitHub actions (η).`,
    tldr:"Motorul care construiește, testează și livrează la fiecare schimbare.",
    plain:`Implementarea concretă a principiului P1. Detectează commit-ul, pornește build+test, împinge artefactul mai departe. E „inima” automatizării.`,
    realworld:["La fiecare push se rulează testele și se publică imaginea modelului în registry."],
    services:[{name:"Jenkins",fit:"Self-hosted, flexibil."},{name:"GitHub Actions / GitLab CI",fit:"Integrate în repo."}] });
  add({ section: "4.2 · Components", tag: "C2", title: "C2 · Source Code Repository",
    verbatim:`C2 Source Code Repository (P4, P5). The source code repository ensures code storing and versioning. It allows multiple developers to commit and share their code [17,25,42,44,46] [α, β, γ, ζ, θ]. Examples include Bitbucket [11] [ζ], GitLab [11,17] [ζ], GitHub [25] [ζ, η], and Gitea [46].`,
    tldr:"Locul unde stă și se versionează codul, partajat de toți.",
    plain:`Baza colaborării (P5) și a versionării codului (P4). Tot codul — de pipeline, training, serving — trăiește aici, cu istoric și review.`,
    realworld:["Repo central: DS comite codul de training, DevOps codul de pipeline."],
    services:[{name:"GitHub / GitLab / Bitbucket / Gitea",fit:"Hosting Git cu PR-uri."}] });
  add({ section: "4.2 · Components", tag: "C3", title: "C3 · Workflow Orchestration Component",
    verbatim:`C3 Workflow Orchestration Component (P2, P3, P6). The workflow orchestration component offers task orchestration of an ML workflow via directed acyclic graphs (DAGs). These graphs represent execution order and artifact usage of single steps of the workflow [26,32,35,40,41,46] [α, β, γ, δ, ε, ζ, η]. Examples include Apache Airflow [α, ζ], Kubeflow Pipelines [ζ], Luigi [ζ], AWS SageMaker Pipelines [β], and Azure Pipelines [ε].`,
    tldr:"Dirijorul care chiar execută DAG-ul pașilor.",
    plain:`Implementarea P2: pornește fiecare task când dependențele sunt gata, mută artefactele între pași și strânge log-uri. E componenta centrală a Zonei D din Figura 4.`,
    realworld:["Airflow rulează nocturn DAG-ul de reantrenare și retrimite pașii picați."],
    services:[{name:"Airflow / Luigi",fit:"Orchestrare generală."},{name:"Kubeflow / SageMaker / Azure Pipelines",fit:"Orchestrare ML."}] });
  add({ section: "4.2 · Components", tag: "C4", title: "C4 · Feature Store System",
    verbatim:`C4 Feature Store System (P3, P4). A feature store system ensures central storage of commonly used features. It has two databases configured: One database as an offline feature store to serve features with normal latency for experimentation, and one database as an online feature store to serve features with low latency for predictions in production [10,14] [α, β, ζ, ε, θ]. Examples include Google Feast [ζ], Amazon AWS Feature Store [ζ], Tecton.ai and Hopsworks.ai [ζ]. This is where most of the data for training ML models will come from. Moreover, data can also come directly from any kind of data store.`,
    tldr:"Depozit central de feature-uri: bază offline (training) + online (producție rapidă).",
    plain:`Rezolvă „training/serving skew”: feature-urile de la antrenare trebuie să fie IDENTICE cu cele de la predicție. Offline = latanță normală pentru experimente; online = latanță mică pentru real-time.`,
    realworld:["„Cheltuieli 30 zile” calculat o dată, reutilizat identic de toate modelele."],
    services:[{name:"Feast",fit:"Open-source."},{name:"Tecton / Hopsworks",fit:"Enterprise."},{name:"SageMaker / Vertex / Databricks Feature Store",fit:"Cloud."}] });
  add({ section: "4.2 · Components", tag: "C5", title: "C5 · Model Training Infrastructure",
    verbatim:`C5 Model Training Infrastructure (P6). The model training infrastructure provides the foundational computation resources, e.g., CPUs, RAM, and GPUs. The provided infrastructure can be either distributed or non-distributed. In general, a scalable and distributed infrastructure is recommended [7,10,24–26,29,40,45,46] [δ, ζ, η, θ]. Examples include local machines (not scalable) or cloud computation [7] [η, θ], as well as non-distributed or distributed computation (several worker nodes) [25,27]. Frameworks supporting infrastructure are Kubernetes [η, θ] and Red Hat OpenShift [γ].`,
    tldr:"Mușchii de calcul (CPU/GPU/RAM), ideal scalabili și distribuiți.",
    plain:`Antrenarea cere putere. Local = simplu dar nescalabil; cloud/distribuit = scalabil. Recomandarea clară: scalabil & distribuit, ca să faci față cererii variabile.`,
    realworld:["Cluster K8s cu noduri GPU care pornesc doar la job de training."],
    services:[{name:"Kubernetes / Red Hat OpenShift",fit:"Orchestrare resurse."},{name:"Ray / SageMaker / Vertex Training",fit:"Training distribuit managed."}] });
  add({ section: "4.2 · Components", tag: "C6", title: "C6 · Model Registry",
    verbatim:`C6 Model Registry (P3, P4). The model registry stores centrally the trained ML models together with their metadata. It has two main functionalities: storing the ML artifact and storing the ML metadata (see C7) [4,6,14,17,26,27] [α, β, γ, ε, ζ, η, θ]. Advanced storage examples include MLflow [α, η, ζ], AWS SageMaker Model Registry [ζ], Microsoft Azure ML Model Registry [ζ], and Neptune.ai [α]. Simple storage examples include Microsoft Azure Storage, Google Cloud Storage, and Amazon AWS S3 [17].`,
    tldr:"Raftul oficial cu modele antrenate + metadate + status (staging/prod).",
    plain:`După un model bun, îl pui în registry; de acolo se ia la deploy. Variantă „avansată” (MLflow) știe versiuni și status; variantă „simplă” = doar fișiere pe S3/GCS.`,
    realworld:["Promovezi v5 din „staging” în „production” → declanșează deploy-ul."],
    services:[{name:"MLflow / Neptune.ai",fit:"Registry avansat."},{name:"SageMaker / Azure / Vertex Registry",fit:"Cloud."},{name:"S3 / GCS / Azure Storage",fit:"Variantă simplă."}] });
  add({ section: "4.2 · Components", tag: "C7", title: "C7 · ML Metadata Stores",
    verbatim:`C7 ML Metadata Stores (P4, P7). ML metadata stores allow for the tracking of various kinds of metadata, e.g., for each orchestrated ML workflow pipeline task. Another metadata store can be configured within the model registry for tracking and logging the metadata of each training job (e.g., training date and time, duration, etc.), including the model specific metadata—e.g., used parameters and the resulting performance metrics, model lineage: data and code used [14,25–27,32] [α, β, δ, ε, θ]. Examples include orchestrators with built-in metadata stores tracking each step of experiment pipelines [α] such as Kubeflow Pipelines [α,ζ], AWS SageMaker Pipelines [α,ζ], Azure ML, and IBM Watson Studio [γ]. MLflow provides an advanced metadata store in combination with the model registry [32,35].`,
    tldr:"Baza de date cu istoricul tuturor antrenărilor + lineage (date+cod).",
    plain:`Sora lui P7: locul concret unde se scriu metadatele. De obicei e integrat în orchestrator sau în registry. Fără el nu poți răspunde la „de unde vine modelul ăsta?”.`,
    realworld:["Cauți de ce modelul din martie era mai bun → vezi datele/parametrii lui."],
    services:[{name:"MLflow",fit:"Metadata + registry împreună."},{name:"Kubeflow / SageMaker / Azure / Vertex ML Metadata",fit:"Integrat în orchestrator."}] });
  add({ section: "4.2 · Components", tag: "C8", title: "C8 · Model Serving Component",
    verbatim:`C8 Model Serving Component (P1). The model serving component can be configured for different purposes. Examples are online inference for real-time predictions or batch inference for predictions using large volumes of input data. The serving can be provided, e.g., via a REST API. As a foundational infrastructure layer, a scalable and distributed model serving infrastructure is recommended [7,11,25,40,45,46] [α, β, δ, ζ, η, θ]. One example of a model serving configuration is the use of a Kubernetes and Docker technology to containerize the ML model, and leveraging a Python web application framework like Flask [17] with an API for serving [α]. Other Kubernetes supported frameworks are KServing of Kubeflow [α], TensorFlow Serving, and Seldon.io serving [40]. Inferencing could also be realized with Apache Spark for batch predictions [θ].`,
    tldr:"Piesa care servește predicțiile: real-time (REST) sau batch.",
    plain:`După deploy, cineva răspunde la cereri. Online = instant prin API (fraudă la plată). Batch = milioane de rânduri o dată (scoring nocturn). De obicei modelul e containerizat și expus prin REST.`,
    realworld:["Endpoint REST: primește o tranzacție, răspunde în ~50ms „fraudă da/nu”."],
    services:[{name:"KServe / TF Serving / Seldon",fit:"Serving pe K8s."},{name:"BentoML / Triton / Flask",fit:"Model ca API."},{name:"SageMaker / Vertex / Azure Endpoints",fit:"Managed."},{name:"Apache Spark",fit:"Batch pe volume mari."}] });
  add({ section: "4.2 · Components", tag: "C9", title: "C9 · Monitoring Component",
    verbatim:`C9 Monitoring Component (P8, P9). The monitoring component takes care of the continuous monitoring of the model serving performance (e.g., prediction accuracy). Additionally, monitoring of the ML infrastructure, CI/CD, and orchestration are required [7,10,17,26,29,36,46] [α, ζ, η, θ]. Examples include Prometheus with Grafana [η, ζ], ELK stack (Elasticsearch, Logstash, and Kibana) [α, η, ζ], and simply TensorBoard [θ]. Examples with built-in monitoring capabilities are Kubeflow [θ], MLflow [η], and AWS SageMaker model monitor or cloud watch [ζ].`,
    tldr:"Ochiul care urmărește serving, infra, CI/CD și acuratețea; pornește feedback-ul.",
    plain:`Implementarea P8 + sursa buclelor P9. Monitorizează nu doar infra („e viu?”), ci și calitatea modelului (acuratețe, drift) și declanșează reantrenarea.`,
    realworld:["Grafana arată latanța; Evidently arată că intrările s-au mutat (drift)."],
    services:[{name:"Prometheus+Grafana / ELK / TensorBoard",fit:"Infra & loguri."},{name:"Evidently / Arize / WhyLabs",fit:"Drift & calitate."},{name:"SageMaker Model Monitor / CloudWatch",fit:"Cloud."}] });

  /* ---- 4.3 Roles ---- */
  add({ section: "4.3 · Roles", tag: "4.3", title: "Roles — intro",
    verbatim:`After describing the principles and their resulting instantiation of components, we identify necessary roles in order to realize MLOps in the following. MLOps is an interdisciplinary group process, and the interplay of different roles is crucial to design, manage, automate, and operate an ML system in production. In the following, every role, its purpose, and related tasks are briefly described:`,
    tldr:"MLOps e un proces de echipă interdisciplinară; urmează cele 7 roluri.",
    plain:`Mesajul cheie, repetat în tot paperul: niciun om nu poate singur. E nevoie de mai multe roluri care „joacă împreună”. Următoarele 7 intrări descriu fiecare rol.`,
    realworld:["O echipă de produs ML = PO + DS + DE + SWE + DevOps + ML engineer, nu „un data scientist erou”."],
    services:[] });
  add({ section: "4.3 · Roles", tag: "R1", title: "R1 · Business Stakeholder",
    verbatim:`R1 Business Stakeholder (similar roles: Product Owner, Project Manager). The business stakeholder defines the business goal to be achieved with ML and takes care of the communication side of the business, e.g., presenting the return on investment (ROI) generated with an ML product [17,24,26] [α, β, δ, θ].`,
    tldr:"Omul cu problema de business și cu ROI-ul; definește „de ce”.",
    plain:`Nu scrie cod, dar fixează obiectivul și justifică investiția. Echivalentul Product Owner-ului. Fără el, echipa optimizează metrici care nu contează pentru business.`,
    realworld:["PO care cere „−10% churn” și raportează ROI-ul board-ului."],
    services:[{name:"Jira / dashboards de business",fit:"Cerințe & impact."}] });
  add({ section: "4.3 · Roles", tag: "R2", title: "R2 · Solution Architect",
    verbatim:`R2 Solution Architect (similar role: IT Architect). The solution architect designs the architecture and defines the technologies to be used, following a thorough evaluation [17,27] [α, ζ].`,
    tldr:"Decide arhitectura și tehnologiile, după evaluare.",
    plain:`Alege „cu ce construim”: cloud vs on-prem, ce feature store, ce orchestrator — pe bază de evaluare, nu modă. Deciziile lui se văd în toată Figura 4.`,
    realworld:["Vertex AI vs. stack open-source pe K8s, în funcție de buget și echipă."],
    services:[{name:"Diagrame & ADR-uri",fit:"Documentează deciziile."}] });
  add({ section: "4.3 · Roles", tag: "R3", title: "R3 · Data Scientist",
    verbatim:`R3 Data Scientist (similar roles: ML Specialist, ML Developer). The data scientist translates the business problem into an ML problem and takes care of the model engineering, including the selection of the best-performing algorithm and hyperparameters [7,14,26,29] [α, β, γ, δ, ε, ζ, η, θ].`,
    tldr:"Traduce businessul în problemă ML și construiește modelul.",
    plain:`Inima Zonei C (experimentare): decide regresie/clasificare, alege algoritmul și hyperparametrii, antrenează și validează. Apare în [toți experții α–θ] = rol central.`,
    realworld:["Testează 30 de combinații și alege modelul cu cel mai bun F1."],
    services:[{name:"Jupyter / scikit-learn / PyTorch / MLflow",fit:"Experimentare + tracking."}] });
  add({ section: "4.3 · Roles", tag: "R4", title: "R4 · Data Engineer",
    verbatim:`R4 Data Engineer (similar role: DataOps Engineer). The data engineer builds up and manages data and feature engineering pipelines. Moreover, this role ensures proper data ingestion to the databases of the feature store system [14,29,41] [α, β, γ, δ, ε, ζ, η, θ].`,
    tldr:"Construiește pipeline-urile de date/feature-uri și alimentează feature store-ul.",
    plain:`Se ocupă de „combustibil”. Inima Zonei B: aduce datele, le curăță, le transformă în feature-uri și le încarcă corect și la timp în feature store.`,
    realworld:["Scrie jobul care curăță datele brute și încarcă feature-uri în Feast."],
    services:[{name:"Spark / dbt / Airflow / Feast",fit:"Pipeline-uri de date + ingest."}] });
  add({ section: "4.3 · Roles", tag: "R5", title: "R5 · Software Engineer",
    verbatim:`R5 Software Engineer. The software engineer applies software design patterns, widely accepted coding guidelines, and best practices to turn the raw ML problem into a well-engineered product [29] [α, γ].`,
    tldr:"Transformă codul de experiment în cod de producție, curat și solid.",
    plain:`Codul de notebook e „spaghetti”. SWE-ul îl rescrie cu pattern-uri, teste și standarde, ca să reziste în producție (inclusiv codul de serving).`,
    realworld:["Refactorizează scriptul de training într-un modul testat, reutilizabil."],
    services:[{name:"Design patterns / linters / teste",fit:"Calitate & mentenabilitate."}] });
  add({ section: "4.3 · Roles", tag: "R6", title: "R6 · DevOps Engineer",
    verbatim:`R6 DevOps Engineer. The DevOps engineer bridges the gap between development and operations and ensures proper CI/CD automation, ML workflow orchestration, model deployment to production, and monitoring [14–16,26] [α, β, γ, ε, ζ, η, θ].`,
    tldr:"Podul Dev↔Ops: CI/CD, orchestrare, deploy, monitorizare.",
    plain:`Se asigură că totul rulează automat și stabil în producție. E rolul care „operaționalizează” munca data scientistului.`,
    realworld:["Setează pipeline-ul care, la promovarea unui model, îl deployează automat."],
    services:[{name:"Jenkins / GitHub Actions / Kubernetes / Prometheus",fit:"Automatizare & operare."}] });
  add({ section: "4.3 · Roles", tag: "R7", title: "R7 · ML Engineer / MLOps Engineer",
    verbatim:`R7 ML Engineer/MLOps Engineer. The ML engineer or MLOps engineer combines aspects of several roles and thus has cross-domain knowledge. This role incorporates skills from data scientists, data engineers, software engineers, DevOps engineers, and backend engineers (see Figure 3). This cross-domain role builds up and operates the ML infrastructure, manages the automated ML workflow pipelines and model deployment to production, and monitors both the model and the ML infrastructure [14,17,26,29] [α, β, γ, δ, ε, ζ, η, θ].`,
    tldr:"„Omul-orchestră”: ML + data + software + DevOps; ține tot sistemul în picioare.",
    plain:`Rolul cel mai căutat și mai rar. Înțelege din toate (vezi intersecția din Figura 3), construiește și operează infra + pipeline-urile automate. Practic, liantul întregii Figuri 4.`,
    realworld:["Deține pipeline-ul end-to-end de la feature store la monitorizare."],
    services:[{name:"Tot stack-ul MLOps",fit:"Kubeflow + MLflow + Feast + KServe + Prometheus."}] });

  /* =========================== 5 ARCHITECTURE & WORKFLOW =========== */
  add({ section: "5 · Architecture & Workflow", tag: "§5", title: "Generalized end-to-end architecture",
    verbatim:`On the basis of the identified principles, components, and roles, we derive a generalized MLOps end-to-end architecture to give ML researchers and practitioners proper guidance. It is depicted in Figure 4. Additionally, we depict the workflows, i.e., the sequence in which the different tasks are executed in the different stages. The artifact was designed to be technology-agnostic. Therefore, ML researchers and practitioners can choose the best-fitting technologies and frameworks for their needs.`,
    tldr:"Figura 4 = arhitectura generală + ordinea pașilor, agnostică de tehnologie.",
    plain:`Aici se nasc Figura 4 și fluxul de pași. „Technology-agnostic” = harta îți spune CE piese și CE ordine, dar tu alegi uneltele. De aceea poți pune Airflow sau Kubeflow în același loc din diagramă.`,
    realworld:["Aceeași arhitectură implementată o dată cu stack open-source, o dată cu Vertex AI."],
    services:[] });
  add({ section: "5 · Architecture & Workflow", tag: "§5", title: "The four zones (A · B · C · D)",
    verbatim:`As depicted in Figure 4, we illustrate an end-to-end process, from MLOps project initiation to the model serving. It includes (A) the MLOps project initiation steps; (B) the feature engineering pipeline, including the data ingestion to the feature store; (C) the experimentation; and (D) the automated ML workflow pipeline up to the model serving.`,
    tldr:"Patru zone: A inițiere, B feature engineering, C experimentare, D producție automată.",
    plain:`Indexul Figurii 4. Cele patru litere (A–D) sunt fix zonele pe care le poți APĂSA în diagrama interactivă de mai sus ca să vezi detaliile fiecăreia.`,
    realworld:["A = înainte de cod; B = fabrica de date; C = laboratorul; D = banda automată."],
    services:[] });

  add({ section: "5 · Architecture & Workflow", tag: "A", zone: "A", title: "(A) MLOps project initiation — steps 1–5",
    verbatim:`(A) MLOps project initiation. (1) The business stakeholder (R1) analyzes the business and identifies a potential business problem that can be solved using ML. (2) The solution architect (R2) defines the architecture design for the overall ML system and, decides on the technologies to be used after a thorough evaluation. (3) The data scientist (R3) derives an ML problem—such as whether regression or classification should be used—from the business goal. (4) The data engineer (R4) and the data scientist (R3) work together in an effort to understand which data is required to solve the problem. (5) Once the answers are clarified, the data engineer (R4) and data scientist (R3) collaborate to locate the raw data sources for the initial data analysis. They check the distribution, and quality of the data, as well as performing validation checks. Furthermore, they ensure that the incoming data from the data sources is labeled, meaning that a target attribute is known, as this is a mandatory requirement for supervised ML. In this example, the data sources already had labeled data available as the labeling step was covered during an upstream process.`,
    tldr:"Înainte de cod: definești problema, arhitectura, tipul de ML și verifici datele.",
    plain:`Nimeni nu antrenează încă. Businessul spune CE rezolvăm, arhitectul CU CE, data scientistul traduce în „regresie/clasificare?”, iar DS+DE găsesc și verifică datele (calitate, distribuție, etichete pentru ML supervizat). Sări peste = construiești pe nisip.`,
    realworld:["„Reducem churn-ul” → clasificare binară (pleacă/rămâne).","Descoperi din timp că 40% din date n-au etichetă."],
    services:[{name:"Jira / Miro",fit:"Definire problemă & arhitectură."},{name:"Great Expectations / pandas-profiling",fit:"Verificări calitate/distribuție."}] });
  add({ section: "5 · Architecture & Workflow", tag: "B1", zone: "B", title: "(B1) Requirements for feature engineering pipeline — steps 6–7",
    verbatim:`(B1) Requirements for feature engineering pipeline. The features are the relevant attributes required for model training. After the initial understanding of the raw data and the initial data analysis, the fundamental requirements for the feature engineering pipeline are defined, as follows: (6) The data engineer (R4) defines the data transformation rules (normalization, aggregations) and cleaning rules to bring the data into a usable format. (7) The data scientist (R3) and data engineer (R4) together define the feature engineering rules, such as the calculation of new and more advanced features based on other features. These initially defined rules must be iteratively adjusted by the data scientist (R3) either based on the feedback coming from the experimental model engineering stage or from the monitoring component observing the model performance.`,
    tldr:"Stabilești REGULILE: cum cureți/normalizezi datele și ce feature-uri calculezi.",
    plain:`B1 = „rețeta”, nu gătitul. Definești regulile de transformare/curățare (pasul 6) și regulile de feature engineering (pasul 7). Important: aceste reguli NU sunt fixe — se ajustează pe baza feedback-ului din experiment și monitorizare.`,
    realworld:["Regulă: „venit = media tranzacțiilor pe 90 zile”, definită o dată."],
    services:[{name:"Documentație de feature-uri / dbt models",fit:"Codifică regulile de transformare."}] });
  add({ section: "5 · Architecture & Workflow", tag: "B2", zone: "B", title: "(B2) Feature engineering pipeline — steps 8–10",
    verbatim:`(B2) Feature engineering pipeline. The initially defined requirements for the feature engineering pipeline are taken by the data engineer (R4) and software engineer (R5) as a starting point to build up the prototype of the feature engineering pipeline. The initially defined requirements and rules are updated according to the iterative feedback coming either from the experimental model engineering stage or from the monitoring component observing the model's performance in production. As a foundational requirement, the data engineer (R4) defines the code required for the CI/CD (C1) and orchestration component (C3) to ensure the task orchestration of the feature engineering pipeline. This role also defines the underlying infrastructure resource configuration. (8) First, the feature engineering pipeline connects to the raw data, which can be (for instance) streaming data, static batch data, or data from any cloud storage. (9) The data will be extracted from the data sources. (10) The data preprocessing begins with data transformation and cleaning tasks. The transformation rule artifact defined in the requirement gathering stage serves as input for this task, and the main aim of this task is to bring the data into a usable format. These transformation rules are continuously improved based on the feedback.`,
    tldr:"Construiești și rulezi pipeline-ul: conectare la date → extragere → curățare.",
    plain:`B2 = gătitul. DE+SWE construiesc pipeline-ul (cu cod pentru CI/CD și orchestrare). Se conectează la datele brute (stream/batch/cloud, pas 8), le extrag (pas 9) și încep preprocesarea/curățarea (pas 10) folosind regulile din B1.`,
    realworld:["Job care citește din Kafka și aplică regulile de curățare definite în B1."],
    services:[{name:"Spark / pandas / dbt",fit:"Transformare & curățare (pas 10)."},{name:"Kafka / Kinesis / S3",fit:"Surse stream/batch/cloud (pas 8–9)."},{name:"Airflow/Kubeflow (C3) + CI/CD (C1)",fit:"Orchestrarea pipeline-ului."}] });
  add({ section: "5 · Architecture & Workflow", tag: "B2", zone: "B", title: "(B2) Feature engineering — steps 11–12 (ingestion to feature store)",
    verbatim:`(11) The feature engineering task calculates new and more advanced features based on other features. The predefined feature engineering rules serve as input for this task. These feature engineering rules are continuously improved based on the feedback. (12) Lastly, a data ingestion job loads batch or streaming data into the feature store system (C4). The target can either be the offline or online database (or any kind of data store).`,
    tldr:"Calculezi feature-urile avansate și le încarci în feature store (offline/online).",
    plain:`Finalul Zonei B: pasul 11 produce feature-urile reale (după regulile din B1), iar pasul 12 le bagă în feature store — în baza offline (pentru training) și/sau online (pentru producție). Aici „date brute” devin „feature-uri gata de folosit”.`,
    realworld:["Ingest în Feast: scrie feature-urile în baza online (Redis) + offline (BigQuery)."],
    services:[{name:"Feast / Tecton / SageMaker Feature Store",fit:"Ținta ingestului (pas 12)."}] });
  add({ section: "5 · Architecture & Workflow", tag: "C", zone: "C", title: "(C) Experimentation — steps 13–17",
    verbatim:`(C) Experimentation. Most tasks in the experimentation stage are led by the data scientist (R3). The data scientist is supported by the software engineer (R5). (13) The data scientist (R3) connects to the feature store system (C4) for the data analysis. (Alternatively, the data scientist (R3) can also connect to the raw data for an initial analysis.) In case of any required data adjustments, the data scientist (R3) reports the required changes back to the data engineering zone (feedback loop). (14) Then the preparation and validation of the data coming from the feature store system is required. This task also includes the train and test split dataset creation. (15) The data scientist (R3) estimates the best-performing algorithm and hyperparameters, and the model training is then triggered with the training data (C5). The software engineer (R5) supports the data scientist (R3) in the creation of well-engineered model training code. (16) Different model parameters are tested and validated interactively during several rounds of model training. Once the performance metrics indicate good results, the iterative training stops. The best-performing model parameters are identified via parameter tuning. The model training task and model validation task are then iteratively repeated; together, these tasks can be called "model engineering." The model engineering aims to identify the best-performing algorithm and hyperparameters for the model. (17) The data scientist (R3) exports the model and commits the code to the repository.`,
    tldr:"Laboratorul: conectare la feature store → split → antrenare/validare în bucle → commit.",
    plain:`Aici se face „model engineering”. DS se conectează la feature store (13), face split train/test (14), alege algoritmul+hyperparametrii și antrenează (15), iterează antrenare↔validare până iese bine (16) și comite modelul+codul în repo (17). Dacă datele sunt nasoale, trimite feedback în Zona B.`,
    realworld:["Sweep de hyperparametri în W&B; modelul câștigător se comite în Git."],
    services:[{name:"Jupyter / scikit-learn / PyTorch / XGBoost",fit:"Antrenare & validare."},{name:"MLflow / W&B",fit:"Tracking + selecție model."},{name:"GitHub (C2)",fit:"Commit model+cod (pas 17)."}] });
  add({ section: "5 · Architecture & Workflow", tag: "C", zone: "C", title: "(C) CI/CD trigger — build, test, delivery",
    verbatim:`As a foundational requirement, either the DevOps engineer (R6) or the ML engineer (R7) defines the code for the (C2) automated ML workflow pipeline and commits it to the repository. Once either the data scientist (R3) commits a new ML model or the DevOps engineer (R6) and the ML engineer (R7) commits new ML workflow pipeline code to the repository, the CI/CD component (C1) detects the updated code and triggers automatically the CI/CD pipeline carrying out the build, test, and delivery steps. The build step creates artifacts containing the ML model and tasks of the ML workflow pipeline. The test step validates the ML model and ML workflow pipeline code. The delivery step pushes the versioned artifact(s)—such as images—to the artifact store (e.g., image registry).`,
    tldr:"Orice commit declanșează CI/CD: build → test → delivery (imagine în artifact store).",
    plain:`Puntea dintre experimentare (C) și producție (D). Commit-ul (de model SAU de cod de pipeline) e „butonul” care pornește automat CI/CD-ul: construiește artefactul, îl testează și împinge imaginea versionată în artifact store, de unde o ia Zona D.`,
    realworld:["`git push` → GitHub Actions construiește imaginea Docker și o publică în ECR."],
    services:[{name:"Jenkins / GitHub Actions (C1)",fit:"Build/test/deliver."},{name:"Docker Hub / ECR / GCR",fit:"Artifact store pentru imagini."}] });
  add({ section: "5 · Architecture & Workflow", tag: "D", zone: "D", title: "(D) Automated ML workflow pipeline — management",
    verbatim:`(D) Automated ML workflow pipeline. The DevOps engineer (R6) and the ML engineer (R7) take care of the management of the automated ML workflow pipeline. They also manage the underlying model training infrastructure in the form of hardware resources and frameworks supporting computation such as Kubernetes (C5). The workflow orchestration component (C3) orchestrates the tasks of the automated ML workflow pipeline. For each task, the required artifacts (e.g., images) are pulled from the artifact store (e.g., image registry). Each task can be executed via an isolated environment (e.g., containers). Finally, the workflow orchestration component (C3) gathers metadata for each task in the form of logs, completion time, and so on.`,
    tldr:"Banda automată e gestionată de DevOps/ML engineer; orchestratorul rulează task-urile în containere.",
    plain:`Aici dispare omul din buclă. Orchestratorul (C3) ia artefactele din store, rulează fiecare task într-un container izolat (reproductibil!) și strânge metadate (loguri, durate). Infrastructura (K8s, C5) e gestionată de DevOps/ML engineer.`,
    realworld:["Kubeflow Pipelines rulează fiecare pas ca un pod K8s separat."],
    services:[{name:"Kubeflow / SageMaker / Vertex Pipelines (C3)",fit:"Orchestrare automată."},{name:"Kubernetes (C5)",fit:"Execuție izolată în containere."}] });
  add({ section: "5 · Architecture & Workflow", tag: "D", zone: "D", title: "(D) Automated tasks — steps 18–23",
    verbatim:`Once the automated ML workflow pipeline is triggered, each of the following tasks is managed automatically: (18) automated pulling of the versioned features from the feature store systems (data extraction). Depending on the use case, features are extracted from either the offline or online database (or any kind of data store). (19) Automated data preparation and validation; in addition, the train and test split is defined automatically. (20) Automated final model training on new unseen data (versioned features). The algorithm and hyperparameters are already predefined based on the settings of the previous experimentation stage. The model is retrained and refined. (21) Automated model evaluation and iterative adjustments of hyperparameters are executed, if required. Once the performance metrics indicate good results, the automated iterative training stops. The automated model training task and the automated model validation task can be iteratively repeated until a good result has been achieved. (22) The trained model is then exported and (23) pushed to the model registry (C6), where it is stored e.g., as code or containerized together with its associated configuration and environment files.`,
    tldr:"Automat: extrage features → pregătește/validează → reantrenează → evaluează → împinge în registry.",
    plain:`Aceiași pași ca în Zona C, dar fără mâini umane. Diferența cheie (pas 20): algoritmul și hyperparametrii sunt DEJA stabiliți în C — aici doar reantrenezi pe date noi. La final, modelul ajunge în model registry (pas 23).`,
    realworld:["Pipeline nocturn care reantrenează pe datele de ieri și publică automat în MLflow Registry."],
    services:[{name:"Kubeflow / SageMaker / Vertex Pipelines",fit:"Pașii 18–22."},{name:"MLflow Registry (C6)",fit:"Stocarea modelului (pas 23)."}] });
  add({ section: "5 · Architecture & Workflow", tag: "D", zone: "D", title: "(D) Metadata & model lineage",
    verbatim:`For all training job iterations, the ML metadata store (C7) records metadata such as parameters to train the model and the resulting performance metrics. This also includes the tracking and logging of the training job ID, training date and time, duration, and sources of artifacts. Additionally, the model specific metadata called "model lineage" combining the lineage of data and code is tracked for each newly registered model. This includes the source and version of the feature data and model training code used to train the model. Also, the model version and status (e.g., staging or production-ready) is recorded.`,
    tldr:"Fiecare rulare își scrie metadatele + lineage-ul (date+cod) și statusul modelului.",
    plain:`Concretizarea lui P7/C7 în fluxul automat. „Model lineage” = poți spune oricând „modelul ăsta = feature-urile v7 + codul commit abc, antrenat marți, status production-ready”. Esențial pentru audit și debugging.`,
    realworld:["În MLflow vezi pentru fiecare model: data, durata, parametrii, datele și codul sursă."],
    services:[{name:"ML Metadata store (C7)",fit:"MLflow / Vertex ML Metadata / Kubeflow."}] });
  add({ section: "5 · Architecture & Workflow", tag: "D", zone: "D", title: "(D) Deployment, serving & monitoring — steps 24–26",
    verbatim:`Once the status of a well-performing model is switched from staging to production, it is automatically handed over to the DevOps engineer or ML engineer for model deployment. From there, the (24) CI/CD component (C1) triggers the continuous deployment pipeline. The production-ready ML model and the model serving code are pulled (initially prepared by the software engineer (R5)). The continuous deployment pipeline carries out the build and test step of the ML model and serving code and deploys the model for production serving. The (25) model serving component (C8) makes predictions on new, unseen data coming from the feature store system (C4). This component can be designed by the software engineer (R5) as online inference for real-time predictions or as batch inference for predictions concerning large volumes of input data. For real-time predictions, features must come from the online database (low latency), whereas for batch predictions, features can be served from the offline database (normal latency). Model-serving applications are often configured within a container and prediction requests are handled via a REST API. As a foundational requirement, the ML engineer (R7) manages the model-serving computation infrastructure. The (26) monitoring component (C9) observes continuously the model-serving performance and infrastructure in real-time. Once a certain threshold is reached, such as detection of low prediction accuracy, the information is forwarded via the feedback loop.`,
    tldr:"Status→production declanșează deploy; serving-ul răspunde (online/batch); monitorizarea veghează.",
    plain:`Promovarea unui model la „production” (pas 24) pornește deploy-ul automat. Serving-ul (25) răspunde la cereri: online din baza low-latency (real-time), batch din baza offline (volume mari), de obicei prin REST. Monitorizarea (26) urmărește totul și, la prag depășit (ex. acuratețe mică), aprinde bucla de feedback.`,
    realworld:["Promovezi modelul → CD-ul îl deployează pe un endpoint SageMaker, monitorizat de Model Monitor."],
    services:[{name:"CI/CD (C1) continuous deployment",fit:"Build/test/deploy serving (pas 24)."},{name:"KServe / Seldon / SageMaker Endpoints (C8)",fit:"Serving online/batch (pas 25)."},{name:"Prometheus / Evidently / CloudWatch (C9)",fit:"Monitorizare (pas 26)."}] });
  add({ section: "5 · Architecture & Workflow", tag: "D", zone: "D", title: "(D) Feedback loop & continuous training — steps 27–28",
    verbatim:`The (27) feedback loop is connected to the monitoring component (C9) and ensures fast and direct feedback allowing for more robust and improved predictions. It enables continuous training, retraining, and improvement. With the support of the feedback loop, information is transferred from the model monitoring component to several upstream receiver points, such as the experimental stage, data engineering zone, and the scheduler (trigger). The feedback to the experimental stage is taken forward by the data scientist for further model improvements. The feedback to the data engineering zone allows for the adjustment of the features prepared for the feature store system. Additionally, the detection of concept drifts as a feedback mechanism can enable (28) continuous training. For instance, once the model-monitoring component (C9) detects a drift in the data [3], the information is forwarded to the scheduler, which then triggers the automated ML workflow pipeline for retraining (continuous training). A change in the deployed model can be detected using distribution comparisons to identify drift. Retraining is not only triggered automatically when a statistical threshold is reached; it can also be triggered when new feature data is available, or it can be scheduled periodically.`,
    tldr:"Monitorizarea trimite feedback în 3 direcții; driftul declanșează reantrenarea automată.",
    plain:`Bucla care închide cercul și face sistemul „viu”. Feedback-ul merge spre: (1) experiment (DS îmbunătățește modelul), (2) data engineering (ajustezi feature-urile), (3) scheduler (reantrenează). Driftul (distribuția datelor s-a mutat) = trigger automat. Reantrenarea poate fi și la date noi, sau programată.`,
    realworld:["Evidently detectează drift → scheduler pornește Kubeflow pentru reantrenare, fără om.","Reantrenare săptămânală programată ca plasă de siguranță."],
    services:[{name:"Monitor → Scheduler → Orchestrator",fit:"Evidently/Arize → Airflow/Kubeflow (continuous training)."}] });

  /* =========================== 6 CONCEPTUALIZATION ================= */
  add({ section: "6 · Conceptualization", tag: "§6", title: "Positioning of the term",
    verbatim:`With the findings at hand, we conceptualize the literature and interviews. It becomes obvious that the term MLOps is positioned at the intersection of machine learning, software engineering, DevOps, and data engineering (see Figure 5 in the Appendix). We define MLOps as follows:`,
    tldr:"MLOps stă la intersecția ML + software engineering + DevOps + data engineering.",
    plain:`Pregătește definiția. Mesajul: MLOps nu e o disciplină nouă „din nimic”, ci suprapunerea a patru existente. De aici și nevoia de rolul cross-domain (R7).`,
    realworld:["Diagrama Venn din secțiunea 02 a ghidului arată exact această intersecție."],
    services:[] });
  add({ section: "6 · Conceptualization", tag: "DEF", title: "The MLOps definition",
    verbatim:`MLOps (Machine Learning Operations) is a paradigm, including aspects like best practices, sets of concepts, as well as a development culture when it comes to the end-to-end conceptualization, implementation, monitoring, deployment, and scalability of machine learning products. Most of all, it is an engineering practice that leverages three contributing disciplines: machine learning, software engineering (especially DevOps), and data engineering. MLOps is aimed at productionizing machine learning systems by bridging the gap between development (Dev) and operations (Ops). Essentially, MLOps aims to facilitate the creation of machine learning products by leveraging these principles: CI/CD automation, workflow orchestration, reproducibility; versioning of data, model, and code; collaboration; continuous ML training and evaluation; ML metadata tracking and logging; continuous monitoring; and feedback loops.`,
    tldr:"Definiția oficială: paradigm + cultură + 3 discipline + cele 9 principii, ca să duci ML în producție.",
    plain:`Inima lucrării. Reține: (1) e PARADIGM, nu tool; (2) ML + software/DevOps + data engineering; (3) se rezumă la enumerarea celor 9 principii. Dacă cineva te întreabă „ce e MLOps?”, citează exact asta.`,
    realworld:["„Cumpărăm MLOps” = adopți o cultură + practici, nu un singur produs."],
    services:[{name:"Platforme MLOps",fit:"SageMaker/Vertex/Azure/Databricks acoperă principiile; cultura tot tu o aduci."}] });

  /* =========================== 7 OPEN CHALLENGES =================== */
  add({ section: "7 · Open Challenges", tag: "§7", title: "Open challenges — categories",
    verbatim:`Several challenges for adopting MLOps have been identified after conducting the literature review, tool review, and interview study. These open challenges have been organized into the categories of organizational, ML system, and operational challenges.`,
    tldr:"Provocările sunt grupate în trei: organizaționale, de sistem ML, operaționale.",
    plain:`Chiar cu arhitectura ideală, rămân dureri reale. Următoarele trei intrări le tratează pe rând.`,
    realworld:[],
    services:[] });
  add({ section: "7 · Open Challenges", tag: "ORG", title: "Organizational challenges",
    verbatim:`Organizational challenges. The mindset and culture of data science practice is a typical challenge in organizational settings [2]. As our insights from literature and interviews show, to successfully develop and run ML products, there needs to be a culture shift away from model-driven machine learning toward a product-oriented discipline [γ]. A great number of skills and individual roles are required for MLOps (β). As our identified sources point out, there is a lack of highly skilled experts for these roles—especially with regard to architects, data engineers, ML engineers and DevOps engineers [29,41,44] [α, ε]. This is related to the necessary education of future professionals—as MLOps is typically not part of data science education [7] [γ]. Posoldova (2020) [35] further stresses this aspect by remarking that students should not only learn about model creation, but must also learn about technologies and components necessary to build functional ML products. Data scientists alone cannot achieve the goals of MLOps. A multi-disciplinary team is required [14], thus MLOps needs to be a group process [α]. This is often hindered because teams work in silos rather than in cooperative setups [α]. Additionally, different knowledge levels and specialized terminologies make communication difficult. To lay the foundations for more fruitful setups, the respective decision-makers need to be convinced that an increased MLOps maturity and a product-focused mindset will yield clear business improvements [γ].`,
    tldr:"Cea mai mare problemă e cultura/oamenii: schimbare de mentalitate + lipsă de experți.",
    plain:`Provocarea #1 nu e tehnică, ci umană. Trebuie trecere de la „model” la „produs”, oameni multi-disciplinari (rari pe piață), educație care lipsește, și spargerea silozurilor. Iar decidenții trebuie convinși cu argumente de BUSINESS, nu tehnice.`,
    realworld:["Greu de angajat un MLOps/ML engineer bun — exact lipsa de skill-uri descrisă.","Echipe care lucrează în siloz și nu comunică → proiectul se blochează."],
    services:[{name:"Practici de echipă (RACI, guilds)",fit:"Sparg silozurile; nu e o problemă de tooling."}] });
  add({ section: "7 · Open Challenges", tag: "SYS", title: "ML system challenges",
    verbatim:`ML system challenges. A major challenge with regard to MLOps systems is designing for fluctuating demand, especially in relation to the process of ML training [7]. This stems from potentially voluminous and varying data [10], which makes it difficult to precisely estimate the necessary infrastructure resources (CPU, RAM, and GPU) and requires a high level of flexibility of the infrastructure [7,26] [δ].`,
    tldr:"Cererea de calcul variază mult (mai ales la training) — greu de dimensionat infra.",
    plain:`Training-ul poate cere 8 GPU câteva ore, apoi nimic. Datele variază ca volum. Deci infra trebuie să fie ELASTICĂ (scalează sus/jos), altfel ori plătești degeaba, ori rămâi fără resurse.`,
    realworld:["Autoscaling pe K8s + spot instances ca să prinzi vârfurile ieftin."],
    services:[{name:"Kubernetes autoscaling / spot instances",fit:"Răspund la cererea fluctuantă."},{name:"Serverless training (SageMaker/Vertex)",fit:"Plătești doar cât rulează."}] });
  add({ section: "7 · Open Challenges", tag: "OPS", title: "Operational challenges",
    verbatim:`Operational challenges. In productive settings, it is challenging to operate ML manually due to different stacks of software and hardware components and their interplay. Therefore, robust automation is required [7,17]. Also, a constant incoming stream of new data forces retraining capabilities. This is a repetitive task which, again, requires a high level of automation [18] [θ]. These repetitive tasks yield a large number of artifacts that require a strong governance [24,29,40] as well as versioning of data, model, and code to ensure robustness and reproducibility [11,27,29]. Lastly, it is challenging to resolve a potential support request (e.g., by finding the root cause), as many parties and components are involved. Failures can be a combination of ML infrastructure and software [26].`,
    tldr:"Operarea manuală e imposibilă: prea multe piese; nevoie de automatizare + governance.",
    plain:`Cu zeci de componente și artefacte, operarea manuală cedează. Soluții: automatizare robustă, versionare (date/model/cod) și governance puternic. Iar debugging-ul e greu fiindcă o pană poate fi din infra SAU software — de aici nevoia de lineage și monitorizare bună.`,
    realworld:["Un incident în producție: e modelul, datele, sau infra? Fără lineage, cauți ore întregi."],
    services:[{name:"Lineage & governance (MLflow, ML metadata)",fit:"Root-cause mai rapid."},{name:"Versionare date/model/cod",fit:"Robustețe & reproductibilitate."}] });

  /* =========================== 8 CONCLUSION ======================== */
  add({ section: "8 · Conclusion", tag: "§8", title: "Conclusion",
    verbatim:`With the increase of data availability and analytical capabilities, coupled with the constant pressure to innovate, more machine learning products than ever are being developed. However, only a small number of these proofs of concept progress into deployment and production. Furthermore, the academic space has focused intensively on machine learning model building and benchmarking, but too little on operating complex machine learning systems in real-world scenarios. In the real world, we observe data scientists still managing ML workflows manually to a great extent. The paradigm of Machine Learning Operations (MLOps) addresses these challenges. In this work, we shed more light on MLOps. By conducting a mixed-method study analyzing existing literature and tools, as well as interviewing eight experts from the field, we uncover four main aspects of MLOps: its principles, components, roles, and architecture. From these aspects, we infer a holistic definition. The results support a common understanding of the term MLOps and its associated concepts, and will hopefully assist researchers and professionals in setting up successful ML projects in the future.`,
    tldr:"Se închide cercul: puține PoC-uri ajung live; MLOps (4 aspecte + definiție) e răspunsul.",
    plain:`Concluzia repetă diagnoza din abstract și anunță „leacul”: cele patru aspecte (principii, componente, roluri, arhitectură) + definiția holistică. Scopul final = un limbaj comun care ajută echipele să livreze ML în producție.`,
    realworld:["Acest ghid interactiv = o aplicare directă a celor patru aspecte din concluzie."],
    services:[{name:"Tot stack-ul discutat",fit:"Asamblat în arhitectura din Figura 4."}] });

  /* ========================== RENDER ================================ */
  function renderFull(container) {
    const doc = global.MLOPS_DOC;
    if (!doc || !container) return;
    const order = [];
    const map = {};
    const crops = global.MLOPS_CROPS || {};
    P.forEach((e, i) => {
      if (!e.id) e.id = "fp-" + i;               // unique DOM id for renderEntry
      if (crops[e.id]) e.crops = crops[e.id];    // pixel-perfect PDF paragraph cuts
      if (!map[e.section]) { map[e.section] = []; order.push(e.section); }
      map[e.section].push(e);
    });
    container.innerHTML = order.map(sec => `
      <div class="vb-group">
        <h3 class="vb-group-title">${sec}</h3>
        ${map[sec].map(doc.renderEntry).join("")}
      </div>`).join("");
  }

  global.MLOPS_PAPER = { sections: P, renderFull };
})(typeof window !== "undefined" ? window : this);
