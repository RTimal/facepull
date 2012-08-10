var facepull = 
	{
		currentLetter:"a",
		currentSex:"M",
		access_token:"",
		FB:null,
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
				
				this.FB = FB;
				
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
					
					FB.getLoginStatus(function(response) 
					{
						 if (response.status === 'connected') 
						  {
							// the user is logged in and has authenticated your
							// app, and response.authResponse supplies
							// the user's ID, a valid access token, a signed
							// request, and the time the access token 
							// and signed request each expire
							var uid = response.authResponse.userID;
							var accessToken = response.authResponse.accessToken;
							this.access_token = accessToken;
						  } else if (response.status === 'not_authorized') {
								alert("could not get access token, user is logged in but has no authenticated your app");
						  } else 
						  {
								alert("user isn't logged in");
						  }
					});

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
				  this.access_token="";
				}); 
			  } 
			},
			
		getNewAccessToken:function()
			{
				window.FB.getLoginStatus(function(response) 
					{
						 if (response.status === 'connected') 
						  {
							// the user is logged in and has authenticated your
							// app, and response.authResponse supplies
							// the user's ID, a valid access token, a signed
							// request, and the time the access token 
							// and signed request each expire
							var uid = response.authResponse.userID;
							var accessToken = response.authResponse.accessToken;
							this.access_token = accessToken;
							alert(this.access_token);
						  } else if (response.status === 'not_authorized') {
								alert("could not get access token, user is logged in but has no authenticated your app");
						  } else 
						  {
								alert("user isn't logged in");
						  }
					});
			},
			drawImage:function(url){
						function draw() {
						  var ctx = document.getElementById('canvas').getContext('2d');
						  var img = new Image();
						  img.onload = function(){
							ctx.drawImage(img,0,0);
							ctx.beginPath();
							ctx.moveTo(30,96);
							ctx.lineTo(70,66);
							ctx.lineTo(103,76);
							ctx.lineTo(170,15);
							ctx.stroke();
						  };
						  img.src = url;
						}
			},
				
				
		bindbuttons:function()
			{
				
			},
		getFriends:function () 
			{	
				$('#thumbs').empty();
				window.FB.api('/me/friends', function(response) {
				if(response.data) 
				{
					$.each(response.data,function(index,friend) {
						//alert(friend.name + ' has id:' + friend.id);
						var $thumbdiv=$(document.createElement('div'));
						$thumbdiv.empty();
						$thumbdiv.attr('id','thumbnail');
						$thumbdiv.attr('data-id',friend.id);	
						$thumbdiv.html('<img src="http://graph.facebook.com/' + friend.id + '/picture" />');
						$('#thumbs').append($thumbdiv);
				});
					
				} else {
					alert("Please login with facebook first to refresh pictures");
				}
				});
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
	$(document).ready(function(){
		facepull.run();
		
		
		//$('#detectface').hide();
		$('#saveface').hide();
		$('#refresh').bind('click',function(){
			//facepull.getNewAccessToken();
			facepull.getFriends();
		});
		
		$('#detectface').bind('click',function()
			{
				$(function()
				{
						var coords = $('#photo img').faceDetection({
						complete:function() {
							//after complete
							alert("done");
						},
						error:function(img, code, message) {
							
							alert('Error: '+message);
							//alert(img);
						}
					});
					
					for (var i = 0; i < coords.length; i++) {
						$('<div>', {
							'class':'face',
							'css': {
								'position':	'absolute',
								'left':		coords[i].positionX +'px',
								'top':		coords[i].positionY +'px',
								'width': 	coords[i].width		+'px',
								'height': 	coords[i].height	+'px'
							}
						})
						.appendTo('#photo');
					}
				return false;
				});
						
						
			});


		$('#save').bind('click',function()
			{
			
				
			});
		
		$('#gallery').delegate('#thumbnail','click',function(){
			//get thumbnail id
				var id=$(this).attr('data-id');
		
			var url='http://graph.facebook.com/'+id+'/picture?type=large';
			
			//$('#photo').empty();
			//var $photo=$('#photo');
			//$photo.hide();
			//$photo.html('<img src ="'+url+'"></img>');
			drawImage(url());
			//$photo.fadeIn();			
			$('#detectface').show();
			$('#saveface').show();
			
			//put id into link
			//show link in #photo, hide,
			//fadein
		});
	

		
		
	});
