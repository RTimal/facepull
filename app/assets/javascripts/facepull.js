var facepull = 
	{
		currentLetter:"a",
		currentSex:"M",
		access_token:"",
		_initfb:function()
			{
			 // Load the SDK Asynchronously
			  (function(d){
				 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
				 if (d.getElementById(id)) {return;}
				 js = d.createElement('script'); js.id = id; js.async = true;
				 js.src = "//connect.facebook.net/en_US/all.js";
				 ref.parentNode.insertBefore(js, ref);
			   }(document));

			  // Init the SDK upon load
			  window.fbAsyncInit = function() {
				FB.init({
				  appId      : '425544857491523', // App ID
				  channelUrl : '//'+window.location.hostname+'/site/login', // Path to your Channel File
				  status     : true, // check login status
				  cookie     : true, // enable cookies to allow the server to access the session
				  xfbml      : true  // parse XFBML
				});

				// listen for and handle auth.statusChange events
				FB.Event.subscribe('auth.statusChange', function(response) {
				
				
				  if (response.authResponse) {
					// user has auth'd your app and is logged into Facebook
					FB.api('/me', function(me){
					  if (me.name) {
						document.getElementById('auth-displayname').innerHTML = me.name;
					  }
					})
					document.getElementById('auth-loggedout').style.display = 'none';
					document.getElementById('auth-loggedin').style.display = 'block';
					
							var access_token = response.access_token;
							alert(access_token);

				  } else {
					// user has not auth'd your app, or is not logged into Facebook
					document.getElementById('auth-loggedout').style.display = 'block';
					document.getElementById('auth-loggedin').style.display = 'none';
				  }
				});

				// respond to clicks on the login and logout links
				document.getElementById('auth-loginlink').addEventListener('click', function(){
				  FB.login(function (response) 
						{
					    });
				});
				document.getElementById('auth-logoutlink').addEventListener('click', function(){
				  FB.logout();
				}); 
			  } 
			},
			
		fbconnect:function()
			{
			
			},
			
		bindbuttons:function()
			{
				
			},
			
		run:function()
			{
				this._initfb();
				this.bindbuttons();
			},

		fbpullfriends:function()
			{
				//query facebook for all friends pictures
				//do a-f, f-j, k-m,n-p
			
			},
			
		_responsehandler:function()
			{
			//get response and populate gallery div
			
			},
			
		_setParams:function()
			{
			
			}
	}

	facepull.run();