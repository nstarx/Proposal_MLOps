/* ============================================================================
   MLOPS VERBATIM COMPANION
   ----------------------------------------------------------------------------
   A paragraph-by-paragraph companion to:
     Kreuzberger, Kühl, Hirschl — "Machine Learning Operations (MLOps):
     Overview, Definition, and Architecture" (arXiv:2205.02302v3).

   For (almost) every substantive paragraph of the paper we keep FOUR things:
     • verbatim  — the exact text from the paper (English, unchanged)
     • tldr      — "Pe scurt", a one-line simplistic summary (RO)
     • plain     — interpretarea pe înțelesul tuturor (RO)
     • realworld — exemple concrete din lumea reală
     • services  — servicii/tooluri care există și CUM se fituie ele aici

   This single file is consumed by BOTH:
     • mlops-guide.html  → renders the whole companion as a reference section
     • figure4.html      → clicking a zone (A·B·C·D) opens a dialog with the
                            workflow paragraphs that belong to that zone.
   ============================================================================ */
(function (global) {
  "use strict";

  const S = [];

  /* ----- helper to keep the literal below readable ----- */
  function add(o) { S.push(o); }

  /* ========================================================================
     GROUP: ABSTRACT & INTRODUCTION
     ===================================================================== */
  add({
    id: "abstract", group: "front", groupLabel: "Abstract & Intro",
    title: "Abstract", meta: "The thesis of the whole paper",
    verbatim:
`The final goal of all industrial machine learning (ML) projects is to develop ML products and rapidly bring them into production. However, it is highly challenging to automate and operationalize ML products and thus many ML endeavors fail to deliver on their expectations. The paradigm of Machine Learning Operations (MLOps) addresses this issue. MLOps includes several aspects, such as best practices, sets of concepts, and development culture. However, MLOps is still a vague term and its consequences for researchers and professionals are ambiguous. To address this gap, we conduct mixed-method research, including a literature review, a tool review, and expert interviews. As a result of these investigations, we provide an aggregated overview of the necessary principles, components, and roles, as well as the associated architecture and workflows. Furthermore, we furnish a definition of MLOps and highlight open challenges in the field.`,
    tldr: "Cele mai multe proiecte ML mor înainte de producție; MLOps e rețeta care le duce acolo.",
    plain:
`Ideea de bază: a antrena un model într-un notebook e ușor; a-l ține viu în producție (cu date noi, useri reali, reantrenări) e partea grea, și aici cad majoritatea proiectelor. „MLOps” e un cuvânt încă vag, așa că autorii au făcut o cercetare mixtă (au citit lucrări, au testat unelte, au intervievat experți) ca să dea o definiție clară plus principiile, componentele, rolurile și arhitectura necesare.`,
    realworld: [
      "Gartner: o mare parte din proiectele de AI nu ajung niciodată în producție — exact problema descrisă aici.",
      "Echipe care au un model grozav pe laptopul unui data scientist, dar nimeni nu știe cum să-l ruleze automat săptămânal pe date proaspete."
    ],
    services: [
      { name: "Platforme end-to-end", fit: "AWS SageMaker, Google Vertex AI, Azure ML, Databricks — încearcă să rezolve tot ciclul descris în paper într-un singur loc." },
      { name: "Stack open-source", fit: "MLflow + Airflow/Kubeflow + Feast + KServe — aceleași capabilități, asamblate manual." }
    ]
  });

  add({
    id: "intro", group: "front", groupLabel: "Abstract & Intro",
    title: "1 · Introduction — why ML projects fail",
    meta: "Section 1",
    verbatim:
`Machine Learning (ML) has become an important technique to leverage the potential of data and allows businesses to be more innovative, efficient, and sustainable. However, the success of many productive ML applications in real-world settings falls short of expectations. A large number of ML projects fail—with many ML proofs of concept never progressing as far as production. From a research perspective, this does not come as a surprise as the ML community has focused extensively on the building of ML models, but not on (a) building production-ready ML products and (b) providing the necessary coordination of the resulting, often complex ML system components and infrastructure, including the roles required to automate and operate an ML system in a real-world setting. For instance, in many industrial applications, data scientists still manage ML workflows manually to a great extent, resulting in many issues during the operations of the respective ML solution.`,
    tldr: "Comunitatea ML s-a concentrat pe modele, nu pe produse de producție — de aici eșecurile.",
    plain:
`Toată energia academică s-a dus în „cum fac un model mai bun”, dar aproape deloc în „cum coordonez zecile de piese (date, infra, deploy, monitorizare, oameni) ca să funcționeze stabil în producție”. În practică, data scientistul face totul manual, iar manualul = fragil.`,
    realworld: [
      "Un model de fraudă antrenat o singură dată, copiat pe un server și uitat — în 3 luni acuratețea scade pentru că tiparele de fraudă s-au schimbat.",
      "Reantrenare făcută „când își aduce aminte cineva”, fără pipeline automat."
    ],
    services: [
      { name: "Orchestratoare", fit: "Airflow / Kubeflow Pipelines / Prefect — transformă pașii manuali într-un DAG care rulează singur." },
      { name: "Experiment tracking", fit: "MLflow / Weights & Biases — înlocuiesc „știu eu ce parametri am folosit” cu un registru auditabil." }
    ]
  });

  /* ========================================================================
     GROUP: FOUNDATIONS OF DEVOPS
     ===================================================================== */
  add({
    id: "devops", group: "foundations", groupLabel: "DevOps Foundations",
    title: "2 · Foundations of DevOps",
    meta: "Section 2 — MLOps is DevOps applied to ML",
    verbatim:
`A concept called "DevOps" emerged in the years 2008/2009 and aims to reduce issues in software development. DevOps is more than a pure methodology and rather represents a paradigm addressing social and technical issues in organizations engaged in software development. It has the goal of eliminating the gap between development and operations and emphasizes collaboration, communication, and knowledge sharing. It ensures automation with continuous integration, continuous delivery, and continuous deployment (CI/CD), thus allowing for fast, frequent, and reliable releases. Moreover, it is designed to ensure continuous testing, quality assurance, continuous monitoring, logging, and feedback loops. Due to the commercialization of DevOps, many DevOps tools are emerging, which can be differentiated into six groups: collaboration and knowledge sharing (e.g., Slack, Trello, GitLab wiki), source code management (e.g., GitHub, GitLab), build process (e.g., Maven), continuous integration (e.g., Jenkins, GitLab CI), deployment automation (e.g., Kubernetes, Docker), monitoring and logging (e.g., Prometheus, Logstash).`,
    tldr: "MLOps împrumută rețeta DevOps (colaborare + automatizare + CI/CD + monitorizare) și o aplică pe ML.",
    plain:
`DevOps a rezolvat în software același tip de problemă: developerii și operațiunile lucrau separat și se certau la fiecare release. Soluția a fost cultură comună + automatizare (CI/CD) + monitorizare. MLOps ia exact aceste idei și le extinde la modele și date.`,
    realworld: [
      "O echipă web care livrează de 20 de ori pe zi cu GitHub Actions, fără drame — același reflex aplicat la modele.",
      "Cele 6 grupuri de unelte DevOps sunt fix stiva pe care orice companie de software o are deja."
    ],
    services: [
      { name: "Colaborare", fit: "Slack, Jira/Trello, GitLab Wiki — comunicarea între roluri." },
      { name: "Source control + CI", fit: "GitHub/GitLab/Bitbucket + Jenkins/GitLab CI — versionare și build automat." },
      { name: "Deploy + monitorizare", fit: "Docker + Kubernetes + Prometheus/Logstash — exact piesele reutilizate de MLOps." }
    ]
  });

  /* ========================================================================
     GROUP: PRINCIPLES (P1–P9)
     ===================================================================== */
  add({
    id: "P1", group: "principles", groupLabel: "9 Principles", tag: "P1",
    title: "P1 · CI/CD automation",
    meta: "Implemented by C1",
    verbatim:
`CI/CD automation. CI/CD automation provides continuous integration, continuous delivery, and continuous deployment. It carries out the build, test, delivery, and deploy steps. It provides fast feedback to developers regarding the success or failure of certain steps, thus increasing the overall productivity.`,
    tldr: "Cod nou ⇒ build + test + livrare automate, cu feedback rapid.",
    plain:
`De fiecare dată când cineva schimbă codul (sau modelul), un robot îl construiește, îl testează și îl pregătește de livrare — fără pași manuali. Dacă ceva crapă, afli în minute, nu în producție.`,
    realworld: ["Un commit pe branch declanșează automat testele și împachetează imaginea Docker a modelului."],
    services: [
      { name: "Jenkins / GitHub Actions / GitLab CI", fit: "Motoare CI/CD clasice." },
      { name: "Argo CD", fit: "Continuous deployment pe Kubernetes (GitOps)." }
    ]
  });
  add({
    id: "P2", group: "principles", groupLabel: "9 Principles", tag: "P2",
    title: "P2 · Workflow orchestration",
    meta: "Implemented by C3",
    verbatim:
`Workflow orchestration. Workflow orchestration coordinates the tasks of an ML workflow pipeline according to directed acyclic graphs (DAGs). DAGs define the task execution order by considering relationships and dependencies.`,
    tldr: "Un DAG spune ce pas rulează după ce pas (extrage date → curăță → antrenează → validează).",
    plain:
`Un pipeline ML are mulți pași care depind unul de altul. Orchestrarea înseamnă un „dirijor” care știe ordinea și dependențele și rulează totul automat, repornind ce a picat.`,
    realworld: ["Reantrenarea nocturnă: extrage date → preprocesează → antrenează → validează → publică, totul ca un graf."],
    services: [
      { name: "Apache Airflow / Prefect / Dagster", fit: "Orchestratoare generale bazate pe DAG." },
      { name: "Kubeflow Pipelines / SageMaker Pipelines / Vertex AI Pipelines", fit: "Orchestratoare native ML." }
    ]
  });
  add({
    id: "P3", group: "principles", groupLabel: "9 Principles", tag: "P3",
    title: "P3 · Reproducibility",
    meta: "Implemented by C3, C4, C6",
    verbatim:
`Reproducibility. Reproducibility is the ability to reproduce an ML experiment and obtain the exact same results.`,
    tldr: "Rulezi din nou același experiment ⇒ același rezultat.",
    plain:
`Dacă peste 6 luni vrei (sau un auditor cere) să refaci exact modelul, trebuie să poți reproduce identic: aceleași date, același cod, aceiași parametri, același mediu. Fără asta, nu poți depana și nici nu poți avea încredere.`,
    realworld: ["Un model respins de un client trebuie reprodus bit-cu-bit pentru a explica de ce a luat o decizie."],
    services: [
      { name: "DVC / LakeFS", fit: "Versionare de date." },
      { name: "MLflow / Git / Docker / conda", fit: "Versionare cod, parametri și mediu de execuție." }
    ]
  });
  add({
    id: "P4", group: "principles", groupLabel: "9 Principles", tag: "P4",
    title: "P4 · Versioning",
    meta: "Implemented by C2, C4, C6",
    verbatim:
`Versioning. Versioning ensures the versioning of data, model, and code to enable not only reproducibility, but also traceability (for compliance and auditing reasons).`,
    tldr: "Versionezi TREI lucruri: date, model ȘI cod — nu doar codul.",
    plain:
`În software versionezi codul. În ML mai trebuie să versionezi și datele și modelul, pentru că rezultatul depinde de toate trei. Așa poți spune „modelul v3 a fost antrenat pe datele v7 cu codul commit abc123”.`,
    realworld: ["Compliance bancar: trebuie să arăți exact ce date au produs modelul care a refuzat un credit."],
    services: [
      { name: "Git", fit: "Cod." },
      { name: "DVC / LakeFS", fit: "Date." },
      { name: "MLflow Model Registry", fit: "Model + versiune + status." }
    ]
  });
  add({
    id: "P5", group: "principles", groupLabel: "9 Principles", tag: "P5",
    title: "P5 · Collaboration",
    meta: "Implemented by C2, C4",
    verbatim:
`Collaboration. Collaboration ensures the possibility to work collaboratively on data, model, and code. Besides the technical aspect, this principle emphasizes a collaborative and communicative work culture aiming to reduce domain silos between different roles.`,
    tldr: "Date, model și cod trebuie să fie lucrabile în echipă, nu pe laptopul cuiva.",
    plain:
`Nu e doar despre unelte, ci despre cultură: data scientistul, data engineerul și DevOps-ul trebuie să lucreze pe aceleași artefacte, nu în silozuri separate care nu comunică.`,
    realworld: ["Notebook-uri partajate + repo comun, în loc de fișiere trimise pe mail între echipe."],
    services: [
      { name: "GitHub / GitLab", fit: "Cod și review în comun." },
      { name: "Feature Store partajat", fit: "Aceleași feature-uri reutilizate de toate echipele." },
      { name: "Slack / notebooks (Colab, Deepnote)", fit: "Comunicare și experimentare colaborativă." }
    ]
  });
  add({
    id: "P6", group: "principles", groupLabel: "9 Principles", tag: "P6",
    title: "P6 · Continuous ML training & evaluation",
    meta: "Implemented by C1, C3, C5",
    verbatim:
`Continuous ML training & evaluation. Continuous training means periodic retraining of the ML model based on new feature data. Continuous training is enabled through the support of a monitoring component, a feedback loop, and an automated ML workflow pipeline. Continuous training always includes an evaluation run to assess the change in model quality.`,
    tldr: "Modelul se reantrenează periodic pe date noi și e re-evaluat de fiecare dată.",
    plain:
`Lumea se schimbă, deci modelul „îmbătrânește”. Reantrenarea continuă înseamnă că, automat (programat sau declanșat de drift), modelul învață din date proaspete — și nu îl publici fără să verifici că a devenit mai bun, nu mai prost.`,
    realworld: ["Recomandări e-commerce reantrenate zilnic ca să prindă trendurile noi."],
    services: [
      { name: "Kubeflow / SageMaker Pipelines / Vertex AI Pipelines / TFX", fit: "Pipeline automat de (re)antrenare + evaluare." }
    ]
  });
  add({
    id: "P7", group: "principles", groupLabel: "9 Principles", tag: "P7",
    title: "P7 · ML metadata tracking/logging",
    meta: "Implemented by C7",
    verbatim:
`ML metadata tracking/logging. Metadata is tracked and logged for each orchestrated ML workflow task. Metadata tracking and logging is required for each training job iteration (e.g., training date and time, duration, etc.), including the model specific metadata—e.g., used parameters and the resulting performance metrics, model lineage: data and code used—to ensure the full traceability of experiment runs.`,
    tldr: "Fiecare antrenare își notează: când, cât, cu ce parametri, ce date/cod, ce scor.",
    plain:
`Un „jurnal de bord” automat pentru fiecare experiment: ce date și cod s-au folosit (lineage), ce parametri, cât a durat, ce acuratețe a ieșit. Așa poți compara 200 de experimente și ști exact care e cel mai bun și de ce.`,
    realworld: ["Compari pe un grafic 50 de rulări și alegi modelul cu cel mai bun F1 — pentru că metadatele sunt logate."],
    services: [
      { name: "MLflow Tracking / Weights & Biases / Neptune.ai", fit: "Logare parametri + metrici + artefacte." },
      { name: "Vertex ML Metadata", fit: "Lineage de date și cod în cloud." }
    ]
  });
  add({
    id: "P8", group: "principles", groupLabel: "9 Principles", tag: "P8",
    title: "P8 · Continuous monitoring",
    meta: "Implemented by C9",
    verbatim:
`Continuous monitoring. Continuous monitoring implies the periodic assessment of data, model, code, infrastructure resources, and model serving performance (e.g., prediction accuracy) to detect potential errors or changes that influence the product quality.`,
    tldr: "Urmărești non-stop date, model, infra și acuratețea predicțiilor.",
    plain:
`După deploy nu te oprești. Monitorizezi continuu: vin datele cum trebuie? mai e modelul precis? mai are infra resurse? Așa prinzi degradarea ÎNAINTE ca businessul să simtă lovitura.`,
    realworld: ["Alarmă când acuratețea scade sub un prag sau când distribuția datelor de intrare se schimbă (drift)."],
    services: [
      { name: "Prometheus + Grafana", fit: "Metrici de infra/serving." },
      { name: "Evidently AI / Arize / WhyLabs / Fiddler", fit: "Monitorizare specifică ML (drift, calitate predicții)." },
      { name: "SageMaker Model Monitor", fit: "Monitorizare nativă cloud." }
    ]
  });
  add({
    id: "P9", group: "principles", groupLabel: "9 Principles", tag: "P9",
    title: "P9 · Feedback loops",
    meta: "Implemented by C1, C9",
    verbatim:
`Feedback loops. Multiple feedback loops are required to integrate insights from the quality assessment step into the development or engineering process (e.g., a feedback loop from the experimental model engineering stage to the previous feature engineering stage). Another feedback loop is required from the monitoring component (e.g., observing the model serving performance) to the scheduler to enable the retraining.`,
    tldr: "Ce afli din monitorizare se întoarce automat în pașii dinainte (features, experiment, reantrenare).",
    plain:
`Sistemul nu e o linie dreaptă, ci bucle: monitorizarea descoperă o problemă → trimite semnal înapoi la scheduler (reantrenează), la data engineering (ajustează features) sau la experiment (data scientistul îmbunătățește modelul).`,
    realworld: ["Detectezi drift în producție → automat se declanșează reantrenarea, fără intervenție umană."],
    services: [
      { name: "Monitor → Orchestrator", fit: "Evidently/Arize declanșează un DAG Airflow/Kubeflow de reantrenare." }
    ]
  });

  /* ========================================================================
     GROUP: COMPONENTS (C1–C9)
     ===================================================================== */
  add({
    id: "C1", group: "components", groupLabel: "9 Components", tag: "C1",
    title: "C1 · CI/CD Component",
    meta: "Implements P1, P6, P9",
    verbatim:
`CI/CD Component (P1, P6, P9). The CI/CD component ensures continuous integration, continuous delivery, and continuous deployment. It takes care of the build, test, delivery, and deploy steps. It provides rapid feedback to developers regarding the success or failure of certain steps, thus increasing the overall productivity. Examples are Jenkins and GitHub actions.`,
    tldr: "Motorul care construiește, testează și livrează automat la fiecare schimbare.",
    plain:
`Piesa concretă care implementează principiul CI/CD. Detectează un commit, pornește build + test, și împinge artefactul mai departe (delivery/deploy).`,
    realworld: ["Pipeline care la fiecare push rulează testele și publică imaginea modelului în registry."],
    services: [
      { name: "Jenkins", fit: "Auto-hostat, foarte flexibil." },
      { name: "GitHub Actions / GitLab CI", fit: "Integrate direct în repo." }
    ]
  });
  add({
    id: "C2", group: "components", groupLabel: "9 Components", tag: "C2",
    title: "C2 · Source Code Repository",
    meta: "Implements P4, P5",
    verbatim:
`Source Code Repository (P4, P5). The source code repository ensures code storing and versioning. It allows multiple developers to commit and share their code. Examples include Bitbucket, GitLab, GitHub, and Gitea.`,
    tldr: "Locul unde stă și se versionează codul, partajat de toți.",
    plain:
`Inima colaborării: tot codul (de pipeline, de antrenare, de serving) trăiește aici, versionat, cu istoric și review.`,
    realworld: ["Repo central unde data scientistul comite codul de training și DevOps-ul codul de pipeline."],
    services: [
      { name: "GitHub / GitLab / Bitbucket / Gitea", fit: "Hosting Git cu PR-uri și permisiuni." }
    ]
  });
  add({
    id: "C3", group: "components", groupLabel: "9 Components", tag: "C3",
    title: "C3 · Workflow Orchestration Component",
    meta: "Implements P2, P3, P6",
    verbatim:
`Workflow Orchestration Component (P2, P3, P6). The workflow orchestration component offers task orchestration of an ML workflow via directed acyclic graphs (DAGs). These graphs represent execution order and artifact usage of single steps of the workflow. Examples include Apache Airflow, Kubeflow Pipelines, Luigi, AWS SageMaker Pipelines, and Azure Pipelines.`,
    tldr: "Dirijorul care rulează pașii pipeline-ului în ordinea corectă (DAG).",
    plain:
`Componenta care chiar execută graful de task-uri: pornește fiecare pas când dependențele sunt gata, trece artefactele între pași și strânge log-uri.`,
    realworld: ["Airflow rulează în fiecare noapte DAG-ul de reantrenare și retrimite pașii care eșuează."],
    services: [
      { name: "Apache Airflow / Luigi", fit: "Orchestrare generală." },
      { name: "Kubeflow Pipelines / SageMaker Pipelines / Azure Pipelines", fit: "Orchestrare ML pe Kubernetes/cloud." }
    ]
  });
  add({
    id: "C4", group: "components", groupLabel: "9 Components", tag: "C4",
    title: "C4 · Feature Store System",
    meta: "Implements P3, P4",
    verbatim:
`Feature Store System (P3, P4). A feature store system ensures central storage of commonly used features. It has two databases configured: One database as an offline feature store to serve features with normal latency for experimentation, and one database as an online feature store to serve features with low latency for predictions in production. Examples include Google Feast, Amazon AWS Feature Store, Tecton.ai and Hopsworks.ai. This is where most of the data for training ML models will come from. Moreover, data can also come directly from any kind of data store.`,
    tldr: "Un depozit central de feature-uri, cu o bază offline (training) și una online (producție rapidă).",
    plain:
`Feature store-ul rezolvă o problemă subtilă: feature-urile folosite la antrenare trebuie să fie EXACT aceleași ca cele folosite la predicție (altfel apare „training/serving skew”). Două baze: offline (latanță normală, pentru experimente) și online (latanță mică, pentru predicții real-time).`,
    realworld: ["Feature „cheltuieli ultimele 30 zile” calculat o dată și reutilizat de toate modelele, identic în training și producție."],
    services: [
      { name: "Feast (open-source)", fit: "Feature store gratuit, self-hosted." },
      { name: "Tecton / Hopsworks", fit: "Feature stores enterprise managed." },
      { name: "SageMaker / Vertex AI / Databricks Feature Store", fit: "Native în cloud-uri." }
    ]
  });
  add({
    id: "C5", group: "components", groupLabel: "9 Components", tag: "C5",
    title: "C5 · Model Training Infrastructure",
    meta: "Implements P6",
    verbatim:
`Model Training Infrastructure (P6). The model training infrastructure provides the foundational computation resources, e.g., CPUs, RAM, and GPUs. The provided infrastructure can be either distributed or non-distributed. In general, a scalable and distributed infrastructure is recommended. Frameworks supporting infrastructure are Kubernetes and Red Hat OpenShift.`,
    tldr: "Mușchii de calcul (CPU/GPU/RAM) pe care rulează antrenarea, ideal scalabili.",
    plain:
`Antrenarea cere putere de calcul. Componenta asta oferă resursele — de preferat scalabile și distribuite, ca să poți antrena modele mari și să gestionezi cererea variabilă.`,
    realworld: ["Cluster Kubernetes cu noduri GPU care pornesc doar când rulează un job de training."],
    services: [
      { name: "Kubernetes / Red Hat OpenShift", fit: "Orchestrare de containere și resurse." },
      { name: "Ray / SageMaker Training / Vertex Training", fit: "Antrenare distribuită managed." }
    ]
  });
  add({
    id: "C6", group: "components", groupLabel: "9 Components", tag: "C6",
    title: "C6 · Model Registry",
    meta: "Implements P3, P4",
    verbatim:
`Model Registry (P3, P4). The model registry stores centrally the trained ML models together with their metadata. It has two main functionalities: storing the ML artifact and storing the ML metadata (see C7). Advanced storage examples include MLflow, AWS SageMaker Model Registry, Microsoft Azure ML Model Registry, and Neptune.ai. Simple storage examples include Microsoft Azure Storage, Google Cloud Storage, and Amazon AWS S3.`,
    tldr: "Raftul oficial cu modele antrenate + metadatele lor + statusul (staging/producție).",
    plain:
`După ce ai antrenat un model bun, îl pui în registry. De acolo se ia pentru deploy. Registry-ul știe versiunile, statusul (în testare vs gata de producție) și de unde vine fiecare model.`,
    realworld: ["Promovezi modelul v5 din „staging” în „production” și asta declanșează deploy-ul."],
    services: [
      { name: "MLflow Model Registry / Neptune.ai", fit: "Registry avansat cu staging/prod." },
      { name: "SageMaker / Azure / Vertex Model Registry", fit: "Native cloud." },
      { name: "S3 / GCS / Azure Storage", fit: "Variantă simplă (doar fișiere)." }
    ]
  });
  add({
    id: "C7", group: "components", groupLabel: "9 Components", tag: "C7",
    title: "C7 · ML Metadata Stores",
    meta: "Implements P4, P7",
    verbatim:
`ML Metadata Stores (P4, P7). ML metadata stores allow for the tracking of various kinds of metadata, e.g., for each orchestrated ML workflow pipeline task. Another metadata store can be configured within the model registry for tracking and logging the metadata of each training job (e.g., training date and time, duration, etc.), including the model specific metadata—e.g., used parameters and the resulting performance metrics, model lineage: data and code used. Examples include orchestrators with built-in metadata stores tracking each step of experiment pipelines such as Kubeflow Pipelines, AWS SageMaker Pipelines, Azure ML, and IBM Watson Studio. MLflow provides an advanced metadata store in combination with the model registry.`,
    tldr: "Baza de date cu istoricul tuturor antrenărilor și lineage-ul (date+cod) fiecărui model.",
    plain:
`Sora principiului P7: locul concret unde se scriu metadatele. Adesea e integrat în orchestrator sau în registry. Fără el, nu poți răspunde la „de unde vine modelul ăsta?”.`,
    realworld: ["Cauți în metadata store de ce modelul din martie era mai bun și vezi ce date/parametri avea."],
    services: [
      { name: "MLflow", fit: "Metadata store + registry împreună." },
      { name: "Kubeflow / SageMaker Pipelines / Azure ML / Vertex ML Metadata", fit: "Metadata store integrat în orchestrator." }
    ]
  });
  add({
    id: "C8", group: "components", groupLabel: "9 Components", tag: "C8",
    title: "C8 · Model Serving Component",
    meta: "Implements P1",
    verbatim:
`Model Serving Component (P1). The model serving component can be configured for different purposes. Examples are online inference for real-time predictions or batch inference for predictions using large volumes of input data. The serving can be provided, e.g., via a REST API. As a foundational infrastructure layer, a scalable and distributed model serving infrastructure is recommended. One example of a model serving configuration is the use of a Kubernetes and Docker technology to containerize the ML model, and leveraging a Python web application framework like Flask with an API for serving. Other Kubernetes supported frameworks are KServing of Kubeflow, TensorFlow Serving, and Seldon.io serving. Inferencing could also be realized with Apache Spark for batch predictions.`,
    tldr: "Piesa care servește predicțiile — real-time (REST) sau în batch.",
    plain:
`După deploy, cineva trebuie să răspundă la cereri de predicție. Online = răspuns instant printr-un API (ex. fraudă la plată). Batch = procesezi milioane de rânduri o dată (ex. scoring nocturn). De obicei modelul e într-un container, expus prin REST.`,
    realworld: ["Endpoint REST care primește o tranzacție și răspunde în 50ms „fraudă: da/nu”."],
    services: [
      { name: "KServe / TensorFlow Serving / Seldon Core", fit: "Serving pe Kubernetes." },
      { name: "BentoML / Triton / Flask", fit: "Împachetare model ca API." },
      { name: "SageMaker Endpoints / Vertex Prediction / Azure ML Endpoints", fit: "Serving managed." },
      { name: "Apache Spark", fit: "Inferență în batch pe volume mari." }
    ]
  });
  add({
    id: "C9", group: "components", groupLabel: "9 Components", tag: "C9",
    title: "C9 · Monitoring Component",
    meta: "Implements P8, P9",
    verbatim:
`Monitoring Component (P8, P9). The monitoring component takes care of the continuous monitoring of the model serving performance (e.g., prediction accuracy). Additionally, monitoring of the ML infrastructure, CI/CD, and orchestration are required. Examples include Prometheus with Grafana, ELK stack (Elasticsearch, Logstash, and Kibana), and simply TensorBoard. Examples with built-in monitoring capabilities are Kubeflow, MLflow, and AWS SageMaker model monitor or cloud watch.`,
    tldr: "Ochiul care urmărește serving-ul, infra și acuratețea, și declanșează feedback-ul.",
    plain:
`Implementarea concretă a monitorizării (P8) și sursa buclelor de feedback (P9). Urmărește nu doar dacă serverul e viu, ci și dacă modelul mai e bun (calitatea predicțiilor, drift).`,
    realworld: ["Grafana arată latanța endpoint-ului; Evidently arată că distribuția intrărilor s-a mutat → drift."],
    services: [
      { name: "Prometheus + Grafana / ELK", fit: "Metrici și loguri de infra." },
      { name: "Evidently / Arize / WhyLabs", fit: "Monitorizare de model (drift, calitate)." },
      { name: "SageMaker Model Monitor / CloudWatch", fit: "Monitorizare nativă cloud." }
    ]
  });

  /* ========================================================================
     GROUP: ROLES (R1–R7)
     ===================================================================== */
  add({
    id: "R1", group: "roles", groupLabel: "7 Roles", tag: "R1",
    title: "R1 · Business Stakeholder",
    meta: "aka Product Owner, Project Manager",
    verbatim:
`Business Stakeholder (similar roles: Product Owner, Project Manager). The business stakeholder defines the business goal to be achieved with ML and takes care of the communication side of the business, e.g., presenting the return on investment (ROI) generated with an ML product.`,
    tldr: "Omul cu problema de business și cu banii — definește „de ce” și măsoară ROI.",
    plain:
`Nu scrie cod, dar fără el proiectul n-are sens: stabilește obiectivul de business și justifică investiția. Echivalentul Product Owner-ului.`,
    realworld: ["Un Product Owner care cere „reducem churn-ul cu 10%” și raportează board-ului ROI-ul."],
    services: [{ name: "Jira / dashboards de business", fit: "Definește cerințe și urmărește impactul." }]
  });
  add({
    id: "R2", group: "roles", groupLabel: "7 Roles", tag: "R2",
    title: "R2 · Solution Architect",
    meta: "aka IT Architect",
    verbatim:
`Solution Architect (similar roles: IT Architect). The solution architect designs the architecture and defines the technologies to be used, following a thorough evaluation.`,
    tldr: "Decide arhitectura și ce tehnologii se folosesc.",
    plain:
`Alege „cu ce construim”: cloud sau on-prem, ce feature store, ce orchestrator etc. — după o evaluare serioasă, nu după modă.`,
    realworld: ["Arhitectul decide Vertex AI vs. stack open-source pe Kubernetes, în funcție de buget și echipă."],
    services: [{ name: "Diagrame & ADR-uri", fit: "Documentează deciziile de arhitectură." }]
  });
  add({
    id: "R3", group: "roles", groupLabel: "7 Roles", tag: "R3",
    title: "R3 · Data Scientist",
    meta: "aka ML Specialist, ML Developer",
    verbatim:
`Data Scientist (similar roles: ML Specialist, ML Developer). The data scientist translates the business problem into an ML problem and takes care of the model engineering, including the selection of the best-performing algorithm and hyperparameters.`,
    tldr: "Transformă problema de business în problemă ML și construiește modelul.",
    plain:
`Inima experimentării: decide dacă e regresie/clasificare, alege algoritmul și hyperparametrii, antrenează și validează până iese un model bun.`,
    realworld: ["Data scientistul testează 30 de combinații de hyperparametri și alege modelul cu cel mai bun F1."],
    services: [{ name: "Jupyter / scikit-learn / PyTorch / MLflow", fit: "Experimentare și tracking." }]
  });
  add({
    id: "R4", group: "roles", groupLabel: "7 Roles", tag: "R4",
    title: "R4 · Data Engineer",
    meta: "aka DataOps Engineer",
    verbatim:
`Data Engineer (similar roles: DataOps Engineer). The data engineer builds up and manages data and feature engineering pipelines. Moreover, this role ensures proper data ingestion to the databases of the feature store system.`,
    tldr: "Construiește pipeline-urile de date și feature-uri și alimentează feature store-ul.",
    plain:
`Se ocupă de „combustibil”: aduce datele, le curăță, le transformă în feature-uri și le bagă în feature store, corect și la timp.`,
    realworld: ["Data engineerul scrie jobul care curăță datele brute și încarcă feature-urile în Feast."],
    services: [{ name: "Spark / dbt / Airflow / Feast", fit: "Pipeline-uri de date și ingest în feature store." }]
  });
  add({
    id: "R5", group: "roles", groupLabel: "7 Roles", tag: "R5",
    title: "R5 · Software Engineer",
    meta: "",
    verbatim:
`Software Engineer. The software engineer applies software design patterns, widely accepted coding guidelines, and best practices to turn the raw ML problem into a well-engineered product.`,
    tldr: "Transformă codul de experiment în cod de producție, curat și solid.",
    plain:
`Codul de notebook e adesea „spaghetti”. Software engineerul îl rescrie cu pattern-uri, teste și standarde, ca să reziste în producție (inclusiv codul de serving).`,
    realworld: ["Refactorizează scriptul de training într-un modul testat, reutilizabil."],
    services: [{ name: "Design patterns / linters / teste", fit: "Calitate și mentenabilitate a codului." }]
  });
  add({
    id: "R6", group: "roles", groupLabel: "7 Roles", tag: "R6",
    title: "R6 · DevOps Engineer",
    meta: "",
    verbatim:
`DevOps Engineer. The DevOps engineer bridges the gap between development and operations and ensures proper CI/CD automation, ML workflow orchestration, model deployment to production, and monitoring.`,
    tldr: "Podul Dev↔Ops: CI/CD, orchestrare, deploy și monitorizare.",
    plain:
`Se asigură că totul rulează automat și stabil în producție: pipeline-urile CI/CD, deploy-ul modelelor și monitorizarea.`,
    realworld: ["DevOps-ul setează pipeline-ul care, la promovarea unui model, îl deployează automat."],
    services: [{ name: "Jenkins / GitHub Actions / Kubernetes / Prometheus", fit: "Automatizare și operare." }]
  });
  add({
    id: "R7", group: "roles", groupLabel: "7 Roles", tag: "R7",
    title: "R7 · ML Engineer / MLOps Engineer",
    meta: "Cross-domain role",
    verbatim:
`ML Engineer/MLOps Engineer. The ML engineer or MLOps engineer combines aspects of several roles and thus has cross-domain knowledge. This role incorporates skills from data scientists, data engineers, software engineers, DevOps engineers, and backend engineers. This cross-domain role builds up and operates the ML infrastructure, manages the automated ML workflow pipelines and model deployment to production, and monitors both the model and the ML infrastructure.`,
    tldr: "„Omul-orchestră”: combină ML + data + software + DevOps și ține tot sistemul în picioare.",
    plain:
`Rolul cel mai căutat și cel mai rar: înțelege din toate, construiește și operează infrastructura ML, pipeline-urile automate și deploy-ul. Practic, liantul întregii Figuri 4.`,
    realworld: ["MLOps engineerul deține pipeline-ul end-to-end de la feature store până la monitorizare."],
    services: [{ name: "Tot stack-ul MLOps", fit: "Kubeflow + MLflow + Feast + KServe + Prometheus." }]
  });

  /* ========================================================================
     GROUP: WORKFLOW (Figure 4 zones) — clickable in figure4.html
     ===================================================================== */
  add({
    id: "wf-A", group: "workflow", groupLabel: "Workflow (Fig. 4)", zone: "A", tag: "A",
    title: "Zone A · MLOps Project Initiation",
    meta: "Steps 1–5 · Roles R1, R2, R3, R4",
    verbatim:
`(A) MLOps project initiation. (1) The business stakeholder (R1) analyzes the business and identifies a potential business problem that can be solved using ML. (2) The solution architect (R2) defines the architecture design for the overall ML system and decides on the technologies to be used after a thorough evaluation. (3) The data scientist (R3) derives an ML problem—such as whether regression or classification should be used—from the business goal. (4) The data engineer (R4) and the data scientist (R3) work together in an effort to understand which data is required to solve the problem. (5) Once the answers are clarified, the data engineer (R4) and data scientist (R3) collaborate to locate the raw data sources for the initial data analysis. They check the distribution, and quality of the data, as well as performing validation checks. Furthermore, they ensure that the incoming data from the data sources is labeled, meaning that a target attribute is known, as this is a mandatory requirement for supervised ML.`,
    tldr: "Faza de „înainte de cod”: definești problema, arhitectura, tipul de ML și verifici datele.",
    plain:
`Aici nimeni nu antrenează încă nimic. Businessul spune CE problemă rezolvăm, arhitectul spune CU CE o construim, data scientistul traduce în „regresie sau clasificare?”, iar data engineer + data scientist găsesc datele și le verifică (calitate, distribuție, dacă au etichete pentru ML supervizat). Sări peste faza asta = construiești pe nisip.`,
    realworld: [
      "„Vrem să reducem churn-ul” → devine o clasificare binară (pleacă / rămâne).",
      "Descoperi din timp că 40% din date n-au etichetă și ajustezi planul."
    ],
    services: [
      { name: "Jira / Miro", fit: "Definirea problemei și a arhitecturii." },
      { name: "Great Expectations / Pandas profiling", fit: "Verificările de calitate și distribuție a datelor." }
    ]
  });
  add({
    id: "wf-B", group: "workflow", groupLabel: "Workflow (Fig. 4)", zone: "B", tag: "B",
    title: "Zone B · Data Engineering (Feature Engineering Pipeline)",
    meta: "Steps 6–12 · Roles R3, R4, R5 · B1 reguli, B2 pipeline",
    verbatim:
`(B1) Requirements for feature engineering pipeline. The features are the relevant attributes required for model training. (6) The data engineer (R4) defines the data transformation rules (normalization, aggregations) and cleaning rules to bring the data into a usable format. (7) The data scientist (R3) and data engineer (R4) together define the feature engineering rules, such as the calculation of new and more advanced features based on other features. These initially defined rules must be iteratively adjusted based on the feedback coming from the experimental model engineering stage or from the monitoring component.

(B2) Feature engineering pipeline. The initially defined requirements for the feature engineering pipeline are taken by the data engineer (R4) and software engineer (R5) as a starting point to build up the prototype of the feature engineering pipeline. (8) First, the feature engineering pipeline connects to the raw data, which can be (for instance) streaming data, static batch data, or data from any cloud storage. (9) The data will be extracted from the data sources. (10) The data preprocessing begins with data transformation and cleaning tasks. (11) The feature engineering task calculates new and more advanced features based on other features. (12) Lastly, a data ingestion job loads batch or streaming data into the feature store system (C4). The target can either be the offline or online database (or any kind of data store).`,
    tldr: "Fabrica de feature-uri: definești regulile (B1), apoi construiești pipeline-ul care curăță datele și le bagă în feature store (B2).",
    plain:
`Două sub-zone. B1 = REGULILE (cum normalizez, cum agreg, ce feature-uri noi calculez) — și aceste reguli se ajustează mereu pe baza feedback-ului. B2 = PIPELINE-UL care chiar le execută: se conectează la datele brute (stream/batch/cloud), le extrage, le curăță, calculează feature-urile și le încarcă în feature store (offline + online). E momentul în care „date brute haotice” devin „feature-uri curate, gata de antrenare”.`,
    realworld: [
      "Regulă: „venit = media tranzacțiilor pe 90 de zile” — definită o dată, aplicată peste tot.",
      "Job nocturn care citește din Kafka, curăță și scrie feature-uri în Feast (online + offline)."
    ],
    services: [
      { name: "Spark / dbt / Pandas", fit: "Transformare și curățare (pașii 10–11)." },
      { name: "Kafka / Kinesis", fit: "Sursele de date streaming (pasul 8–9)." },
      { name: "Feast / Tecton / SageMaker Feature Store", fit: "Ținta ingestului (pasul 12)." },
      { name: "Airflow / Kubeflow (C3) + CI/CD (C1)", fit: "Orchestrarea și automatizarea pipeline-ului." }
    ]
  });
  add({
    id: "wf-C", group: "workflow", groupLabel: "Workflow (Fig. 4)", zone: "C", tag: "C",
    title: "Zone C · Experimentation",
    meta: "Steps 13–17 (+ commit/build/test/deliver) · Roles R3, R5, R6, R7",
    verbatim:
`(C) Experimentation. Most tasks in the experimentation stage are led by the data scientist (R3), supported by the software engineer (R5). (13) The data scientist (R3) connects to the feature store system (C4) for the data analysis. In case of any required data adjustments, the data scientist reports the required changes back to the data engineering zone (feedback loop). (14) Then the preparation and validation of the data coming from the feature store system is required. This task also includes the train and test split dataset creation. (15) The data scientist estimates the best-performing algorithm and hyperparameters, and the model training is then triggered with the training data (C5). (16) Different model parameters are tested and validated interactively during several rounds of model training; together these tasks can be called "model engineering." (17) The data scientist exports the model and commits the code to the repository.

As a foundational requirement, either the DevOps engineer (R6) or the ML engineer (R7) defines the code for the (C2) automated ML workflow pipeline and commits it to the repository. Once a new ML model or new ML workflow pipeline code is committed, the CI/CD component (C1) detects the updated code and triggers automatically the CI/CD pipeline carrying out the build, test, and delivery steps. The delivery step pushes the versioned artifact(s)—such as images—to the artifact store (e.g., image registry).`,
    tldr: "Laboratorul: data scientistul caută cel mai bun model, apoi îl comite în repo și CI/CD îl împachetează.",
    plain:
`Aici se face „model engineering”: te conectezi la feature store, faci split train/test, alegi algoritmul și hyperparametrii, antrenezi și validezi în mai multe runde până iese bine. Când e gata, data scientistul comite codul în repo. În paralel, DevOps/ML engineer pregătesc codul pipeline-ului automat. Orice commit declanșează CI/CD-ul care face build + test + delivery (împinge imaginea în artifact store). Dacă datele sunt nasoale, trimiți feedback înapoi în Zone B.`,
    realworld: [
      "Data scientistul rulează un sweep de hyperparametri în W&B și alege cel mai bun model.",
      "Un `git push` declanșează GitHub Actions care construiește imaginea Docker a modelului."
    ],
    services: [
      { name: "Jupyter / scikit-learn / PyTorch / XGBoost", fit: "Antrenare și validare (pașii 14–16)." },
      { name: "MLflow / Weights & Biases", fit: "Tracking experimente și selecție model." },
      { name: "GitHub/GitLab (C2) + Jenkins/GitHub Actions (C1)", fit: "Commit + build/test/deliver." },
      { name: "Image registry (Docker Hub / ECR / GCR)", fit: "Artifact store pentru imagini." }
    ]
  });
  add({
    id: "wf-D", group: "workflow", groupLabel: "Workflow (Fig. 4)", zone: "D", tag: "D",
    title: "Zone D · ML Production (Automated Pipeline, Serving, Monitoring, Feedback)",
    meta: "Steps 18–28 · Roles R5, R6, R7",
    verbatim:
`(D) Automated ML workflow pipeline. The DevOps engineer (R6) and ML engineer (R7) manage the automated ML workflow pipeline and the underlying training infrastructure (e.g., Kubernetes, C5). The workflow orchestration component (C3) orchestrates the tasks; for each task the required artifacts are pulled from the artifact store and executed in an isolated environment (e.g., containers). Once triggered: (18) automated pulling of versioned features from the feature store (data extraction); (19) automated data preparation and validation + train/test split; (20) automated final model training on new unseen data—algorithm and hyperparameters are predefined from the experimentation stage; (21) automated model evaluation and iterative hyperparameter adjustments if required; (22) the trained model is exported and (23) pushed to the model registry (C6).

For all training job iterations, the ML metadata store (C7) records parameters, performance metrics, training job ID, date/time, duration, and model lineage (data + code), as well as the model version and status (staging or production-ready).

Once a model's status is switched from staging to production, (24) the CI/CD component (C1) triggers the continuous deployment pipeline; the production-ready model and serving code are pulled, built, tested and deployed. (25) The model serving component (C8) makes predictions on new data—online inference (low-latency online DB) or batch inference (offline DB), often via a container and REST API. (26) The monitoring component (C9) observes serving performance and infrastructure in real-time. (27) The feedback loop forwards insights from monitoring to upstream receivers (experimental stage, data engineering zone, and the scheduler). (28) Detection of concept drift enables continuous training: the scheduler triggers the automated ML workflow pipeline for retraining. Retraining can also be triggered when new feature data is available, or scheduled periodically.`,
    tldr: "Banda automată: reantrenează, înregistrează, deployează, servește, monitorizează și — la drift — reia totul singură.",
    plain:
`Aici dispare omul din buclă. Schedulerul + orchestratorul rulează automat: extrag features versionate, pregătesc datele, reantrenează cu setările deja stabilite în Zone C, evaluează, și împing modelul în registry (cu toate metadatele și lineage-ul). Când un model e marcat „production-ready”, CI/CD-ul îl deployează. Serving-ul răspunde la cereri (real-time prin REST sau în batch). Monitorizarea urmărește totul și, când detectează drift sau scădere de acuratețe, trimite feedback la scheduler care RE-PORNEȘTE pipeline-ul. Asta e „continuous training” — sistemul se auto-întreține.`,
    realworld: [
      "Drift detectat de Evidently → Airflow pornește automat reantrenarea, fără ca cineva să apese un buton.",
      "Endpoint SageMaker care servește predicții real-time, monitorizat de Model Monitor + CloudWatch.",
      "Reantrenare programată săptămânal chiar dacă nu există drift, ca plasă de siguranță."
    ],
    services: [
      { name: "Kubeflow / SageMaker / Vertex AI Pipelines (C3)", fit: "Orchestrarea pipeline-ului automat (pașii 18–23)." },
      { name: "Kubernetes (C5)", fit: "Infra de training/serving scalabilă." },
      { name: "MLflow Registry (C6) + ML Metadata (C7)", fit: "Versionare model + lineage." },
      { name: "KServe / Seldon / SageMaker Endpoints (C8)", fit: "Serving real-time/batch (pașii 24–25)." },
      { name: "Prometheus+Grafana / Evidently / Arize (C9)", fit: "Monitorizare + declanșarea feedback-ului (pașii 26–28)." }
    ]
  });

  /* ========================================================================
     GROUP: DEFINITION
     ===================================================================== */
  add({
    id: "definition", group: "definition", groupLabel: "Definition",
    title: "6 · Conceptualization — the MLOps definition",
    meta: "Section 6",
    verbatim:
`MLOps (Machine Learning Operations) is a paradigm, including aspects like best practices, sets of concepts, as well as a development culture when it comes to the end-to-end conceptualization, implementation, monitoring, deployment, and scalability of machine learning products. Most of all, it is an engineering practice that leverages three contributing disciplines: machine learning, software engineering (especially DevOps), and data engineering. MLOps is aimed at productionizing machine learning systems by bridging the gap between development (Dev) and operations (Ops). Essentially, MLOps aims to facilitate the creation of machine learning products by leveraging these principles: CI/CD automation, workflow orchestration, reproducibility; versioning of data, model, and code; collaboration; continuous ML training and evaluation; ML metadata tracking and logging; continuous monitoring; and feedback loops.`,
    tldr: "MLOps = cultură + practici + cele 9 principii, la intersecția ML + software/DevOps + data engineering.",
    plain:
`Definiția oficială a paperului. Reține trei lucruri: (1) e un PARADIGM, nu un tool; (2) stă la intersecția a trei discipline; (3) se rezumă la cele 9 principii enumerate. Scopul final: să duci ML în producție, eliminând prăpastia Dev↔Ops.`,
    realworld: ["Când cineva spune „cumpărăm MLOps”, de fapt adoptă o cultură + un set de practici, nu un singur produs."],
    services: [{ name: "Platforme MLOps", fit: "SageMaker / Vertex / Azure ML / Databricks acoperă multe principii, dar cultura tot tu o aduci." }]
  });

  /* ========================================================================
     GROUP: OPEN CHALLENGES
     ===================================================================== */
  add({
    id: "challenges", group: "challenges", groupLabel: "Open Challenges",
    title: "7 · Open Challenges",
    meta: "Organizational · ML system · Operational",
    verbatim:
`Organizational challenges. The mindset and culture of data science practice is a typical challenge in organizational settings. There needs to be a culture shift away from model-driven machine learning toward a product-oriented discipline. A great number of skills and individual roles are required for MLOps; there is a lack of highly skilled experts for these roles.

ML system challenges. A major challenge with regard to MLOps systems is designing for fluctuating demand, especially in relation to the process of ML training. This makes it difficult to precisely estimate the necessary infrastructure resources (CPU, RAM, and GPU) and requires a high level of flexibility of the infrastructure.

Operational challenges. In productive settings, it is challenging to operate ML manually due to different stacks of software and hardware components and their interplay. Therefore, robust automation is required. Also, a constant incoming stream of new data forces retraining capabilities. These repetitive tasks yield a large number of artifacts that require a strong governance as well as versioning of data, model, and code. Lastly, it is challenging to resolve a potential support request (e.g., by finding the root cause), as many parties and components are involved.`,
    tldr: "Trei tipuri de obstacole: oameni/cultură, resurse fluctuante, și operare complexă.",
    plain:
`Chiar cu arhitectura ideală, rămân trei dureri reale: (1) ORGANIZAȚIONAL — trebuie schimbată mentalitatea (de la „model” la „produs”) și nu există destui experți; (2) SISTEM — cererea de calcul variază mult, greu de dimensionat infra; (3) OPERAȚIONAL — multe componente și echipe, deci automatizare puternică și governance, altfel debugging-ul devine coșmar.`,
    realworld: [
      "Greu de angajat un MLOps engineer bun — exact lipsa de skill-uri din paper.",
      "Training-ul cere 8 GPU câteva ore pe zi, apoi nimic — de aici nevoia de infra elastică (autoscaling)."
    ],
    services: [
      { name: "Kubernetes autoscaling / spot instances", fit: "Răspund la cererea fluctuantă (ML system challenge)." },
      { name: "Lineage & governance (MLflow, ML metadata)", fit: "Ajută la root-cause în debugging (operational challenge)." }
    ]
  });

  /* ========================================================================
     GROUP: CONCLUSION
     ===================================================================== */
  add({
    id: "conclusion", group: "conclusion", groupLabel: "Conclusion",
    title: "8 · Conclusion",
    meta: "Section 8",
    verbatim:
`With the increase of data availability and analytical capabilities, coupled with the constant pressure to innovate, more machine learning products than ever are being developed. However, only a small number of these proofs of concept progress into deployment and production. Furthermore, the academic space has focused intensively on machine learning model building and benchmarking, but too little on operating complex machine learning systems in real-world scenarios. The paradigm of Machine Learning Operations (MLOps) addresses these challenges. In this work, we shed more light on MLOps. By conducting a mixed-method study analyzing existing literature and tools, as well as interviewing eight experts from the field, we uncover four main aspects of MLOps: its principles, components, roles, and architecture.`,
    tldr: "Concluzie: prea puține PoC-uri ajung în producție; MLOps (principii + componente + roluri + arhitectură) e răspunsul.",
    plain:
`Se închide cercul de la abstract: se fac multe modele, ajung puține în producție, iar academia a ignorat partea de operare. Contribuția paperului = cele patru piese (principii, componente, roluri, arhitectură) care îți dau o hartă completă.`,
    realworld: ["Acest ghid interactiv însuși este o materializare a celor patru aspecte din concluzie."],
    services: [{ name: "Toată stiva discutată", fit: "Pune cap la cap principiile, componentele și rolurile în arhitectura din Figura 4." }]
  });

  /* ========================================================================
     RENDER HELPERS
     ===================================================================== */
  function esc(s) {
    return String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }
  function paras(s) {
    return esc(s).split(/\n\n+/).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  }
  /* Paragraphs with citation links ([1], [14,32], [24–26] → links to the refs). */
  function refLinkify(escaped) {
    return (global.MLOPS_REFS && global.MLOPS_REFS.linkify) ? global.MLOPS_REFS.linkify(escaped) : escaped;
  }
  function parasRefs(s) {
    return esc(s).split(/\n\n+/).map(p => `<p>${refLinkify(p.replace(/\n/g, "<br>"))}</p>`).join("");
  }
  function refChips(s) {
    return (global.MLOPS_REFS && global.MLOPS_REFS.chips) ? global.MLOPS_REFS.chips(s) : "";
  }

  /* Render a single entry to an HTML string (used by both pages) */
  function renderEntry(e) {
    const services = (e.services || []).map(s =>
      `<li><b>${esc(s.name)}</b> — ${esc(s.fit)}</li>`).join("");
    const real = (e.realworld || []).map(r => `<li>${esc(r)}</li>`).join("");
    const tag = e.tag ? `<span class="vb-tag">${esc(e.tag)}</span>` : "";
    return `
    <article class="vb-entry" id="vb-${e.id}" data-zone="${e.zone || ""}" data-group="${e.group}">
      <header class="vb-head">${tag}<div>
        <h4 class="vb-title">${esc(e.title)}</h4>
        ${e.meta ? `<div class="vb-meta">${esc(e.meta)}</div>` : ""}
      </div></header>

      <div class="vb-grid">
        <section class="vb-verbatim${e.crops && e.crops.length ? " vb-verbatim-img" : ""}">
          <div class="vb-label">📄 Verbatim — exact din paper</div>
          ${e.crops && e.crops.length
            ? `<figure class="vb-cuts">${
                e.crops.map(src => `<img class="vb-cut" loading="lazy" src="${esc(src)}" alt="${esc(e.verbatim)}">`).join("")
              }</figure>
              <details class="vb-cut-text"><summary>text version</summary>${parasRefs(e.verbatim)}</details>`
            : parasRefs(e.verbatim)}
          ${refChips(e.verbatim)}
        </section>

        <section class="vb-side">
          <div class="vb-block vb-tldr">
            <div class="vb-label">⚡ Pe scurt</div>
            <p>${esc(e.tldr)}</p>
          </div>
          <div class="vb-block">
            <div class="vb-label">💡 Pe înțelesul tuturor</div>
            ${paras(e.plain)}
          </div>
          ${real ? `<div class="vb-block">
            <div class="vb-label">🌍 Real-world</div>
            <ul>${real}</ul>
          </div>` : ""}
          ${services ? `<div class="vb-block">
            <div class="vb-label">🔧 Servicii & cum se fituie</div>
            <ul class="vb-services">${services}</ul>
          </div>` : ""}
        </section>
      </div>
    </article>`;
  }

  /* Render the full companion grouped by section (used by the guide) */
  function renderAll(container) {
    const groups = [];
    const seen = {};
    S.forEach(e => {
      if (!seen[e.group]) { seen[e.group] = { label: e.groupLabel, items: [] }; groups.push(e.group); }
      seen[e.group].items.push(e);
    });
    container.innerHTML = groups.map(g => `
      <div class="vb-group">
        <h3 class="vb-group-title">${esc(seen[g].label)}</h3>
        ${seen[g].items.map(renderEntry).join("")}
      </div>`).join("");
  }

  function byZone(z) { return S.filter(e => e.zone === z); }
  function byId(id) { return S.find(e => e.id === id); }

  global.MLOPS_DOC = { sections: S, renderEntry, renderAll, byZone, byId };
})(typeof window !== "undefined" ? window : this);
