

// localStorage.setItem('todos', JSON.stringify(todo_list));

// var todo_string= localStorage.getItem('todos');
//         var todo_list=JSON.parse(todo_string);



var movie_array=new Array(0);
var total_movies=0;
var page_num=1;
var search_string="";
var parent_container= document.getElementById("movie_parent_container");
var back_arrow=document.getElementById("back_arrow");
var forward_arrow=document.getElementById("forward_arrow");
var page_num_span=document.getElementById("page_num");



function render_list()
{
    parent_container.innerHTML='';
    movie_array.forEach(function(item)
    {
      
        var movie_container= document.createElement("div");
        var movie_title=document.createElement("p");
        var movie_img=document.createElement("img");

        movie_title.innerText=item.Title;
        if(item.display_info) movie_title.style.display="none";
        else movie_title.style.display="block";

        movie_title.setAttribute("id", "p"+item.imdbID);
        movie_img.setAttribute("src", item.Poster);
        var x=item.imdbID;
        movie_container.addEventListener("click", function()
        {
            show_movie_details(x);
        });
        

        var info_container= document.createElement("div");
        if(item.display_info) info_container.style.display="block";
        else info_container.style.display="none";
        var info_movie_title=document.createElement("p");
        var info_movie_year=document.createElement("p");
        var info_movie_type=document.createElement("p");
        var info_movie_id=document.createElement("p");
        info_movie_title.innerText=item.Title;
        info_movie_year.innerText=item.Year;
        info_movie_type.innerText=item.Type;
        info_movie_id.innerText=item.imdbID;

        info_container.appendChild(info_movie_title);
        info_container.appendChild(info_movie_year);
        info_container.appendChild(info_movie_type);
        info_container.appendChild(info_movie_id);

        movie_container.appendChild(movie_title);
        movie_container.appendChild(movie_img);
        movie_container.appendChild(info_container);
        parent_container.appendChild(movie_container);
      }
    );

}


function show_movie_details(movie_id)
{

    console.log(movie_id);
    var index= movie_array.findIndex(function(item)
    {
        return (item.imdbID===movie_id);
    })

    console.log(index);

    movie_array[index].display_info=true;
    render_list();
}




  search_button_1.addEventListener('click', function()
{
  var search_input= document.getElementById("search_input").value;
  var search_keywords=search_input.toLowerCase().split(' ');
  search_string=search_keywords[0];

  for(var i=1;i<search_keywords.length;i++)
  {
       search_string=search_string+"+"+search_keywords[i];
  }
  console.log(search_string);

    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=c34c97b2&s=${search_string}`)
    .then((response) => 
    {
    if (!response.ok) 
    {
        throw new Error('Network response was not OK');
    }
    return response.json();
    })
    .then((data) => 
    {

    movie_array= data.Search;
    total_movies=parseInt(data.totalResults);
    console.log(movie_array);
    render_list();
        
    })
    .catch(error => 
    {
    console.log('Error:', error.message);
    });


})

cancel_search_button_1.addEventListener('click', function()
{
  document.getElementById("search_input").value='';
  while(movie_array.length>0) movie_array.pop();
  render_list();
})


forward_arrow.addEventListener("click", function(){

   // console.log(Math.ceil(total_movies/10));
    if(page_num< Math.ceil(total_movies/10))
    {
        
    page_num++;
    change_page(page_num);


    }
    
})

back_arrow.addEventListener("click", function(){

    if(page_num>1)
    {
        page_num--;
        change_page(page_num);
    }

    
})


function change_page(page_number){


    page_num_span.innerText=page_number;
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=c34c97b2&s=${search_string}&page=${page_number}`)
    .then((response) => 
    {
    if (!response.ok) 
    {
        throw new Error('Network response was not OK');
    }
    return response.json();
    })
    .then((data) => 
    {

    movie_array= data.Search;
    console.log(movie_array);
    render_list();
        
    })
    .catch(error => 
    {
    console.log('Error:', error.message);
    });



}


  