// News data
const newsData = [
    {
        title: "New work in Nature Chemistry!",
        date: "Aug 26, 2026",
        excerpt: "Our latest collaboration with Prof Marc Vendrell and his team in Nature Chemistry presents a general strategy for multicolour fluorogenic peptides and wash-free bioassays.",
        content: `<p>🌈 <strong>New work in Nature Chemistry!</strong></p>
<p>We are delighted to share our latest collaborative work with <strong>Prof Marc Vendrell and his team</strong>, published in <em>Nature Chemistry</em>:</p>
<p><strong>“A general strategy towards multicolour fluorogenic peptides for wash-free bioassays”</strong></p>
<p>This work develops a general strategy for creating <strong>multicolour fluorogenic peptides</strong>, enabling wash-free fluorescence assays and real-time imaging in living systems.</p>
<p>Our group contributed <strong>computational modelling to resolve the molecular mechanism underlying fluorescence quenching</strong>, helping to connect molecular structure with photophysical behaviour and support the rational design of these fluorogenic systems. Much of this computational work was carried out by <strong>Lovelesh and Abedi</strong>—many congratulations to both of them for their excellent contributions!</p>
<p>This has been a rewarding collaboration, bringing together <strong>computational chemistry, fluorophore design, photophysics, peptide chemistry, and bioimaging</strong>. Many congratulations to Marc’s team and everyone involved!</p>
<p>🔗 <u>DOI: <a href="https://doi.org/10.1038/s41557-026-02228-0">10.1038/s41557-026-02228-0</a></u></p>`,
        slug: "new-work-in-nature-chemistry-multicolour-fluorogenic-peptides",
        image: "images/news/2026-08-26-nature-chemistry-multicolour-fluorogenic-peptides.png"
    },
    {
        title: "Welcome New PhD Student: Zhiyuan Yuan",
        date: "Jan 12, 2026",
        excerpt: "We are pleased to welcome Zhiyuan Yuan to PEARL as a new PhD student.",
        content: `<p>We are pleased to welcome Zhiyuan Yuan to PEARL as a new PhD student.</p>
<p>Zhiyuan holds a Master of Science in Chemistry from Zhejiang University and brings valuable research experience from his work in Hangzhou, China.</p>
<p>He brings valuable research experience from his work in Hangzhou, China, and we look forward to his contributions to the group.</p>`,
        slug: "welcome-new-phd-student-zhiyuan-yuan",
        image: "images/news/zhiyuan-yuan-joins.jpg"
    },
    {
        title: "PhD Student Lovelesh Passes Qualifying Exam at SUTD",
        date: "Nov 12, 2025",
        excerpt: "We are delighted to announce that our PhD student Lovelesh has successfully passed her PhD qualifying examination at the Singapore University of Technology and Design.",
        content: `<p>We are delighted to announce that our PhD student Lovelesh has successfully passed her PhD qualifying examination at the Singapore University of Technology and Design (SUTD). This significant milestone marks an important step in her doctoral journey and demonstrates her dedication and excellence in research.</p>
<p>Congratulations to Lovelesh on this achievement! We look forward to her continued contributions to the PEARL research group.</p>`,
        slug: "phd-student-lovelesh-passes-qualifying-exam-at-sutd",
        image: "images/news/lovelesh-phd-exam.jpg"
    },
    {
        title: "Fluorescence Research Group Begins a New Chapter at NTU CCEB",
        date: "Aug 26, 2025",
        excerpt: "The Fluorescence Research Group from SUTD has found its new home at NTU CCEB, marking an exciting new chapter for the team.",
        content: `<p>The Fluorescence Research Group from the Singapore University of Technology and Design (SUTD) has found its new home at the School of Chemistry, Chemical Engineering and Biotechnology (CCEB), Nanyang Technological University (NTU). This transition marks an exciting new chapter for our team as we broaden the scope of our research and continue to push the frontiers of molecular photochemistry.</p>
<p>To reflect this new direction, our group name has evolved from the Fluorescence Research Group to the Photon Emission and Reactivity Laboratory (PEARL).</p>
<p>During our first visit, we had a wonderful time exploring the new office space, research laboratories, and the beautiful NTU campus at Yunnan Garden. We look forward to building on our past achievements while embracing fresh opportunities and collaborations in our new environment.</p>`,
        slug: "fluorescence-research-group-begins-a-new-chapter-at-ntu-cceb",
        image: "images/news/pearl-launch.jpg"
    },
    {
        title: "Prof. Xiaogang Liu Joins NTU and Launches PEARL",
        date: "Aug 01, 2025",
        excerpt: "Prof. Xiaogang Liu has joined Nanyang Technological University (NTU) as an Associate Professor and established the Photon Emission and Reactivity Laboratory (PEARL).",
        content: `<p>Prof. Xiaogang Liu has joined Nanyang Technological University (NTU) as an Associate Professor in the School of Chemistry, Chemical Engineering & Biotechnology (NTU CCEB).</p>

<p>He has established the Photon Emission and Reactivity Laboratory (PEARL), continuing his research on the rational design of functional luminophores, integrating chemical synthesis, photophysical characterization, and computational modeling.</p>`,
        slug: "prof-xiaogang-liu-joins-ntu-and-launches-pearl",
        image: "images/news/prof-liu-joins-ntu.jpg"
    },
    {
        title: "Tianruo's Tetrazine Review Featured on the Back Cover of Chemical Science!",
        date: "Mar 22, 2025",
        excerpt: "Tianruo’s article, titled “Unveiling the photophysical mechanistic mysteries of tetrazine-functionalized fluorogenic labels,” is featured on the back cover of Chemical Science (Volume 16, Issue 11). T",
        content: `<p class="x_MsoNormal" data-olk-copy-source="MessageBody">Tianruo’s article, titled <i>“Unveiling the photophysical mechanistic mysteries of tetrazine-functionalized fluorogenic labels,”</i> is featured on the back cover of <i>Chemical Science</i> (Volume 16, Issue 11). The review is also highlighted in the themed collections: <b>#MyFirstChemSci 2025</b>, <b>2025 Chemical Science Covers</b>, and the <b>2025 Chemical Science Perspective & Review Collection</b>.</p>
<p class="x_MsoNormal">This review provides photophysical insights into the fluorescence quenching mechanisms that regulate the fluorogenicity of diverse tetrazine labels. The cover artwork, featuring a dark persimmon next to a bright one, symbolizes the fluorescence enhancement achieved through bio-orthogonal reactions that disrupt the tetrazine moiety.</p>`,
        slug: "tianruos-tetrazine-review-featured-on-the-back-cover-of-chemical-science",
        images: [
            "images/news/2025-03-22-tianruos-tetrazine-review-featured-on-the-back-cover-of-chemical-science-01.jpg"
        ]
    },
    {
        title: "Researchers from SUTD and FRG Join the Prestigious Global Young Scientists Summit 2025",
        date: "Jan 21, 2025",
        excerpt: "Dr. Syed Ali Abbas Abedi, a Research Fellow, and PhD student Lovelesh had the honor of attending the Global Young Scientists Summit (GYSS) 2025 at the National University of Singapore. This prestigiou",
        content: `Dr. Syed Ali Abbas Abedi, a Research Fellow, and PhD student Lovelesh had the honor of attending the Global Young Scientists Summit (GYSS) 2025 at the National University of Singapore. This prestigious summit brought together an impressive array of young scientists and established experts from around the world, promoting rich collaboration and innovation in science and technology.

During the event, they had the opportunity to engage in discussions with peers and notable leaders, including Nobel Laureates. These interactions not only enriched their professional networks but also expanded their professional understanding of various scientific disciplines. The summit was an inspiring platform, providing valuable insights and fostering meaningful connections across the scientific community.`,
        slug: "lovelesh-and-abedi-participate-in-the-prestigious-global-young-scientist-summit-2025",
        images: [
            "images/news/2025-01-21-lovelesh-and-abedi-participate-in-the-prestigious-global-young-scientist-01.jpg"
        ]
    },
    {
        title: "Tianruo Wins RSC Excellent Student Award",
        date: "Sep 11, 2024",
        excerpt: "\\r\\n                                                                                            Assoc. Prof. Liu Xiaogang’s PhD Student, Shen Tianruo, was honored with the \\\"Winner of RSC Excellent St",
        content: `
<p style="padding-left: 40px;">                                                                                            Assoc. Prof. Liu Xiaogang’s PhD Student, Shen Tianruo, was honored with the "Winner of RSC Excellent Student Award" by the Royal Society of Chemistry (RSC) this September. This award recognizes his academic excellence in leveraging computational chemistry to facilitate interdisciplinary research and his contribution to promoting diversity, equity, inclusion, and respect (DEIR) within the scientific community.</p>`,
        slug: "tianruo-wins-rsc-excellent-student-award",
        images: [
            "images/news/2024-09-11-tianruo-wins-rsc-excellent-student-award-01.png"
        ]
    },
    {
        title: "FRG PhD Student, Shen Tianruo, obtained the Merit Award in the \\\"Visual Science\\\" Cover Contest organized by the Royal Society of Chemistry (RSC).",
        date: "Jul 03, 2024",
        excerpt: " Shen Tianruo received the award certificate from Prof. Gill Reid (President of RSC) during the RSC President\\'s Reception on June 16, 2024, in Guangzhou, China.\\r\\n\\r\\nThe relevant artwork correspond",
        content: ` Shen Tianruo received the award certificate from Prof. Gill Reid (President of RSC) during the RSC President\'s Reception on June 16, 2024, in Guangzhou, China.

The relevant artwork corresponds to a research article titled “Photoinduced electron transfer endows fluorogenicity in tetrazine-based near-infrared labels” on Materials Chemistry Frontiers (MCF). This article is collected in the “2024 Materials Chemistry Frontiers HOT articles” theme, recommended by reviewers as being of significant novelty and interest.`,
        slug: "frg-phd-student-shen-tianruo-obtained-the-merit-award-in-the-visual-science-cover-contest-organized-by-the-royal-society-of-chemistry-rsc",
        images: [
            "images/news/2024-07-03-frg-phd-student-shen-tianruo-obtained-the-merit-award-in-the-visual-scie-01.jpg"
        ]
    },
    {
        title: "Congratulations to Dr. Abedi on his graduation defense!",
        date: "Jun 04, 2024",
        excerpt: "🎓 Abedi, originally from Pakistan, has completed an exceptional journey in the world of scientific research.\\r\\nUnder the guidance of Prof. Liu Xiaogang, Abedi delved deep into the realm of molecular ",
        content: `<p style="padding-left: 40px;">🎓 Abedi, originally from Pakistan, has completed an exceptional journey in the world of scientific research.</p>
Under the guidance of Prof. Liu Xiaogang, Abedi delved deep into the realm of molecular luminescence during his PhD. His research focused on cutting-edge design and prediction of photophysical properties of organic fluorescent materials, leveraging the robustness of quantum chemical methods.

<strong>Key Highlights of Abedi\'s Research:</strong>
<ul>
 	<li><strong>Innovation in Solvatochromic Fluorescent Dyes</strong>: Developed ethynyl naphthalimide derivatives critical for detecting water in organic solvents, enhancing the sensitivity of moisture sensors in industrial applications (Dyes and Pigments, 2024).</li>
 	<li><strong>Advancing Photophysics</strong>: Explored "superimposed" spectral characteristics arising from cross-conjugation hybridization, pushing forward the design of more efficient optical materials (Chinese Chemical Letters, 2024).</li>
 	<li><strong>Photodynamic Therapy Tools</strong>: Created tunable platforms for activatable photosensitizers, pivotal in cancer treatment technologies (Advanced Science, 2023).</li>
 	<li><strong>Photoacoustic Imaging Agents</strong>: His work on blending low-frequency vibrations with push-pull effects has led to superior agents that could be used in medical imaging (Angewandte Chemie, 2023).</li>
</ul>
After a rigorous four years of research and innovation, Abedi has successfully defended his thesis and earned his PhD degree. 🎉 Congratulations, Dr. Abedi, on your well-deserved success and contributions to science!
<p style="padding-left: 40px;">Here\'s to future endeavors that continue to push the boundaries of knowledge and technology. Well done!</p>
#PhDGraduation #ScientificResearch #MolecularLuminescence #Innovation #AcademicExcellence`,
        slug: "congratulations-to-dr-abedi-on-his-graduation-defense",
        images: [
            "images/news/2024-06-04-congratulations-to-dr-abedi-on-his-graduation-defense-01.jpg",
            "images/news/2024-06-04-congratulations-to-dr-abedi-on-his-graduation-defense-02.jpg",
            "images/news/2024-06-04-congratulations-to-dr-abedi-on-his-graduation-defense-03.jpg"
        ]
    },
    {
        title: "Our research article is selected as the Hot article and featured on the front cover of Materials Chemistry Frontiers.",
        date: "Apr 30, 2024",
        excerpt: "In collaboration with Professor Xin Li\\'s group at Zhejiang University, we have published a research article titled \\\"Photoinduced electron transfer endows fluorogenicity in tetrazine-based near-infra",
        content: `<div>In collaboration with Professor Xin Li\'s group at Zhejiang University, we have published a research article titled "Photoinduced electron transfer endows fluorogenicity in tetrazine-based near-infrared labels" on Materials Chemistry Frontiers (MCF) of Royal Society of Chemistry (RSC). This article is collected in the "2024 Materials Chemistry Frontiers HOT articles" theme, recommended by reviewers as being of significant novelty and interest. Additionally, this work is also featured on the front cover of MCF.</div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div>For more information about this article, please check: <a id="LPlnkOWA62600e14-6471-9a9a-c785-5fb2a4148895" href="https://doi.org/10.1039/D3QM01217D" data-auth="NotApplicable" data-loopstyle="linkonly" data-linkindex="0">https://doi.org/10.1039/D3QM01217D</a></div>`,
        slug: "our-research-article-is-selected-as-the-hot-article-and-featured-on-the-front-cover-of-materials-chemistry-frontiers",
        images: [
            "images/news/2024-04-30-our-research-article-is-selected-as-the-hot-article-and-featured-on-the--01.jpg",
            "images/news/2024-04-30-our-research-article-is-selected-as-the-hot-article-and-featured-on-the--02.jpg",
            "images/news/2024-04-30-our-research-article-is-selected-as-the-hot-article-and-featured-on-the--03.jpg"
        ]
    },
    {
        title: "Tianruo recevied the \\\"CAS Registry<sup>® </sup>Innovator\\\" certificate from Chemical Abstract Service (CAS), a division of the American Chemical Society (ACS).",
        date: "Apr 17, 2024",
        excerpt: "The accolade was bestowed upon Tianruo on March 26, 2024, in recognition of his contributions to the realm of chemical molecules.  Nine compounds generated from his research article titled “Methine-Qu",
        content: `The accolade was bestowed upon Tianruo on March 26, 2024, in recognition of his contributions to the realm of chemical molecules.  Nine compounds generated from his research article titled “Methine-Quinoidal Fragment Induces Significant Bathochromic Shifts in Organic Dyes” have been identified as novel substances and assigned unique CAS Registry<sup>®</sup> Numbers. The associated work was published in <i>J. Phys. Chem. B</i> in 2021, when he was pursuing his Master’s program in Innovation by Design at the Singapore University of Technology and Design. This article introduces a generalizable design approach aimed at developing organic fluorophores with redshifted absorption wavelengths and enhanced molar extinction coefficient while maintaining small molecular sizes.For more information about this article, please check: <a id="LPlnk540655" href="https://doi.org/10.1021/acs.jpcb.0c10752" data-auth="NotApplicable" data-linkindex="0">https://doi.org/10.1021/acs.jpcb.0c10752</a>`,
        slug: "tianruo-recevied-the-cas-registry-innovator-certificate-from-chemical-abstract-service-cas-a-division-of-the-american-chemical-society-acs",
        images: [
            "images/news/2024-04-17-tianruo-recevied-the-cas-registry-innovator-certificate-from-chemical-ab-01.jpg"
        ]
    },
    {
        title: "Tianruo won the \\\"Best Oral Presentation\\\" award at the 7th Young Scholar Symposium on Fluorescent Probes and Imaging.",
        date: "Apr 17, 2024",
        excerpt: "\\r\\n \\r\\nThis conference is organized by Chinese Chemical Letters in collaboration with Hainan Medical University, which was held in Haikou from 4th to 7th April 2024. This event offers an invaluable ",
        content: `
 
<p style="text-align: left;">This conference is organized by Chinese Chemical Letters in collaboration with Hainan Medical University, which was held in Haikou from 4th to 7th April 2024. This event offers an invaluable platform for emerging scholars. It facilitates rich academic discussions and fosters collaborative ventures in the fields of fluorescence probes and imaging. Tianruo delivered an oral presentation to showcase his research exploration into photophysical mechanisms of tetrazine dyes and won the "Best Oral Presentation" award at this symposium.</p>
 `,
        slug: "tianruo-won-the-best-oral-presentation-award-at-the-7th-young-scholar-symposium-on-fluorescent-probes-and-imaging",
        images: [
            "images/news/2024-04-17-tianruo-won-the-best-oral-presentation-award-at-the-7th-young-scholar-sy-01.jpg",
            "images/news/2024-04-17-tianruo-won-the-best-oral-presentation-award-at-the-7th-young-scholar-sy-02.jpg"
        ]
    },
    {
        title: "Tianruo presented on \\\"Breaking the wall of tetrazine dyes\\\" at the Falling Walls Lab Singapore",
        date: "Aug 29, 2023",
        excerpt: "Tianruo presented a three-minute presentation entitled \\\"Breaking the wall of tetrazine dyes\\\" at the Falling Walls Lab Singapore on 23 August. In this talk, he introduced two main problems faced by t",
        content: `Tianruo presented a three-minute presentation entitled "Breaking the wall of tetrazine dyes" at the Falling Walls Lab Singapore on 23 August. In this talk, he introduced two main problems faced by tetrazine dyes in click reactions, <em>i.e.</em>, controversial fluorescence quenching mechanisms and difficulty in the development of near-infrared tetrazine dyes. He also showed how he used quantum chemical calculations to address these two questions.

   `,
        slug: "tianruo-presented-on-breaking-the-wall-of-tetrazine-dyes-at-the-falling-walls-lab-singapore"
    },
    {
        title: "Supphachok participated in the International Chemical Biology & Molecular Imaging Conference 2023",
        date: "Aug 29, 2023",
        excerpt: " Supphachok participated in the International Chemical Biology & Molecular Imaging Conference 2023 held at Yonsei University in South Korea. During the conference, he delivered a research presentation",
        content: `<p style="text-align: left;"> Supphachok participated in the International Chemical Biology & Molecular Imaging Conference 2023 held at Yonsei University in South Korea. During the conference, he delivered a research presentation titled "Molecular Origins of Cyclooctatetraene (COT) as a Photostabilizer". Dr. Liu Xiaogang virtually shared his expertise on the topic of "Computation-aided design of fluorophores".</p>
 `,
        slug: "supphachok-participated-in-the-international-chemical-biology-molecular-imaging-conference-2023",
        images: [
            "images/news/2023-08-29-supphachok-participated-in-the-international-chemical-biology-molecular--01.png"
        ]
    },
    {
        title: "Abedi participated in the 7th Green and Sustainable Chemistry Conference",
        date: "Jul 06, 2023",
        excerpt: "\\r\\n\\r\\nFrom the 22nd to the 24th of May, Abedi had the incredible opportunity to participate in the 7th Green and Sustainable Chemistry Conference held in the beautiful city of Dresden, Germany. Abed",
        content: `

From the 22nd to the 24th of May, Abedi had the incredible opportunity to participate in the 7th Green and Sustainable Chemistry Conference held in the beautiful city of Dresden, Germany. Abedi is a Doctoral Candidate, and he presented his research on "Restriction of Twisted Intramolecular Charge Transfer Enables the Aggregation-Induced Emission of 1-(N, N-Dialkylamino)-naphthalene Derivatives" to a distinguished audience of experts in the field. Abedi was awarded the prestigious Researcher Development and Travel Grant from the Royal Society of Chemistry, which made his attendance at the conference possible. The conference involved passionate researchers, industry professionals, and academicians dedicated to exploring and promoting green and sustainable chemistry solutions. It provided a unique platform to exchange knowledge, share experiences, and collaborate on tackling sustainability challenges in the chemical industry.`,
        slug: "abedi-participated-in-the-7th-green-and-sustainable-chemistry-conference"
    },
    {
        title: "Supphachok Chanmungkalakul presented a poster at the 23rd Tetrahedron Symposium conference",
        date: "Jul 04, 2023",
        excerpt: "\\r\\nSupphachok Chanmungkalakul attended the 23rd Tetrahedron Symposium conference at Göteborg, Sweden from 27th June to 30th June. This conference is for reporting and discussing the latest advances i",
        content: `<p style="background: white;"><span class="contentpasted0"><span style="font-size: 12.0pt; color: #201f1e; background: white;"></span></span></p>
<p style="background: white;"><span class="contentpasted0"><span style="font-size: 12.0pt; color: #201f1e; background: white;">Supphachok Chanmungkalakul attended the 23<sup>rd</sup> Tetrahedron Symposium conference at Göteborg, Sweden from 27<sup>th</sup> June to 30<sup>th</sup> June. This conference is for reporting and discussing the latest advances in organic chemistry, chemical biology, medicinal chemistry, and theoretical chemistry including computational chemistry. Supphachok had a poster presentation entitled "A Descriptor for Accurate Predictions of Host Molecules Enabling Ultralong Room-Temperature Phosphorescence in Guest Emitters".</span></span></p>`,
        slug: "supphachok-chanmungkalakul-presented-a-poster-at-the-23rd-tetrahedron-symposium-conference",
        images: [
            "images/news/2023-07-04-supphachok-chanmungkalakul-presented-a-poster-at-the-23rd-tetrahedron-sy-01.jpeg"
        ]
    },
    {
        title: "Tianruo won the Best Poster Award at the 6th Youth Scholar Forum on Fluorescent Probes and Bioimaging",
        date: "Jul 04, 2023",
        excerpt: "  \\r\\nTianruo obtained the Best Poster Award at the 6th Youth Scholar Forum on Fluorescent Probes and Bioimaging (26-28 May 2023, Shanghai, China). This conference is organized by the Editorial Board ",
        content: `  
<p style="text-align: left;">Tianruo obtained the Best Poster Award at the 6th Youth Scholar Forum on Fluorescent Probes and Bioimaging (26-28 May 2023, Shanghai, China). This conference is organized by the Editorial Board of Chinese Chemical Letters in collaboration with East China Normal University. This event is dedicated to promoting research in fluorescence and fostering collaboration among scientific researchers and industry professionals. Tianruo is a PhD student supervised by Dr. Xiaogang Liu in the Science, Mathematics and Technology cluster at the Singapore University of Technology and Design. Their poster is titled "Quantum chemical calculations in the mechanism investigation of tetrazine-integrated fluorogenic labels". This poster demonstrated the principles of "Top to Down" molecular screening and molecular design in quantum chemical calculations as well as their successful application in exploring the working mechanism of tetrazine-fused fluorogenic labels.</p>

 `,
        slug: "tianruo-won-the-best-poster-award-at-the-6th-youth-scholar-forum-on-fluorescent-probes-and-bioimaging"
    },
    {
        title: "Celebrating the Graduation of Dr. Wu Xia",
        date: "Jul 04, 2023",
        excerpt: "\\r\\n\\r\\nWe are thrilled to extend our heartfelt congratulations to Dr. Wu Xia for successfully completing her PhD studies at FRG in May 2023. As the first PhD student of our research group, Wu Xia has",
        content: `

We are thrilled to extend our heartfelt congratulations to Dr. Wu Xia for successfully completing her PhD studies at FRG in May 2023. As the first PhD student of our research group, Wu Xia has made an indelible mark during her four years of dedicated research. Her exceptional contributions, including the design of dual-emission rhodamine analogs, have significantly advanced our understanding in this field. Along the way, she has also been a supportive and valuable team member. Together, we have created countless cherished memories.

We are immensely proud to share that Wu Xia was awarded the Best Poster Award at the 12th Chinese National Conference on Chemical Biology, a testament to her outstanding research and presentation skills.

As Wu Xia embarks on the next chapter of her journey, we extend our warmest wishes for her future endeavours. May she continue to achieve greatness, inspire others, and make impactful contributions to the scientific community.`,
        slug: "celebrating-the-graduation-of-dr-wu-xia",
        images: [
            "images/news/2023-07-04-celebrating-the-graduation-of-dr-wu-xia-01.jpg"
        ]
    },
    {
        title: "Wu Xia from FRG won the Best Oral Presentation Award at the 4th Asian Conference on Chemosensors & Imaging Probes 2023",
        date: "Feb 09, 2023",
        excerpt: "\\r\\n\\r\\nMs. Wu Xia won “the Best Oral Presentation Award” at the 4th Asian Conference on Chemosensors & Imaging Probes held by Yonsei University in February 2023. This online conference covered all as",
        content: `

Ms. Wu Xia won “the Best Oral Presentation Award” at the 4<sup>th</sup> Asian Conference on Chemosensors & Imaging Probes held by Yonsei University in February 2023. This online conference covered all aspects of chemistry in chemosensors and bioimaging probes. Wu Xia is a Ph.D. candidate from SUTD supervised by Prof. Liu Xiaogang. In her presentation titled <strong>Molecular Design of Dual-Emission Rhodamine Analogs</strong>, she revealed the molecular origin of low quantum yields in the closed-form rhodamines and proposed a design method to enhance their emissions. Such dual-emission rhodamine analogs have potential applications in advanced bioimaging and biosensing.

 

 

 `,
        slug: "wu-xia-from-frg-won-the-best-oral-presentation-award-at-the-4th-asian-conference-on-chemosensors-imaging-probes-2023",
        images: [
            "images/news/2023-02-09-wu-xia-from-frg-won-the-best-oral-presentation-award-at-the-4th-asian-co-01.jpeg"
        ]
    },
    {
        title: "Mey from FRG won the Best Oral Presentation Award (the 3rd prize) in Monash Initiate 2022",
        date: "Oct 01, 2022",
        excerpt: "Ms. Meyammai Shanmugham from FRG Team (a.k.a Mey), won the third prize in the Best Oral Presentation Award in Monash Initiate 2022, Monash International Health Science and Technology Conference. This ",
        content: `Ms. Meyammai Shanmugham from FRG Team (a.k.a Mey), won the third prize in the Best Oral Presentation Award in Monash Initiate 2022, Monash International Health Science and Technology Conference. This conference was held virtually to provide a platform for researchers, academics, and students globally to communicate their research findings. Mey is a PhD student from SUTD, supervised by Dr. Leo Chen Huei and Dr. Liu Xiaogang. At this conference, she presented her paper titled, <strong>Time-dependent Activation of TMAO Induced Apoptosis and Inflammation on Human Microvascular Endothelial Cells (HMEC-1)</strong>. In this work, she analyzed the time-dependent molecular signatures of TMAO treatment on HMEC-1. The findings of her study indicate how TMAO induces endothelial dysfunction, and it provides potential therapeutics to directly target the damages induced by TMAO at the appropriate duration for treatment intervention.`,
        slug: "mey-from-frg-won-the-best-oral-presentation-award-the-3rd-prize-in-monash-initiate-2022",
        images: [
            "images/news/2022-10-01-mey-from-frg-won-the-best-oral-presentation-award-the-3rd-prize-in-monas-01.jpg"
        ]
    },
    {
        title: "FRG won Shimadzu-SNIC Industry Award in Applied and Translational Chemistry",
        date: "Sep 27, 2022",
        excerpt: " We are happy to share that Xiaogang received Shimadzu-SNIC Industry Award in Applied and Translational Chemistry in Jun 2022. The SNIC industry awards recognise and reward outstanding individuals, wh",
        content: `<p style="margin: 0cm;"><span style="color: #0e101a;"> We are happy to share that Xiaogang received Shimadzu-SNIC Industry Award in Applied and Translational Chemistry in Jun 2022. The SNIC industry awards recognise and reward outstanding individuals, who have achieved research excellence in selected areas of chemistry and chemical sciences.</span></p>
<p style="margin: 0cm;"><span style="color: #0e101a;"> </span></p>
<p style="margin: 0cm;"><span style="color: #0e101a;">Xiaogang received this award for his work in establishing the structure-property relationships of fluorescent dyes and probes and formulating efficient prediction methods for developing functional fluorophores. </span></p>
<p style="margin: 0cm;"><span style="color: #0e101a;"> </span></p>
<p style="margin: 0cm;"><span style="color: #0e101a;">This achievement is the results of the collective work of all FRG members! So of course, the entire team had a good lunch at Changi City Point to celebrate!</span></p>`,
        slug: "frg-won-shimadzu-snic-industry-award-in-applied-and-translational-chemistry",
        images: [
            "images/news/2022-09-27-frg-won-shimadzu-snic-industry-award-in-applied-and-translational-chemis-01.jpg"
        ]
    },
    {
        title: "FRG won the 2nd Runner-Up Prize in \\\"HPC Innovation Challenge\\",
        date: "Sep 27, 2022",
        excerpt: "FRG Team won the 2nd Runner-Up Prize in the HPC Innovation Challenge for the Environment competition in September 2022!\\r\\n\\r\\n\\r\\n\\r\\nThis competition intends to explore how we can tackle environment",
        content: `FRG Team won the 2nd Runner-Up Prize in the HPC Innovation Challenge for the Environment competition in September 2022!



<span style="background-color: #ffffff;">This competition intends to explore how we can tackle environmental challenges using High-Performance Computing (HPC). The FRG team, consisting of Miss </span><strong style="background-color: #ffffff;">Wu Xia</strong><span style="background-color: #ffffff;"> and Mr. </span><strong style="background-color: #ffffff;">Shen Tianruo</strong><span style="background-color: #ffffff;">, focused on the computation-aided design of "small“ and ”red“ fluorophores (namely ‘Singapore Red”) for bioimaging and biosensing applications. Their computational design minimizes \'trial-and-error\' in experimental synthesis and thereby reduces waste generation during the development of chemical products. This design-centric approach offers a new route to greening chemical synthesis and reducing carbon emissions and waste discharge to the environment.</span><!--more-->`,
        slug: "frg-won-the-2nd-runner-up-prize-in-hpc-innovation-challenge",
        images: [
            "images/news/2022-09-27-frg-won-the-2nd-runner-up-prize-in-hpc-innovation-challenge-01.jpg"
        ]
    },
    {
        title: "Twists in the News!",
        date: "Dec 08, 2021",
        excerpt: "Our review article, Twisted intramolecular charge transfer (TICT) and twists beyond TICT: from mechanisms to rational designs of bright and sensitive fluorophores, was published in the journal of Chem",
        content: `Our review article, <a href="https://apc01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fpubs.rsc.org%2Fen%2Fcontent%2Farticlelanding%2F2021%2Fcs%2Fd1cs00239b&data=04%7C01%7Csyedaliabbas_abedi%40mymail.sutd.edu.sg%7Cb432518dd6f3485ff9eb08d9b9e28963%7C3476b776e9904f72b95062489831623d%7C0%7C0%7C637745204907592553%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000&sdata=Q6tcQ4LFXCEl2QUm%2Bu2WYP8%2BFfvWyMWugkxt1DFY1iE%3D&reserved=0">Twisted intramolecular charge transfer (TICT) and twists beyond TICT: from mechanisms to rational designs of bright and sensitive fluorophores</a>, was published in the journal of Chemical Society Reviews! This work was completed in collaboration with Zhaochao Xu group from the Dalian Institute Chemical Physics. It focused on the structure-property relationships of TICT fluorophores, and summarised design guidelines for tuning the tendency of TICT and modulating the fluorescence of these molecules.

We are glad to share that this review was featured in <a href="https://apc01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.eurekalert.org%2Fnews-releases%2F936252&data=04%7C01%7Csyedaliabbas_abedi%40mymail.sutd.edu.sg%7Cb432518dd6f3485ff9eb08d9b9e28963%7C3476b776e9904f72b95062489831623d%7C0%7C0%7C637745204907592553%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000&sdata=Hakn4%2Fnp3ljjYr%2BOepVYf5S%2BDYncNJ%2BzPXGVjiuCv0Q%3D&reserved=0">EurekaAlert!</a> And <a href="https://apc01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fscienmag.com%2Fsparking-new-insights-into-dye-chemistry%2F&data=04%7C01%7Csyedaliabbas_abedi%40mymail.sutd.edu.sg%7Cb432518dd6f3485ff9eb08d9b9e28963%7C3476b776e9904f72b95062489831623d%7C0%7C0%7C637745204907592553%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000&sdata=An5bV%2BYLIs46PCFVXJLxx6f26%2BBWXchSM7BBbZnl%2BsI%3D&reserved=0">ScienMag</a>. FRG congratulates Dr. Wang Chao and team for this news!

`,
        slug: "twists-in-the-news",
        images: [
            "images/news/2021-12-08-twists-in-the-news-01.png"
        ]
    },
    {
        title: "ACS on Campus@SUTD",
        date: "Nov 26, 2021",
        excerpt: "American Chemical Society (ACS) on Campus hosted their first-ever digital event at Singapore University of Technology and Design (SUTD). Prof. Xiaogang Liu delivered an interesting speech on Effective",
        content: `American Chemical Society (ACS) on Campus hosted their first-ever digital event at Singapore University of Technology and Design (SUTD). Prof. Xiaogang Liu delivered an interesting speech on Effective Writing Skills. The feedback was very positive and the audience learned the basic skills to write a technical article in the correct manner. Find out more at: <a href="https://apc01.safelinks.protection.outlook.com/?url=https%3A%2F%2Faxial.acs.org%2F2021%2F11%2F24%2Facs-on-campus-sutd%2F&data=04%7C01%7Csyedaliabbas_abedi%40mymail.sutd.edu.sg%7Cc6f9f6f89d7847afaa9308d9b091aea4%7C3476b776e9904f72b95062489831623d%7C0%7C0%7C637734962019613099%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000&sdata=31uqbTCk2OZoQ9rDHy%2BSrqbdrb91sA5rHrfIxWN2sag%3D&reserved=0">https://axial.acs.org/2021/11/24/acs-on-campus-sutd/</a>.`,
        slug: "acs-on-campussutd",
        images: [
            "images/news/2021-11-26-acs-on-campussutd-01.png"
        ]
    },
    {
        title: "Congratulations Tianruo!",
        date: "Sep 16, 2021",
        excerpt: "FRG congratulates Tianruo for the completion of his master\\'s degree. He did an excellent work over his master studies. We now welcome him to join our group as a PhD student.",
        content: `FRG congratulates Tianruo for the completion of his master\'s degree. He did an excellent work over his master studies. We now welcome him to join our group as a PhD student.`,
        slug: "congratulations-tianruo",
        images: [
            "images/news/2021-09-16-congratulations-tianruo-01.jpg"
        ]
    },
    {
        title: "\\'SLEET\\' model featured in the journal of \\'Chemical Research in Chinese Universities\\",
        date: "Feb 22, 2021",
        excerpt: "The State-crossing from a Locally Excited to an Electron Transfer State(SLEET) model has been applied to rationalize the mechanism of Aggregation-Induced Emission(AIE). CRCU Journal highlighted it on ",
        content: `<p style="text-align: left;">The State-crossing from a Locally Excited to an Electron Transfer State(SLEET) model has been applied to rationalize the mechanism of Aggregation-Induced Emission(AIE). CRCU Journal highlighted it on their cover page of the journal. Congratulations to Weijei and Chao for this tremendously rewarding accomplishment!</p>`,
        slug: "sleet-model-featured-in-the-journal-of-chemical-research-in-chinese-universities",
        images: [
            "images/news/2021-02-22-sleet-model-featured-in-the-journal-of-chemical-research-in-chinese-univ-01.png"
        ]
    },
    {
        title: "Using fluorescence to tackle the problem of illicit cooking oil",
        date: "Jun 12, 2020",
        excerpt: "Our UROP Project work was featured by C&EN and ACS Central Science!\\n\\\"Xiaogang Liu is using fluorescence to tackle the problem of illicit cooking oil. The Singapore-based physical chemist is building",
        content: `Our UROP Project work was featured by <a href="https://cen.acs.org/food/food-science/Xiaogang-Liu-using-fluorescence-tackle/98/i17?utm_source=InsightsNewsletter&utm_medium=Pubs&utm_campaign=CEN">C&EN</a> and <a href="https://pubs.acs.org/doi/10.1021/acscentsci.0c00258">ACS Central Science</a>!\n<p class="article-intro-title">"Xiaogang Liu is using fluorescence to tackle the problem of illicit cooking oil. The Singapore-based physical chemist is building a database of fluorescence fingerprints to help nab adulterated food products".</p>\n\n\nThe fluorescence fingerprint of extra virgin olive oil (left) changes after heating for 1 h at 200 °C (right). Credit: Courtesy of Xiaogang Liu\n\n \n\n `,
        slug: "using-fluorescence-to-tackle-the-problem-of-illicit-cooking-oil",
        images: [
            "images/news/2020-06-12-using-fluorescence-to-tackle-the-problem-of-illicit-cooking-oil-01.gif"
        ]
    },
    {
        title: "General descriptor sparks advancements in dye chemistry",
        date: "Jun 12, 2020",
        excerpt: "\\r\\nWe have developed a theoretical descriptor ΔE for predicting PET-based fluorescence probes; utilizing this descriptor, we quantitatively designed fluorescent stains of lipid droplets and mitochond",
        content: `<div class="lg-toolbar lg-group"></div>
<p class="lg-sub-html">We have developed a theoretical descriptor ΔE for predicting PET-based fluorescence probes; utilizing this descriptor, we quantitatively designed fluorescent stains of lipid droplets and mitochondria for live-cell bioimaging.</p>
This work was published in <em><strong>JACS</strong></em>, and reported by various mediums, such as:
<ul>
 	<li><a href="https://phys.org/news/2020-05-descriptor-advancements-dye-chemistry.html">Phys.org</a></li>
 	<li><a href="https://www.eurekalert.org/pub_releases/2020-05/suot-gds051420.php">Eurekalert.org</a></li>
 	<li><a href="https://www.chemeurope.com/en/news/1166358/general-descriptor-sparks-advancements-in-dye-chemistry.html">Chemeurope.com</a></li>
 	<li><a href="https://www.x-mol.com/news/449979">X-Mol</a></li>
</ul>


 

 `,
        slug: "general-descriptor-sparks-advancements-in-dye-chemistry",
        images: [
            "images/news/2020-06-12-general-descriptor-sparks-advancements-in-dye-chemistry-01.png"
        ]
    },
    {
        title: "\\\"Earth\\\" Won a Research Award!",
        date: "Feb 10, 2020",
        excerpt: "Supphachok Chanmungkalakul (aka “Earth”) won a prestigious research award from the National Research Council of Thailand in Feb 2020, for the work done during his Master studies.\\r\\n\\r\\nCongratulation",
        content: `Supphachok Chanmungkalakul (aka “Earth”) won a prestigious research award from the National Research Council of Thailand in Feb 2020, for the work done during his Master studies.

Congratulations!

Earth joined the Fluorescence Research group in Jan 2020. He will work on research under the theme of luminescence in organic compounds. Welcome, Earth!



 `,
        slug: "earth-won-a-research-award",
        images: [
            "images/news/2020-02-10-earth-won-a-research-award-01.jpg"
        ]
    },
    {
        title: "Illuminating the Path for Super-Resolution Imaging with Improved Rhodamine Dyes",
        date: "Dec 06, 2019",
        excerpt: "By collaborating with Professor Xiao Yi\\'s group from the Dalian University of Technology, we have developed a new strategy that enhances the brightness and clarity of sub-cellular structures when dye",
        content: `By collaborating with Professor Xiao Yi\'s group from the Dalian University of Technology, we have developed a new strategy that enhances the brightness and clarity of sub-cellular structures when dyed with novel rhodamine fluorophores, laying the ground for the advancement of super-resolution microscopes.

This work was published in <a href="https://pubs.acs.org/doi/10.1021/jacs.9b04893"><em>JACS</em></a>, and covered by various medium, such as:
<ul>
 	<li><a href="https://www.x-mol.com/news/20947">X-Mol</a></li>
 	<li><a href="https://www.eurekalert.org/pub_releases/2019-12/suot-itp120219.php">Eurekalert</a></li>
 	<li><a href="https://scienmag.com/illuminating-the-path-for-super-resolution-imaging-with-improved-rhodamine-dyes/">ScienMag</a></li>
 	<li><a href="https://www.sciencecodex.com/illuminating-path-super-resolution-imaging-improved-rhodamine-dyes-636001">ScienceCodex</a></li>
 	<li><a href="https://phys.org/news/2019-12-illuminating-path-super-resolution-imaging-rhodamine.html">PhysOrg</a></li>
 	<li><a href="http://healthmedicinet.com/i/illuminating-the-path-for-super-resolution-imaging-with-improved-rhodamine-dyes/">Health Medicine Network</a></li>
 	<li><a href="https://www.innovations-report.com/html/reports/physics-astronomy/illuminating-the-path-for-super-resolution-imaging-with-improved-rhodamine-dyes.html">Innovations Report</a></li>
 	<li><a href="https://www.satoshinakamotoblog.com/illuminating-the-path-for-super-resolution-imaging-with-improved-rhodamine-dyes">Satoshina Blog</a></li>
 	<li><a href="https://www.brightsurf.com/news/article/120319498246/illuminating-the-path-for-super-resolution-imaging-with-improved-rhodamine-dyes.html">BrightSurf</a></li>
 	<li><a href="https://bioengineer.org/illuminating-the-path-for-super-resolution-imaging-with-improved-rhodamine-dyes/">Bioengineer</a></li>
</ul>
Congratulations to Chao and Weijie!



 `,
        slug: "illuminating-the-path-for-super-resolution-imaging-with-improved-rhodamine-dyes"
    },
    {
        title: "Hiking at the Southern Ridges",
        date: "Nov 18, 2019",
        excerpt: "On 17 November 2019, we hiked along the Southern Ridges from Harborfront through Henderson Waves and enjoyed Singapore's tropical nature, city views, and local cuisine. ",
        content: `<p>On 17 November 2019, we hiked along the Southern Ridges. Starting from Harborfront, we went through Henderson Waves (the highest pedestrian bridge in Singapore) and enjoyed the tropical nature and city view along the way. We ended the trip with chili crabs and other local cuisines.</p>`,
        slug: "341",
        images: [
            "images/news/2019-11-18-341-01.jpg"
        ]
    },
    {
        title: "SUTD co-hosted Singapore Junior Chemistry Olympiad 2019",
        date: "May 23, 2019",
        excerpt: "SUTD hosted >400 students from secondary schools in Singapore, during the Singapore Junior Chemistry Olympiad on 18 May 2019.\\r\\n\\r\\nIt is for the first time that Chemistry Olympiad came to SUTD.\\r\\n\\",
        content: `SUTD hosted >400 students from secondary schools in Singapore, during the Singapore Junior Chemistry Olympiad on 18 May 2019.

It is for the first time that Chemistry Olympiad came to SUTD.

During this event,  members of the Fluorescence Research Group played an instrumental role in setting up the venues and helping with the logistics. Thank you, guys!

We also appreciate all the great support provided by various departments of SUTD.

`,
        slug: "sutd-co-hosted-singapore-junior-chemistry-olympiad-2019",
        images: [
            "images/news/2019-05-23-sutd-co-hosted-singapore-junior-chemistry-olympiad-2019-01.jpg",
            "images/news/2019-05-23-sutd-co-hosted-singapore-junior-chemistry-olympiad-2019-02.jpg"
        ]
    },
    {
        title: "Twisted Intramolecular Charge Shuttle (TICS) in the News",
        date: "May 02, 2019",
        excerpt: "Our work on Twisted Intramolecular Charge Shuttle (TICS) has been featured in SUTD Research News and reported in various media, such as:\\r\\n\\r\\n 	Eurekalert\\r\\n 	Science Daily\\r\\n 	Phys.org\\r\\n 	中国科学报",
        content: `Our work on Twisted Intramolecular Charge Shuttle (TICS) has been featured in <a href="https://sutd.edu.sg/Research/Research-News/2019/4/Researchers-discover-new-charge-transfer">SUTD Research News</a> and reported in various media, such as:
<ul>
 	<li><a href="https://www.eurekalert.org/pub_releases/2019-04/suot-rdn042819.php">Eurekalert</a></li>
 	<li><a href="https://www.sciencedaily.com/releases/2019/04/190429125452.htm">Science Daily</a></li>
 	<li><a href="https://phys.org/news/2019-04-researchers-discover-new-charge-transfer.html">Phys.org</a></li>
 	<li><a href="http://news.sciencenet.cn/sbhtmlnews/2019/4/345207.shtm?bsh_bid=4321971863">中国科学报/科学网</a></li>
</ul>


Figure 1. (a) Schematic illustration of the twisted intramolecular charge shuttle (TICS) mechanisms; “D” and “A” denote electron-donating and electron-accepting fragments, respectively. (b) Reaction mechanism of a TICS based GSH fluorescent probe, and confocal microscope images of HeLa cells stained with the probe and Hoechst 33342 (a nucleus stain with blue emissions). No red emissions were observed in cells that were pre-treated with 1 mM NMM to remove GSH, while intense red fluorescence was present in cells with GSH. Scale bar = 20 μm.

 `,
        slug: "twisted-intramolecular-charge-transfer-tics-in-the-news",
        images: [
            "images/news/2019-05-02-twisted-intramolecular-charge-transfer-tics-in-the-news-01.jpg"
        ]
    },
    {
        title: "Congratulations for the acceptance of Weijie\\'s paper by Angew. Chemie.",
        date: "Apr 02, 2019",
        excerpt: "Families of the Fluorescence Research Group gathered at Chinatown for a sumptuous dinner in Mar 2019, to celebrate the acceptance of Weijie\\'s paper \\\"Photoexcitation Induced Twisted Intramolecular Ch",
        content: `Families of the Fluorescence Research Group gathered at Chinatown for a sumptuous dinner in Mar 2019, to celebrate the acceptance of Weijie\'s paper "<a href="https://onlinelibrary.wiley.com/doi/abs/10.1002/anie.201902766?af=R">Photoexcitation Induced Twisted Intramolecular Charge Shuttle (TICS)</a>" by Angew. Chemie.

Congratulations, Weijie! And thank you, our collaborators from Professor Zhaochao Xu\'s, Professor Young-Tae Chang\'s, and Professor Matthew J. Lang\'s groups.

`,
        slug: "congratulations-for-the-acceptance-of-weijies-paper-by-angew-chemie",
        images: [
            "images/news/2019-04-02-congratulations-for-the-acceptance-of-weijies-paper-by-angew-chemie-01.jpg"
        ]
    },
    {
        title: "Dr. Liu was elected as the Council Member of Singapore National Institute of Chemistry",
        date: "Apr 02, 2019",
        excerpt: "Members of the Fluorescence Research Group attended the 50th Annual General Meeting (AGM) and Golden Jubilee Celebration Dinner of the Singapore National Institute of Chemistry (SNIC) on 29 Mar 2019. ",
        content: `Members of the Fluorescence Research Group attended the 50<sup>th</sup> Annual General Meeting (AGM) and Golden Jubilee Celebration Dinner of the Singapore National Institute of Chemistry (SNIC) on 29 Mar 2019.  "SNIC was established in March 1970 as a national body for the chemical profession in Singapore."

During this AGM, Dr. Xiaogang Liu was elected as a Council Member of SNIC. We are excited to bring SUTD into the chemistry community in Singapore and look forward to learning from and working with our peers.



Photo (from left to right): Ying, Chao, Xiaogang, and Weijie

 `,
        slug: "dr-liu-was-elected-as-the-council-member-of-singapore-national-institute-of-chemistry",
        images: [
            "images/news/2019-04-02-dr-liu-was-elected-as-the-council-member-of-singapore-national-institute-01.jpg"
        ]
    },
    {
        title: "Dr. Dai Liang visited the Fluorescence Research Group.",
        date: "Jan 25, 2019",
        excerpt: "Dr. Dai Liang from the Department of Physics at the City University of Hong Kong visited us in Jan 2019. Dr. Dai was an expert in multi-scale modeling, and we had a fruitful discussion on combining qu",
        content: `Dr. Dai Liang from the Department of Physics at the City University of Hong Kong visited us in Jan 2019. Dr. Dai was an expert in multi-scale modeling, and we had a fruitful discussion on combining quantum chemical calculations and molecular dynamics to understand the photophysics and photochemistry of small molecule fluorescent dyes.



 

 `,
        slug: "dr-dai-liang-visited-sutd-and-our-group",
        images: [
            "images/news/2019-01-25-dr-dai-liang-visited-sutd-and-our-group-01.jpg"
        ]
    },
    {
        title: "Welcome New Group Members",
        date: "Dec 31, 2018",
        excerpt: "The Fluorescence Research Group welcomes its new members: Dr. Ying GAO (Visiting Researcher) and Dr. Chao WANG (Research Fellow).\\r\\n\\r\\nWe welcomed our members with a hot-pot lunch in a hot country. ",
        content: `The Fluorescence Research Group welcomes its new members: Dr. Ying GAO (Visiting Researcher) and Dr. Chao WANG (Research Fellow).

We welcomed our members with a hot-pot lunch in a hot country. We also look forward to delivering good research results with teamwork and having lots of fun in 2019.



Photo (from left to right): Ying, Chao, Xiaogang, Liang, and Weijie`,
        slug: "welcome-new-group-members",
        images: [
            "images/news/2018-12-31-welcome-new-group-members-01.jpg"
        ]
    },
    {
        title: "FB3 conference in Glasgow, UK",
        date: "Jul 11, 2018",
        excerpt: "Dr. Liu attended the conference of Fluorescent Biomolecules and their Building Blocks (FB3), held in Glasgow, UK from Sat 30th June to Tue 3rd July, 2018.\\r\\n\\r\\nHe gave a talk on combining chemical “",
        content: `Dr. Liu attended the conference of Fluorescent Biomolecules and their Building Blocks (FB3), held in Glasgow, UK from Sat 30th June to Tue 3rd July, 2018.

He gave a talk on combining chemical “big data” and quantum chemical calculations to understand the structure-property relationships of fluorescent dyes.

He was very impressed by friendly Scottish people and the historical architectures in Glasgow.

He also visited the University of Glasgow, looking for student exchange opportunities for the undergraduate students at SUTD.`,
        slug: "fb3-conference-in-glasgow-uk"
    },
    {
        title: "A Pleasant Dinner for the Extended Fluorescence Research Group",
        date: "May 07, 2018",
        excerpt: "The Fluorescence Research Group of SUTD and its families and friends had a wonderful dinner in May 2018. We enjoyed our night but regretted the buffet dinner was not good for losing weight.\\r\\n\\r\\n\\r\\",
        content: `The Fluorescence Research Group of SUTD and its families and friends had a wonderful dinner in May 2018. We enjoyed our night but regretted the buffet dinner was not good for losing weight.



 `,
        slug: "a-pleasant-dinner-for-the-extended-fluorescence-research-group",
        images: [
            "images/news/2018-05-07-a-pleasant-dinner-for-the-extended-fluorescence-research-group-01.jpg"
        ]
    },
    {
        title: "Invited Talk at the 2nd Youth Scholar Forum on Fluorescent Probes and Bioimaging",
        date: "May 07, 2018",
        excerpt: "Xiaogang and Weijie attended the \\\"the 2nd Youth Scholar Forum on Fluorescent Probes and Bioimaging\\\" (第二届荧光探针与成像青年学者研讨会) in Shanghai from 6 Apr to 8 Apr 2018.\\r\\n\\r\\nDr. Liu delivered one invited tal",
        content: `Xiaogang and Weijie attended the "the 2nd Youth Scholar Forum on Fluorescent Probes and Bioimaging" (第二届荧光探针与成像青年学者研讨会) in Shanghai from 6 Apr to 8 Apr 2018.

Dr. Liu delivered one invited talk on the molecular origins of ring-opening mechanisms in rhodamines dyes. We proposed one unified push-pull model to explain many parameters that affect the ring-opening process.

We also met many friends in Shanghai and enjoyed the discussions on fluorescent dyes and probes. We thanked Professors Yang Youjun, Guo Zhiqian, and Ma Xiang for organizing this conference.



Photo: (from left to right) Weijie, Xiaogang, Professor Xu Zhaochao, Professor Xu Lin, Dr. Qi Qingkai, and Dr. Qiao Qinglong`,
        slug: "invited-talk-at-the-2nd-young-scholar-forum-on-fluorescent-probes-and-bioimaging",
        images: [
            "images/news/2018-05-07-invited-talk-at-the-2nd-young-scholar-forum-on-fluorescent-probes-and-bi-01.jpg"
        ]
    },
    {
        title: "Welcome visits of Dr. Liu Zhe and Mr. Nguyễn Văn Ất",
        date: "Feb 06, 2018",
        excerpt: "Fluorescent Research Group warmly welcomed Dr. Liu Zhe from MIT (USA) and Mr. Nguyễn Văn Ất from Ho Chi Minh City University of Technology (Vietnam) for visiting our group.\\r\\n\\r\\nWe enjoyed conversat",
        content: `Fluorescent Research Group warmly welcomed Dr. Liu Zhe from MIT (USA) and Mr. Nguyễn Văn Ất from Ho Chi Minh City University of Technology (Vietnam) for visiting our group.

We enjoyed conversations with our guests and look forward to seeing them again.





 `,
        slug: "welcome-visits-of-dr-liu-zhe-and-mr-nguyen-van-at"
    },
    {
        title: "Dr. Liu Gave an Invited Talk at GWFMD",
        date: "Jan 25, 2018",
        excerpt: "Xiaogang gave an invited talk at the Global Workshop on Functional Materials and Devices in Jan 2018. This workshop was organized by Society of Interdisciplinary Research and Institute of Advanced Stu",
        content: `Xiaogang gave an invited talk at <a href="http://soiree-forum.org/gwfmd2018">the Global Workshop on Functional Materials and Devices</a> in Jan 2018. This workshop was organized by Society of Interdisciplinary Research and Institute of Advanced Studies and held at Nanyang Technological University, in Singapore.

Xiaogang presented our research work on designing fluorescent dyes. We also enjoyed  interactions with researchers from different fields.



 `,
        slug: "dr-liu-gave-an-invited-talk-at-gwfmd",
        images: [
            "images/news/2018-01-25-dr-liu-gave-an-invited-talk-at-gwfmd-01.jpg"
        ]
    },
    {
        title: "Welcome Visiting Professor Huang Lu to Join Us",
        date: "Jan 25, 2018",
        excerpt: "We welcome Dr. Huang Lu from Minjiang University (China) to join our group as a Visiting Scholar in Jan 2018.\\r\\n\\r\\nDr. Huang is an expert on modern separation and analysis techniques. She has done e",
        content: `We welcome Dr. Huang Lu from Minjiang University (China) to join our group as a Visiting Scholar in Jan 2018.

Dr. Huang is an expert on modern separation and analysis techniques. She has done extensive research work on chiral molecules and will work on fluorescence related research at SUTD. We look forward to exchanging knowledge and sharing research ideas with her.



Photo: Dr. HUANG Lu (Left), Dr. LIU Xiaogang (Middle) and Dr. CHI Weijie (Right)

 `,
        slug: "welcome-visiting-professor-huang-lu-to-join-us",
        images: [
            "images/news/2018-01-25-welcome-visiting-professor-huang-lu-to-join-us-01.jpg"
        ]
    },
    {
        title: "Dr. Chi Weijie joined our group",
        date: "Aug 17, 2017",
        excerpt: "\\r\\n\\r\\nWe warmly welcome Dr. Chi Weijie to join the Fluorescence Research Group as a Postdoctoral Research Fellow in Aug 2017.\\r\\n\\r\\nDr. Chi obtained his PhD. degree from Beijing Institute of Techno",
        content: `<div id="pl-171" class="panel-layout">

We warmly welcome <strong>Dr. Chi Weijie</strong> to join the Fluorescence Research Group as a Postdoctoral Research Fellow in Aug 2017.

Dr. Chi obtained his PhD. degree from Beijing Institute of Technology (China) in 2017. His previous research focuses on computational studies of photoelectric properties of organic solar cells and hole transport materials, as well as designing high energy-density compounds. He played an instrumental role in his research group at BIT in both conducting research and guiding junior students. At SUTD, he will perform both computational and experimental studies on fluorescent dyes and sensors.
<p style="text-align: center;">Photo: Weijie (left) and Xiaogang (right) met in Singapore in Aug 2017</p>
 

</div>`,
        slug: "dr-chi-weijie-joined-our-group-as-a-postdoctoral-research-fellow",
        images: [
            "images/news/2017-08-17-dr-chi-weijie-joined-our-group-as-a-postdoctoral-research-fellow-01.jpg"
        ]
    },
    {
        title: "Cambridge Crystallographic Data Center Software for SUTD",
        date: "Jun 28, 2017",
        excerpt: "SUTD has obtained the site license of CSD-System Software and Suites, provided by Cambridge Crystallographic Data Center.\\r\\n\\r\\nThis software is useful for chemistry, materials science, and biology r",
        content: `SUTD has obtained the site license of <a href="https://www.ccdc.cam.ac.uk/solutions/csd-system/">CSD-System Software</a> and Suites, provided by <strong>Cambridge Crystallographic Data Center</strong>.

This software is useful for chemistry, materials science, and biology related research. It remains free for all SUTD members till 31 Dec 2017.

If your research or study requires the use of this software, please email Dr. Xiaogang Liu for the license agreement and download link.`,
        slug: "cambridge-crystallographic-data-center-software-for-sutd"
    },
    {
        title: "\\\"Hot Paper\\\" on Designing Bright Near-Infrared Fluorophores",
        date: "Jun 11, 2017",
        excerpt: "Fluorophores with near-infrared (NIR) emissions play a crucial role in numerous bioimaging and biosensing applications. These NIR fluorophores afford highly attractive optical properties, such as deep",
        content: `<span lang="EN-SG" xml:lang="EN-SG">Fluorophores with near-infrared (NIR) emissions play a crucial role in numerous bioimaging and biosensing applications. These NIR fluorophores afford highly attractive optical properties, such as deep penetration depths, good signal-to-noise ratios, and minimal tissue damages. </span><span lang="EN-SG" xml:lang="EN-SG">Dr. Liu Xiaogang and their collaborators (Prof. Liyi Zhou, Prof. Hongyan Sun, Prof Matthew Lang et al.) have rationally developed a new class of near-infrared fluorophores with bright one-photon and two-photon emissions at ~740 nm, large Stokes shifts (~80 nm), significant two-photon action absorption cross-section (~185 GM at 820 nm), excellent water solubility, outstanding photostability and low toxicity. They also demonstrated their biological applications in mitochondrial labelling, deep tissue imaging and H2S detection in live cells and mice.</span>

<span lang="EN-SG" xml:lang="EN-SG"><a href="http://onlinelibrary.wiley.com/doi/10.1002/chem.201701365/full">Their paper</a> is now published online in “Chemistry – a European Journal”</span> and has been selected as a “Hot Paper” by the Editor. "Hot Papers are chosen by the Editors for their importance in a rapidly evolving field of high current interest<span lang="EN-US" xml:lang="EN-US">”.</span>

 `,
        slug: "hot-paper-on-designing-bright-near-infrared-fluorophores"
    },
    {
        title: "We are hiring!",
        date: "May 19, 2017",
        excerpt: "Assistant Professor Liu Xiaogang’s group is looking for Ph.D. students and postdoctoral associates to computationally model fluorescent organic molecules, to reveal their detailed working mechanism an",
        content: `Assistant Professor Liu Xiaogang’s group is looking for <strong>Ph.D. students</strong> <del>and <strong>postdoctoral associates</strong></del> to computationally model fluorescent organic molecules, to reveal their detailed working mechanism and systematically summarize molecular design rules for developing novel dyes with tailored properties.

Check out the <strong>scholarship information</strong> <a href="https://sutd.edu.sg/Admissions/Undergraduate/Scholarship/Application-for-scholarships">here</a>!

Interested applicants should submit their full CV/resume, cover letter, the list of two references (to include reference names and contact information) and three recent papers that highlight your best-related research contributions (for postdoc only).

We regret that only shortlisted candidates will be notified.

<span style="color: #0000ff;">(As of 5 July 2017, the postdoc vacancy has been filled. We only accept Ph.D. student applications.)</span>`,
        slug: "we-are-hiring"
    },
    {
        title: "Dr. Liu joined SUTD in Apr 2017",
        date: "May 19, 2017",
        excerpt: "Dr. Xiaogang Liu moved from Singapore-MIT Alliance for Research and Technology (SMART) to Singapore University of Technology and Design (SUTD) in Apr 2017.\\r\\n\\r\\nHe was awarded a Startup Research Gra",
        content: `Dr. Xiaogang Liu moved from Singapore-MIT Alliance for Research and Technology (SMART) to Singapore University of Technology and Design (SUTD) in Apr 2017.

He was awarded a Startup Research Grant to set up the Fluorescence Research Lab at SUTD.`,
        slug: "dr-liu-joined-sutd-in-apr-2017"
    }
];
