/**
 * Seed do banco SitePsicologia
 * Dados baseados no Site-Psi-Firebase
 */
const psychologistService = require('../models/psychologist');

const seedData = [
  {
    name: 'Dra. Ana Silva',
    crp: '06/12345',
    specialty: 'Terapia Cognitivo-Comportamental',
    description:
      'Especialista em TCC, com foco em transtornos de ansiedade e depressão.',
    full_bio:
      'Dra. Ana é especialista em TCC, com foco em transtornos de ansiedade e depressão. Com 10 anos de experiência, ela ajuda seus pacientes a desenvolverem estratégias para uma vida mais saudável.',
    education: 'Psicologia - USP; Especialização em TCC - Instituto Paulista',
    photo_url: 'https://picsum.photos/seed/2/400/400',
  },
  {
    name: 'Dr. Carlos Oliveira',
    crp: '06/23456',
    specialty: 'Psicanálise',
    description:
      'Abordagem psicanalítica para explorar questões profundas e padrões de comportamento.',
    full_bio:
      'Dr. Carlos oferece uma abordagem psicanalítica para explorar questões profundas e padrões de comportamento. Ele é apaixonado por ajudar as pessoas a se conhecerem melhor.',
    education: 'Psicologia - UFRJ; Formação em Psicanálise',
    photo_url: 'https://picsum.photos/seed/3/400/400',
  },
  {
    name: 'Dra. Sofia Lima',
    crp: '06/34567',
    specialty: 'Terapia de Casal',
    description: 'Especializada em dinâmica de relacionamentos.',
    full_bio:
      'Especializada em dinâmica de relacionamentos, Dra. Sofia auxilia casais a melhorar a comunicação e resolver conflitos, fortalecendo a conexão e o bem-estar mútuo.',
    education: 'Psicologia - UERJ; Especialização em Terapia de Casal',
    photo_url: 'https://picsum.photos/seed/4/400/400',
  },
  {
    name: 'Dr. João Silva',
    crp: '06/45678',
    specialty: 'Depressão e Ansiedade',
    description: 'Especialista em transtornos do humor com 10 anos de experiência.',
    full_bio:
      'Dr. João Silva é psicólogo clínico especializado em depressão, ansiedade e transtornos do humor. Com mais de 10 anos de experiência, oferece abordagem humanizada e eficaz.',
    education: 'Psicologia - USP; Especialização em TCC - Instituto Paulista',
    photo_url: 'https://picsum.photos/seed/10/400/400',
  },
  {
    name: 'Dra. Maria Santos',
    crp: '06/56789',
    specialty: 'Terapia Familiar',
    description: 'Especialista em dinâmica familiar e relacionamentos.',
    full_bio:
      'Dra. Maria Santos trabalha com terapia familiar sistêmica, ajudando famílias a resolverem conflitos e melhorarem a comunicação.',
    education: 'Psicologia - UFRJ; Mestrado em Terapia Familiar',
    photo_url: 'https://picsum.photos/seed/11/400/400',
  },
];

const seed = () => {
  console.log('🌱 Iniciando seed do banco SitePsicologia...');

  seedData.forEach((psychologist) => {
    psychologistService.create(psychologist, (err) => {
      if (err) {
        if (err.message && err.message.includes('UNIQUE constraint failed')) {
          console.log(`  ⏭ ${psychologist.name} já existe, pulando...`);
        } else {
          console.error(`  ✗ Erro ao inserir ${psychologist.name}:`, err.message);
        }
      } else {
        console.log(`  ✓ ${psychologist.name}`);
      }
    });
  });

  console.log('✅ Seed concluído!');
};

seed();
