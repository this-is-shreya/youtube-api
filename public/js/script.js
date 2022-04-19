const search_via_api =()=>{
    let key = "AIzaSyBdmHCJC-lBOYSf_4DL80Y8xBwj53xjxsw"
    let y_link = "https://www.googleapis.com/youtube/v3/search?part=snippet&key="+key+"&q=modern%20family%20series&type=video&maxResults=5&order=date"
    $.ajax({
        method:"GET",
        url:y_link,
        success:function(data){
            $.ajax({
                url:"/add-new-data",
                method:"POST",
                data:{videos:data},
                success:function(res){
                        if(res == "done"){
                            $( "#home" ).load(window.location.href + " #home" );

                        }

                    
                }
            })
        }
    })

}
setInterval(function () {
    search_via_api()
}, 10000);
search_via_api()
const show_home = ()=>{
    $("#home").css('display','block')
    $("#search_results").css('display','none')
    $("input[name='search_query']").val("")
}
const search_video =()=>{
    // alert($("input[name='search_query']").val())
    $("#home").css('display','none')
    $.ajax({
    method:"POST",
    url:"/search",
    data:{search_query:$("input[name='search_query']").val()},
    success:function(res){
            let str = `<iframe src='https://youtube.com/embed/${res.videos.videoId}' width="420"
height="315" frameborder="0" allowfullscreen></iframe>`
            console.log(str)
        
        $("#search_results").append(str)

    }
})
}