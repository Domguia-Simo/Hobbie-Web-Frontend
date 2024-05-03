//This file contains general/global variable in the app for rapid change and testing
export const ipAdress = '192.168.231.195'

export const stringDate=(date)=>{
    let goodDate = date.split('/')
    let month = ''
    switch(goodDate[1]){
        case '1':
            month='Jan.'
        break;    
        case '2':
            month='Fer.'
        break; 
        case '3':
            month='Mar.'
        break; 
        case '4':
            month='Apr.'
        break; 
        case '5':
            month='May'
        break; 
        case '6':
            month='June'
        break; 
        case '7':
            month='Jul.'
        break; 
        case '8':
            month='Aug.'
        break; 
        case '9':
            month='Sep.'
        break; 
        case '10':
            month='Oct.'
        break; 
        case '11':
            month='Nov.'
        break; 
        case '12':
            month='Dec.'
        break; 
        
    }

    return goodDate[0]+' '+month+' '+goodDate[2]
}


