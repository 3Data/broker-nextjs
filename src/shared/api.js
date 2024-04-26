const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DEFAULT_HEADERS = {
  accept: "application/json; charset=utf-8",
  "Content-type": "application/json; charset=UTF-8",
  "user-country": "ES",
  "user-region": "08",
};

export const getRooms = async ({ partnerToken }) => {
  let error;
  let status;
  let data;

  const url = new URL(`${API_URL}/rooms/oc`);

  url.searchParams.append("limit", 16);
  url.searchParams.append("segment", 1);
  url.searchParams.append("pruebas", 1);

  const response = await fetch(url, {
    method: "GET",
    headers: { ...DEFAULT_HEADERS, "partner-token": partnerToken },
    cache: "no-store",
  });

  status = response.status;

  if (response.ok) {
    const json = await response.json();
    data = json.message;
  } else {
    error = await response.json();
  }

  return { data, status, error };
};

export const getRoom = async ({ nick, partnerToken }) => {
  let error;
  let status;
  let data;

  const url = new URL(`${API_URL}/performer/${nick}`);

  url.searchParams.append("pruebas", 1);

  const response = await fetch(url, {
    method: "GET",
    headers: { ...DEFAULT_HEADERS, "partner-token": partnerToken },
  });

  status = response.status;

  if (response.ok) {
    const json = await response.json();
    data = json.message;
  } else {
    error = await response.json();
  }

  return { data, status, error };
};

export const getPartnerToken = async () => {
  let error;
  let status;
  let data;

  const url = new URL(`${API_URL}/partner`);

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      id: process.env.NEXT_PUBLIC_BROKER_ID,
      secret: process.env.NEXT_PUBLIC_SECRET,
    }),
    headers: DEFAULT_HEADERS,
    next: {
      revalidate: 60 * 60 * 23,
      tags: ["partnertoken"],
    },
  });

  status = response.status;

  if (response.ok) {
    const json = await response.json();
    data = json.message;
  } else {
    error = await response.json();
  }

  return { data, status, error };
};

export const getIframe = async ({ roomId, partnerToken }) => {
  let error;
  let status;
  let data;

  const url = new URL(`${API_URL}/brokers/iframe`);

  url.searchParams.append("room", roomId);
  url.searchParams.append("app", process.env.NEXT_PUBLIC_APP_ID);
  url.searchParams.append("mode", "auto");
  url.searchParams.append("id", roomId);
  url.searchParams.append("userid", "userid-brokerstest");
  url.searchParams.append("userLang", "es");
  url.searchParams.append("token", "usertoken-brokerstest");
  url.searchParams.append("nick", "usernick-brokerstest");
  url.searchParams.append("pruebas", 1);
  url.searchParams.append("stagingIframe", 0);
  url.searchParams.append("ttl", 45);
  // url.searchParams.append("staginglively", 1);
  url.searchParams.append("trackId", "test");
  // url.searchParams.append("overrideHost", "http://localhost:3000/");

  const response = await fetch(url, {
    method: "GET",
    headers: { ...DEFAULT_HEADERS, "partner-token": partnerToken },
  });

  status = response.status;

  if (response.ok) {
    const json = await response.json();
    data = json.message;
  } else {
    error = await response.json();
  }

  return { data, status, error };
};
