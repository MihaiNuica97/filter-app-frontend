console.log("Hello World!");
if (window.location.href.includes("twitter")) {
	setTimeout(getTweets, 5000);
	let scrollIndex = 0;
	let tweetsMap = new Map();
	window.addEventListener("scroll", function () {
		// Get tweets
		// Check they are distinct
		// Store them
		scrollIndex++;
		if (scrollIndex == 50) {
			console.log("Scrolling...");
			getTweets();
			scrollIndex = 0;
		}
	});
	window.addEventListener("click", function () {
		tweetsMap = new Map();
	});
	function getTweets() {
		var tweets = $("div[data-testid='tweet']");
		tweets.each(function () {
			try {
				let anchors = $(this).find("a");
				let id;
				anchors.each(function () {
					let href = $(this).attr("href");
					if (href.includes("/status/")) {
						id = href.split("/status/")[1];
					}
				});
				if (!tweetsMap.has(id)) {
					let tweet = {
						id: "",
						name: "",
						username: "",
						time: "",
						content: "",
						domEl: "",
					};
					tweet.id = id;
					// console.log(id);
					// console.log(this);
					// let timeElm = this.getElementsByTagName("time")[0];
					// console.log(timeElm);
					let timeElm = this.getElementsByTagName("time")[0];
					// Again noticing this DOM element takes messing around in the browser
					let timeDisplay = timeElm.innerText;
					let dateTimeAtri = timeElm.getAttribute("datetime");

					let splitTweet = this.innerText.split(/\n/);

					// Makes the text into an Array split by newline
					let splitLength = splitTweet.length;
					let breakpoint;
					let endContent = splitLength - 4;
					// Subtracting four to account for the three interactions at the end
					for (let i = 0; i < splitLength; i++) {
						if (splitTweet[i] === timeDisplay) {
							// Find the first element which has the timeDisplay
							// This is the last element before the tweet content starts
							breakpoint = i;
						}
					}
					tweet.name = splitTweet[0]; // Always the First Element
					tweet.username = splitTweet[1]; // Always the Second Element
					tweet.time = dateTimeAtri; // The date-time value of the tweet
					tweet.content = splitTweet.slice(
						breakpoint + 1,
						endContent + 1
					);
					// All the parts of the tweet which are the content
					tweet.content = tweet.content.join("\n"); // Combined into one string
					tweet.domEl = this;
					tweetsMap.set(id, tweet);
					// console.log(this.innerText);
					console.log(id);
					console.log(tweet.content);
					console.log(this);
					if (
						tweet.content
							.replace(/(\r\n|\n|\r)/gm, "")
							.includes("starting")
					) {
						console.log("found tweet!");
						$(this).css({ backgroundColor: "red" });
					}
				}
			} catch (e) {
				console.log(e);
			}
		});
	}
} else if (window.location.href.includes("facebook")) {
	let scrollIndex = 0;
	let postsMap = new Map();
	window.addEventListener("click", function () {
		// postsMap = new Map();
	});
	setTimeout(getPosts, 5000);
	window.addEventListener("click", getPosts);
	function getPosts() {
		let posts = $("div[data-pagelet]");
		posts.each(function () {
			try {
				let post = {
					id: "",
					elem: "",
					text: "",
				};
				let postType = $(this).attr("data-pagelet");
				if (postType.includes("FeedUnit")) {
					let anchors = $(this).find("a");
					let id = null;
					anchors.each(function () {
						let link = $(this).attr("href");
						if (link.includes("/posts/")) {
							id = link;
						}
					});
					if (!postsMap.has(id) && id != null) {
						post.id = id;
						post.elem = this;
						post.content = $(this).find(
							"div[data-ad-preview]"
						)[0].innerText;
						postsMap.set(id, post);
						console.log(id);
						console.log(post.content);
						console.log(this);
					}
				}
			} catch (e) {
				console.log(e);
			}
		});
	}
}
