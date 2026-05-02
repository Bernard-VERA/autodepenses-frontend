

function getToken() {
    return localStorage.getItem("authToken");
}

function headers() {
    const h = { "Content-Type": "application/json" };
    const token = getToken();
    if (token) h["Authorization"] = "Bearer " + token;
    return h;
}

async function request(path, options = {}) {
    const res = await fetch(API_URL + path, {
        ...options,
        headers: { ...headers(), ...options.headers },
    });
    if (res.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        window.location.href = "/login";
        return;
    }
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur réseau");
    }
    return res.json();
}

// Auth
export function sendMagicLink(email) {
    return request("/auth/send-magic-link", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export function getMe() {
    return request("/auth/me");
}

// Vehicles
export function fetchVehicles() {
    return request("/vehicles");
}

export function createVehicle(data) {
    return request("/vehicles", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateVehicle(id, data) {
    return request("/vehicles/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteVehicle(id) {
    return request("/vehicles/" + id, { method: "DELETE" });
}

// Expenses
export function fetchExpenses() {
    return request("/expenses");
}

export function createExpense(data) {
    return request("/expenses", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateExpense(id, data) {
    return request("/expenses/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteExpense(id) {
    return request("/expenses/" + id, { method: "DELETE" });
}