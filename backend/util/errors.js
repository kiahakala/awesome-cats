// class NotFoundError {
// 	constructor(message) {
// 	  this.message = message;
// 	  this.status = 404;
// 	}
//   }

function NotFoundError(message) {
	const status = 404;
	return {
		message: message,
		status
	}
}
  
exports.NotFoundError = NotFoundError;