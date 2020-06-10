$(function() {

    var allData = {
        websiteUrl:[],
        websiteTitle:[],
        presentDate: [],
        todoArray:[]
    } 

    chrome.storage.sync.get(['todoItems','websiteUrl','websiteTitle'],function(items){
        if(items.todoItems.length == 0 || items.websiteTitle.length == 0 || items.websiteUrl.length == 0) {
            console.log("No items")
        }
        allData.todoArray = items.todoItems;
        allData.websiteTitle = items.websiteTitle;
        allData.websiteUrl = items.websiteUrl;
        for(var i = 0; i<allData.todoArray.length; i++)
         {
            $("#todoTable").append("<tr><td> "+ allData.todoArray[i] +"</td><td>" + allData.websiteTitle[i] + "</td><td>" + allData.websiteUrl[i] + "</td><tr>");
         }
    })
})