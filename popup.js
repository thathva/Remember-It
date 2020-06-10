$(function() {

//initializations
var allData = {
    websiteUrl:[],
    websiteTitle:[],
    todoArray:[]
}
 
//getting existing storage data
chrome.storage.sync.get(['todoItems'],function(items){
    if(items.todoItems.length > 0) {
        allData.todoArray = items.todoItems;
    }
    for(var i = 0; i<allData.todoArray.length; i++)
     {
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> "+ allData.todoArray[i] +"</li>");
     }
})

chrome.storage.sync.get(['websiteUrl','websiteTitle'],function(data) {
    if(data.websiteTitle.length > 0)
    {
        allData.websiteTitle = data.websiteTitle;
    }
    if(data.websiteUrl.length > 0)
    {
        allData.websiteUrl = data.websiteUrl;
    }
})


// //marking it off as done
// $("ul").on("click","li",function(){
//     $(this).toggleClass("completed");
// });

//deleting the todo
$("ul").on("click","span",function(event){
    $(this).parent().fadeOut(500,function(){
        var text = $(this).text().trim();
        chrome.storage.sync.get(['todoItems','websiteUrl','websiteTitle'],function(items){
            if(items.todoItems.length > 0 && items.websiteTitle.length>0 && items.websiteTitle>0) {
                allData.todoArray = items.todoItems;
                allData.websiteTitle = items.websiteTitle;
                allData.websiteUrl = items.websiteUrl;
            }
            var index = allData.todoArray.indexOf(text)
            allData.todoArray.splice(index, 1)
            allData.websiteTitle.splice(index,1)
            allData.websiteUrl.splice(index,1)
            chrome.storage.sync.set({'todoItems':allData.todoArray,'websiteUrl':allData.websiteUrl,'websiteTitle':allData.websiteTitle})
        })
        $(this).remove();
    });
    event.stopPropagation();
});

//adding a new todo
$("input[type='text'").keypress(function(event){
    if(event.which==13)
    {
        console.log(allData.websiteTitle)
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            allData.websiteUrl.push(tabs[0].url);
            chrome.storage.sync.set({'websiteUrl':allData.websiteUrl});
        });
        
        chrome.tabs.getSelected(null,function(tabs) {
            allData.websiteTitle.push(tabs.title)
            chrome.storage.sync.set({'websiteTitle':allData.websiteTitle})
        });
        var todo=$(this).val();
        allData.todoArray.push(todo);
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> "+ todo +"</li>");
        chrome.storage.sync.set({'todoItems': allData.todoArray})
    }
});


$(".fa-plus").click(function(){
    $("input[type='text'").fadeToggle();
});
})
