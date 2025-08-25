import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load visa data from visaData.json
let visaData = {};
async function loadVisaData() {
  try {
    const data = await fs.readFile(
      path.join(__dirname, 'visaData.json'),
      'utf8'
    );
    visaData = JSON.parse(data);
  } catch (error) {
    console.error('Error loading visaData.json:', error);
    throw error;
  }
}

// Initialize visa data on server start
loadVisaData()
  .then(() => {
    console.log('Visa data loaded successfully');
  })
  .catch((error) => {
    console.error('Failed to load visa data:', error);
    process.exit(1);
  });

/**
 * Build a full destination object for CountryDetail.jsx using nationality rules.
 * This preserves your original response shape so the UI keeps working.
 */
function buildCountryResponse(destinationCountry, nationality) {
  // 1) Find country card metadata
  const countryMeta = visaData.countriesIndex.find(
    (c) => c.country.toLowerCase() === destinationCountry.toLowerCase()
  );
  if (!countryMeta) return null;

  // 2) Same nationality = destination => no visa required for all tabs
  if (destinationCountry.toLowerCase() === nationality.toLowerCase()) {
    const noVisa = {
      description:
        'No visa required for citizens traveling to their own country.',
      documents: [],
      processingTime: 'N/A',
      cost: 'N/A',
      financialRequirement: 'N/A',
      notes:
        'You are a citizen of this country; entry per national law (no visa).',
      sources: [],
    };
    return {
      country: countryMeta.country,
      flag: countryMeta.flag,
      sources: countryMeta.sources || [],
      visas: { visitor: noVisa, student: noVisa, work: noVisa },
    };
  }

  // 3) Pull nationality rules for this destination
  const natRules = visaData.rulesByNationality[nationality] || {};
  const destRules = natRules[destinationCountry] || {};

  // Helper to make a safe block
  const safe = (block) =>
    block
      ? block
      : {
          description:
            'Information not available yet. Please check official sources.',
          documents: [],
          processingTime: '—',
          cost: '—',
          financialRequirement: '—',
          notes: 'Use the sources on the country card while we add this case.',
          sources: [],
        };

  return {
    country: countryMeta.country,
    flag: countryMeta.flag,
    sources: countryMeta.sources || [],
    visas: {
      visitor: safe(destRules.visitor),
      student: safe(destRules.student),
      work: safe(destRules.work),
    },
  };
}

/** -------------------- ROUTES (kept compatible with your UI) -------------------- **/

// Lightweight list used by the Search page
app.get('/api/visa-requirements', (req, res) => {
  res.json(visaData.countriesIndex);
});

// Nationality-aware destination data used by CountryDetail.jsx
app.get('/api/visa-requirements/:country/:nationality', (req, res) => {
  const { country, nationality } = req.params;
  const response = buildCountryResponse(country, nationality);
  if (!response) return res.status(404).json({ error: 'Country not found' });
  res.json(response);
});

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
