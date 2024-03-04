// function NotFoundError(message) {
// 	const status = 404;
// 	return {
// 		message: message,
// 		status
// 	}
// }

class NotFoundError {
	constructor(message) {
	  this.message = message;
	  this.status = 404;
	}
  }

class NotAuthError {
	constructor(message) {
		this.message = message;
		this.status = 401;
	}
}
  
exports.NotFoundError = NotFoundError;
exports.NotAuthError = NotAuthError;