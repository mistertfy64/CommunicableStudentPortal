var socket = io();

$("#chat-message-send-button").click(() => {
	socket.emit("sendChatMessage", $("#message").val());
});

socket.on("receiveChatMessage", (message) => {
	$("#chat-message-container").append(`<br>`);
	$("#chat-message-container").append(message);
});
