import { redirect } from "react-router-dom";

// Token duration
export function getTokenDuration() {
	const storedExpirationTime = localStorage.getItem('expiration');
	const expirationTime = new Date(storedExpirationTime);
	const now = new Date();
	const duration = expirationTime.getTime() - now.getTime();
	return duration;
}

// Token extraction
export function getAuthToken() {
  const token = localStorage.getItem("token");

	if (!token) {
		return null;
	}

	const tokenDuration = getTokenDuration();

	if (tokenDuration < 0) {
		return 'EXPIRED'
	}

  return token;
}

// Token loader to be used throughout the app
export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
