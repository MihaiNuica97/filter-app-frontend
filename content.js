console.log("Hello World!");
setTimeout(getSpans, 5000);
function getSpans() {
	var tweets = $("div[data-testid='tweet']");
	tweets.each(function () {
		let anchors = $(this).find("a");
		let id;
		anchors.each(function () {
			let href = $(this).attr("href");
			if (href.includes("/status/")) {
				id = href.split("/status/")[1];
			}
		});
		console.log(id);
		console.log(this);
	});
}
