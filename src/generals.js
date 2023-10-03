//This file contains general/global variable in the app for rapid change and testing
export const ipAdress = '192.168.192.195'

export const stringDate=(date)=>{
    let goodDate = date.split('/')
    let month = ''
    switch(goodDate[1]){
        case '1':
            month='January'
        break;    
        case '2':
            month='February'
        break; 
        case '3':
            month='March'
        break; 
        case '4':
            month='April'
        break; 
        case '5':
            month='May'
        break; 
        case '6':
            month='June'
        break; 
        case '7':
            month='July'
        break; 
        case '8':
            month='August'
        break; 
        case '9':
            month='September'
        break; 
        case '10':
            month='October'
        break; 
        case '11':
            month='November'
        break; 
        case '12':
            month='December'
        break; 
        
    }

    return goodDate[0]+' '+month+' '+goodDate[2]
}


