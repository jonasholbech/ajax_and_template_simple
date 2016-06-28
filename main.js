(function(){
    var Ajax = {
        getJSON:function loadJSON(path, callback) {   
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', path, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);  
        }
    }
    document.addEventListener("DOMContentLoaded", function(event) {
        Ajax.getJSON("https://kea-alt-del.dk/twitter/api/?hashtag=homebrew", function(e){
            setupTweets(JSON.parse(e));
        });
    });

    function setupTweets(data){
        if ('content' in document.createElement('template')) {
            var template = document.querySelector('#tweet'),
                h1 = template.content.querySelector('.author'),
                handle = template.content.querySelector('.handle'),
                container = document.createElement('section'),
                img = template.content.querySelector('img'),
                text = template.content.querySelector('.tweet div');

            var addTweet = function(tweet){
                h1.textContent=tweet.user.name;
                handle.textContent="@"+tweet.user.screen_name;
                text.textContent = tweet.text;
                img.src=tweet.user.profile_image_url_https;
                img.alt=tweet.user.name;
                var clone = document.importNode(template.content, true);
                container.appendChild(clone);
            }
            
            data.statuses.forEach(addTweet)
                
            document.body.appendChild(container);
        }  
    }
})();