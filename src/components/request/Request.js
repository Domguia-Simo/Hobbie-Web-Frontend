
const request = async({method ,url ,body}) => {
    let m = method.toLowerCase()

    let result = 'No result'
    switch(m){

        case 'get':
            console.log('get Request')
            return
            result = await fetch(url,{
                method:"get"
            })
            .then(res => res.json())
            .then(data => { return data} )
            .catch(err => {return err} )
        break;

        case 'post':
            console.log('post Request')
            return
            result = await fetch(url,{
                method:"post",
                headers:{
                   'Accept-Content':'appliation/json',
                   'Access-Cross-Origin':'*' 
                },
                body:JSON.stringify({
                    body
                })
            })
            .then(res => res.json())
            .then(data => { return data} )
            .catch(err => {return err} )
        break;

        case 'delete':
            console.log('delete Request')
            return
            result = await fetch(url,{
                method:"delete",
                headers:{
                   'Accept-Content':'appliation/json',
                   'Access-Cross-Origin':'*' 
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