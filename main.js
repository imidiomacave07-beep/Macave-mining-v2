const axios = require("axios");

// Credenciais guardadas nas variáveis de ambiente
const apiKey = process.env.NICEHASH_API_KEY;
const orgId = process.env.NICEHASH_ORG_ID;
const apiSecret = process.env.NICEHASH_API_SECRET;

function validateConfig() {
  if (!apiKey || !orgId || !apiSecret) {
    throw new Error(
      "Configuração incompleta. Verifica as variáveis NICEHASH_API_KEY, NICEHASH_ORG_ID e NICEHASH_API_SECRET."
    );
  }
}

async function getMiningStats() {
  try {
    validateConfig();

    const response = await axios.get(
      "https://api2.nicehash.com/main/api/v2/mining/rigs",
      {
        headers: {
          "X-Organization-Id": orgId,
          "X-Api-Key": apiKey,
        },
        timeout: 15000,
      }
    );

    const rigs = response.data?.miningRigs;

    console.log("=== Dados da Mineração ===");

    if (Array.isArray(rigs) && rigs.length > 0) {
      rigs.forEach((rig, index) => {
        console.log(`Rig ${index + 1}:`);
        console.log(`  Nome: ${rig.name ?? "Não disponível"}`);
        console.log(`  Estado: ${rig.status ?? "Não disponível"}`);
        console.log(`  Hashrate: ${rig.hashrate ?? "Não disponível"}`);
      });
    } else {
      console.log("Nenhum equipamento encontrado ou dados indisponíveis.");
    }
  } catch (error) {
    console.error(
      "Erro ao consultar a NiceHash:",
      error.response?.status ?? error.message
    );
  }
}

getMiningStats();
