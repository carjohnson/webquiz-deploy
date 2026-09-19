// utils/orthancClient.js
//
// Shared Orthanc REST client
//  any service (scrape, delete, etc.) can reuse the same connection logic.

const https = require("https");
const axios = require("axios");

const ORTHANC_URL = process.env.ORTHANC_URL;
const ORTHANC_USER = process.env.ORTHANC_USER;
const ORTHANC_PASS = process.env.ORTHANC_PASS;

const ALLOW_INSECURE_TLS = process.env.ORTHANC_ALLOW_INSECURE_TLS === "true"; // true for dev

function getClient() {
  if (!ORTHANC_URL || !ORTHANC_USER || !ORTHANC_PASS) {
    throw new Error(
      "Missing ORTHANC_URL, ORTHANC_USER, or ORTHANC_PASS environment variables."
    );
  }
  return axios.create({
    baseURL: ORTHANC_URL.replace(/\/+$/, ""),
    auth: { username: ORTHANC_USER, password: ORTHANC_PASS },
    timeout: 30000,
    ...(ALLOW_INSECURE_TLS && {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    }),
  });
}

module.exports = { getClient, ORTHANC_URL };