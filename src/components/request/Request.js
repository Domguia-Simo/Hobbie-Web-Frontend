
const request = async({method ,url ,body}) => {
    let m = method.toLowerCase()

    let result = 'No result'
    switch(m){

        //Get Request
        case 'get':
            console.log('get Request')
            // return
            result = await fetch(url,{
                method:"get"
            })
            .then(res => res.json())
            .then(data => { return data} )
            .catch(err => {return err} )
        break;

        //Post Request
        case 'post':
            console.log('post Request')
            // return
            console.log(body)
            result = await fetch(url,{
                method:"post",
                headers:{
                    'Content-Type':'application/json',
                   'Accept':'appliation/json',
                   'Access-Control-Origin':'*' 
                },
                body:JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => { return data} )
            .catch(err => {return err} )
        break;

        //Delete Request
        case 'delete':
            console.log('delete Request')
            return
            result = await fetch(url,{
                method:"delete",
                headers:{
                   'Accept-Content':'appliation/json',
                   'Access-Control-Origin':'*' 
                },
                body:JSON.stringify({
                    body
                })
            })
            .then(res => res.json())
            .then(data => { return data} )
            .catch(err => {return err} )
        break;

    }
    return result
}

export default request