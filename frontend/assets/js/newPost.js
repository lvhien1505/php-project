var labels = document.querySelectorAll('.label');

labels.forEach(function(el){
	el.addEventListener("click", function(event){
		var labelArea = document.querySelector("#labelArea");

		if(labelArea.value.trim() !== ""){
			if(labelArea.value.indexOf(el.innerHTML) === -1){
				var comma = labelArea.value.trim().slice();

				if(comma === ","){
					label = labelArea.value + el.innerHTML;
					labelArea.value = label;
				}else{
					//add label with comma
					label = labelArea.value +', '+el.innerHTML;
					labelArea.value = label;
				}
			}
		}else{
			label = labelArea.value + el.innerHTML;
			labelArea.value = label;
		}
	});
});

var publish     = document.querySelector("#publish");
var saveBtn     = document.querySelector("#saveBtn");
var draftBtn    = document.querySelector("#draft");
var title       = document.querySelector("#title");
var linkOp      = document.querySelectorAll('.postLinkOp');
var slug        = document.querySelector('#slugDiv');
var urlDiv      = document.querySelector('#custom-url-area');
var customUrl   = document.querySelector('#customSlug');
var customUrlEr = document.querySelector('#urlError');
urlDiv.style.display = "none";


title.addEventListener("keydown", function(event){
	if(document.querySelectorAll('.postLinkOp').value != ''){
		if(linkOp[0].value === "automatic"){
			checkTyping();
		}
	}
});

customUrl.addEventListener("keyup", function(even){
	regex = /^([a-zA-Z0-9-]+)$/gm;
	if(this.value != ''){
		if(this.value.match(regex)){
			customUrlEr.innerHTML = "";
			slug.innerHTML = this.value+".html";
		}else{
			slug.innerHTML = "";
			customUrlEr.innerHTML = "Invaild characters!";
		}
	}else{
		slug.innerHTML = "";
	}
});

linkOp.forEach(function(el){
	el.addEventListener("change", function(event){
		if(el.value === "custom"){
			slug.innerHTML = '';
			urlDiv.style.display = "block";
			customUrl.value = '';
		}else{
			slug.innerHTML = '';
			urlDiv.style.display = "none";
			if(title.value != ''){
				displaySlug();
			}
		}
	});
});

var typingTimer    = null;
var typingInterval = 5000;

function checkTyping(){
	clearTimeout(typingTimer);
	typingTimer = setTimeout(displaySlug, 1000);
}

function displaySlug(){
	var formData  = new FormData();

	formData.append("blogID", publish.dataset.blog);
	formData.append("title",  title.value);

	var httpRequest = new XMLHttpRequest();

	if(httpRequest){
		httpRequest.open('POST', 'http://localhost/MyBlogger/backend/ajax/getSlug.php', true);
		httpRequest.onreadystatechange = function(){
			if(this.readyState === 4 && this.status === 200){
				if(this.responseText.length != 0){
					slug.innerHTML = this.responseText;
				}
			}
		}

		httpRequest.send(formData);
	}	
}


publish.addEventListener("click", function(event){
	var blogID        = this.dataset.blog;
	var title         = document.querySelector('#title').value.trim();
	var description   = document.querySelector('#description').value.trim();
	var labels        = document.querySelector('#labelArea').value.trim();
	var comments      = document.querySelector('.comments:checked').value
	var slug          = document.querySelector('#customSlug').value.trim();
	var content       = document.querySelector('#editor').firstChild.innerHTML;

	if(title != ''){
		if(slug === ''){
			slug = title;
		}

		var formData  = new FormData();

		formData.append("blogID", blogID);
		formData.append("title",  title);
		formData.append("description",  description);
		formData.append("content",  content);
 		formData.append("labels",  labels);
		formData.append("comments",  comments);
		formData.append("slug",  slug);

		var httpRequest = new XMLHttpRequest();

		if(httpRequest){
			httpRequest.open('POST', 'http://localhost/MyBlogger/backend/ajax/addPost.php', true);
			httpRequest.onreadystatechange = function(){
				if(this.readyState === 4 && this.status === 200){
					window.location.href = "http://localhost/MyBlogger/admin/blogID/"+blogID+"/dashboard/";
				}
			}

			httpRequest.send(formData);
		}	
	}else{
		alert('Please add post title!');
	}
});

if(saveBtn != null){
saveBtn.addEventListener("click", function(event){
	var blogID        = publish.dataset.blog;
	var title         = document.querySelector('#title').value.trim();
	var description   = document.querySelector('#description').value.trim();
	var labels        = document.querySelector('#labelArea').value.trim();
	var comments      = document.querySelector('.comments:checked').value
	var slug          = document.querySelector('#customSlug').value.trim();
	var content       = document.querySelector('#editor').firstChild.innerHTML;

	if(title != ''){
		if(slug === ''){
			slug = title;
		}

		var formData  = new FormData();

		formData.append("blogID", blogID);
		formData.append("title",  title);
		formData.append("description",  description);
		formData.append("content",  content);
 		formData.append("labels",  labels);
		formData.append("comments",  comments);
		formData.append("slug",  slug);

		var httpRequest = new XMLHttpRequest();

		if(httpRequest){
			httpRequest.open('POST', 'http://localhost/MyBlogger/backend/ajax/saveNewPost.php', true);
			httpRequest.onreadystatechange = function(){
				if(this.readyState === 4 && this.status === 200){
					window.location.href = "http://localhost/MyBlogger/admin/blogID/"+blogID+"/post/"+this.responseText+"/edit/";
				}
			}

			httpRequest.send(formData);
		}	
	}else{
		alert('Please add post title!');
	}
});
}