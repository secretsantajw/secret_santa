var curr_user;
var curr_user_num;



function setup()
{
  var music = document.getElementById("song");
  music.volume = 0.1;

  music.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);


  var userRef = firebase.database().ref("Users/");
  userRef.once("value").then(
    function(snapshot) {
      var users = snapshot.val();

      for(var i = 0; i < users.length; i++)
      {
        if (users[i] != undefined)
        {
          var name = document.getElementById("name");
          var opt = document.createElement("option");
          opt.value= users[i];
          opt.innerHTML = users[i]; // whatever property it has

          // then append it to the select element
          name.appendChild(opt);
        }
      }
    }
  );
}

function scroll_up_enter()
{
  $('#enter_button').animate({marginTop: '-=800px'}, 60);
  var enter_button = document.getElementById("#enter_button");

  var name = document.getElementsByClassName("name_class");
  for (var i = 0; i < name.length; i++)
  {
    name[i].style.display = "block";
  }
}

function confirm_name()
{
  var name = document.getElementById("name");
  curr_user = name.value;

  switch(curr_user)
  {
    case 'Alex Pu':
      curr_user_num = 0;
      break;
    case 'Anu Ganzorig':
      curr_user_num = 1;
      break;
    case 'Eric Lin':
      curr_user_num = 2;
      break;
    case 'Jenny Wong':
      curr_user_num = 3;
      break;
    case 'Karen Lo':
      curr_user_num = 4;
      break;
    case 'Matthew Yu':
      var sorry = document.getElementById("sorry");
      sorry.style.display = "block";
    case 'Monica Hung':
      var sorry = document.getElementById("sorry");
      sorry.style.display = "block";
    default:
      curr_user_name = -1;
      break;
  }
  $('.name_class').animate({marginTop: '-=800px'}, 60);

  if (curr_user != "Matthew Yu" && curr_user != "Monica Hung")
  {
    var secret_santa_button = document.getElementById("find_secret_santa");
    secret_santa_button.style.display = "block";
  }
}

function find_out()
{
  var userRef = firebase.database().ref("Users/");
  userRef.child(curr_user_num).remove();


  $('#find_secret_santa').animate({marginTop: '-=800px'}, 60);

  var end_page = document.getElementById("end_page");
  end_page.style.display = "block";


  var available = firebase.database().ref("Available/");
  available.once("value").then(
    function(snapshot) {
      var available_users = snapshot.val();
      var num = Math.floor(Math.random() * 5);
      while (1)
      {
        if (available_users[num] != curr_user && available_users[num] != undefined)
        {
          available.child(num).remove();
          break;
        }
        num = Math.floor(Math.random() * 5);
      }

      var end_page_title = document.getElementById("end_page_title");
      var secret_santa = available_users[num];
      end_page_title.innerHTML = "Your Secret Santa is: " + secret_santa;


      var list = document.createElement("P");
      list.className += " end_page_info";
      switch(secret_santa)
      {
        case 'Alex Pu':
          list.innerHTML = "This lad has asked for: 1). A nice long sleeve shirt for casual wear (maybe Henley). Wears a medium. Keep the receipt in case he buffs up before December 8th and needs a different size. 2). Sunglasses (maybe Aviators). Wears a large cause he has a large head. 3). Casual non-tennis pair of shoes. Wears a size 10 (maybe Vans or Converse)";
          break;
        case 'Anu Ganzorig':
          list.innerHTML = "This gal desires: 1). BIG stuffed animal (any). 2). BIG mug (sensing a pattern here). 3). A plant";
          break;
        case 'Eric Lin':
          list.innerHTML = "1). Nice V-Neck T-Shirt (Large). Keep the receipt in case 2). A nice sweatshirt (black/blue/grey) (Large). Keep the receipt in case. 3). Casual non-tennis pair of shoes. Wears a size 12.5/13 (maybe Vans or Converse)";
          break;
        case 'Jenny Wong':
          list.innerHTML = "This lassie doth requested: 1). A luxury pillow. 2). A cowboy hat (Yee-haw cowboy). 3). Cute socks";
          break;
        case 'Karen Lo':
          list.innerHTML = "This chiquita wants 1). Food (Guessing not potluck food). 2). Spares of Panasonic earphones she has right now. 3). Steam credit (Steam is a game platform)";

          break;
        default: break;
      }
      var end_page = document.getElementById("end_page");
      var end_page_info = document.getElementById("end_page_info");
      end_page.insertBefore(list, end_page_info);


    }
  );
}

function mute_volume()
{
  var music = document.getElementById("song");
  music.volume = 0.0;

  var volume = document.getElementById("volume");
  volume.src = "volume_mute.png";
  volume.onclick = function()
  {
    unmute_volume();
  }
}

function unmute_volume()
{
  var music = document.getElementById("song");
  music.volume = 0.1;
  var volume = document.getElementById("volume");
  volume.src = "volume.png";

  volume.onclick = function()
  {
    mute_volume();
  }
}
