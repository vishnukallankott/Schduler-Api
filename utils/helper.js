const QueryParm=async(search)=>{
    var property=search.split(";")
    var obj={}
    for(i=0;i<property.length;i++){
        var split=property[i].split(":")
        obj[split[0].trim()]=split[1].trim()
    }
    return obj
}


const pagination=async function(result,page,limit){
    if(limit="undefined"){
        limit=10
    }
    if(page="undefined"){
        page=1
    }
    let total=result.length || 0;
    let totalPages=Number(Math.ceil(total/limit)) | 0
    let start=(page*limit)-limit
    let end=(start)+(limit)
    let paginatedData=result.slice(start,end)
    return{
        "result": paginatedData,
        "totalPages":Number(totalPages.toFixed()),
        "currentPage":page,
        "nextPage":page+1 >= totalPages ? totalPages :page +1 
    }

}

module.exports={
    QueryParm,pagination
}