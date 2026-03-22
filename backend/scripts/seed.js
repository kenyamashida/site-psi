const psychologistService = require('../models/psychologist');

const seedData = [
  {
    name: 'Dr. João Silva',
    crp: '07/12345',
    specialty: 'Depressão e Ansiedade',
    description: 'Especialista em transtornos do humor com 10 anos de experiência',
    full_bio: 'Dr. João Silva é psicólogo clínico especializado em depressão, ansiedade e transtornos do humor. Com mais de 10 anos de experiência, oferece abordagem humanizada e eficaz.',
    education: 'Psicologia - USP; Especialização em TCC - Instituto Paulista',
    photo_url: 'https://via.placeholder.com/400x400?text=Dr.+João'
  },
  {
    name: 'Dra. Maria Santos',
    crp: '07/23456',
    specialty: 'Terapia Familiar',
    description: 'Especialista em dinâmica familiar e relacionamentos',
    full_bio: 'Dra. Maria Santos trabalha com terapia familiar sistêmica, ajudando famílias a resolverem conflitos e melhorarem a comunicação.',
    education: 'Psicologia - UFRJ; Mestrado em Terapia Familiar',
    photo_url: 'https://via.placeholder.com/400x400?text=Dra.+Maria'
  },
  {
    name: 'Dr. Carlos Oliveira',
    crp: '07/34567',
    specialty: 'Psicologia do Adolescente',
    description: 'Trabalha com questões de identidade e desenvolvimento adolescente',
    full_bio: 'Dr. Carlos Oliveira dedica-se à psicologia do adolescente, tratando questões de identidade, relacionamentos e desenvolvimento emocional.',
    education: 'Psicologia - UERJ; Especialização em Adolescência',
    photo_url: 'https://via.placeholder.com/400x400?text=Dr.+Carlos'
  },
  {
    name: 'Dra. Ana Costa',
    crp: '07/45678',
    specialty: 'Psicoterapia Integrativa',
    description: 'Abordagem holística combinando diferentes técnicas terapêuticas',
    full_bio: 'Dra. Ana Costa oferece psicoterapia integrativa, combinando técnicas de TCC, psicodrama e mindfulness.',
    education: 'Psicologia - UNIFESP; Múltiplas certificações em técnicas terapêuticas',
    photo_url: 'https://via.placeholder.com/400x400?text=Dra.+Ana'
  },
  {
    name: 'Dr. Pedro Alves',
    crp: '07/56789',
    specialty: 'Avaliação Psicológica',
    description: 'Especialista em diagnóstico e avaliação psicológica',
    full_bio: 'Dr. Pedro Alves é especialista em avaliação e diagnóstico psicológico, usando instrumentos validados e abordagem humanizada.',
    education: 'Psicologia - PUC; Especialização em Avaliação Psicológica',
    photo_url: 'https://via.placeholder.com/400x400?text=Dr.+Pedro'
  }
];

const seed = () => {
  console.log('Starting database seed...');
  
  seedData.forEach((psychologist) => {
    psychologistService.create(psychologist, (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          console.log(`Psychologist ${psychologist.name} already exists, skipping...`);
        } else {
          console.error(`Error inserting ${psychologist.name}:`, err);
        }
      } else {
        console.log(`✓ Added ${psychologist.name}`);
      }
    });
  });

  console.log('Seed completed!');
};

seed();
